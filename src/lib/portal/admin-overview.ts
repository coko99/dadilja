import { ACTIVITY_LABELS, ROLE_LABELS, type PortalStore } from "@/lib/portal/types";

export function buildAdminOverview(store: PortalStore) {
  const parents = store.users.filter((u) => u.role === "parent" && u.active);
  const nannies = store.users.filter((u) => u.role === "nanny" && u.active);
  const activeAssignments = store.assignments.filter((a) => a.active);
  const assignedChildIds = new Set(activeAssignments.map((a) => a.childId));
  const assignedNannyIds = new Set(activeAssignments.map((a) => a.nannyId));

  const childrenWaitingNanny = store.children.filter((c) => !assignedChildIds.has(c.id));
  const nanniesWithoutChildren = nannies.filter((n) => !assignedNannyIds.has(n.id));

  const parentsWithChildren = new Set(store.parentChildren.map((p) => p.parentId));
  const parentsWaitingChild = parents.filter((p) => !parentsWithChildren.has(p.id));

  const parentsWaitingNanny = parents.filter((p) => {
    const kids = store.parentChildren.filter((pc) => pc.parentId === p.id).map((pc) => pc.childId);
    if (!kids.length) return false;
    return kids.every((id) => !assignedChildIds.has(id));
  });

  const openShifts = store.shifts.filter((s) => !s.endedAt);
  const now = Date.now();
  const upcomingSlots = (store.schedule || []).filter(
    (s) => s.status === "scheduled" && +new Date(s.startsAt) >= now - 1000 * 60 * 60 * 2,
  );
  const weekAhead = now + 1000 * 60 * 60 * 24 * 7;
  const slotsThisWeek = upcomingSlots.filter((s) => +new Date(s.startsAt) <= weekAhead);

  const nameOf = (id?: string) => store.users.find((u) => u.id === id)?.fullName || "—";
  const childName = (id: string) => {
    const child = store.children.find((c) => c.id === id);
    return child ? `${child.firstName} ${child.lastName}` : "Dete";
  };

  const recentDiary = [...store.entries]
    .sort((a, b) => +new Date(b.occurredAt) - +new Date(a.occurredAt))
    .slice(0, 40)
    .map((entry) => ({
      id: entry.id,
      kind: entry.kind,
      kindLabel: ACTIVITY_LABELS[entry.kind],
      title: entry.title,
      body: entry.body,
      occurredAt: entry.occurredAt,
      childName: childName(entry.childId),
      nannyName: nameOf(entry.nannyId),
      hasPhoto: Boolean(entry.photoDataUrl),
    }));

  const recentMessages = [...(store.messages || [])]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 50)
    .map((message) => {
      const sender = store.users.find((u) => u.id === message.senderId);
      return {
        id: message.id,
        body: message.body,
        createdAt: message.createdAt,
        childName: childName(message.childId),
        senderName: sender?.fullName || "Korisnik",
        senderRole: sender?.role,
        senderRoleLabel: sender ? ROLE_LABELS[sender.role] : "—",
      };
    });

  const nannyWorkload = nannies.map((nanny) => {
    const kids = activeAssignments
      .filter((a) => a.nannyId === nanny.id)
      .map((a) => childName(a.childId));
    const diaryCount = store.entries.filter((e) => e.nannyId === nanny.id).length;
    const messageCount = (store.messages || []).filter((m) => m.senderId === nanny.id).length;
    const activeShift = openShifts.some((s) => s.nannyId === nanny.id);
    return {
      id: nanny.id,
      fullName: nanny.fullName,
      email: nanny.email,
      children: kids,
      childCount: kids.length,
      diaryCount,
      messageCount,
      activeShift,
    };
  });

  const parentActivity = parents.map((parent) => {
    const kids = store.parentChildren
      .filter((p) => p.parentId === parent.id)
      .map((p) => ({
        id: p.childId,
        name: childName(p.childId),
        hasNanny: assignedChildIds.has(p.childId),
      }));
    const messageCount = (store.messages || []).filter((m) => m.senderId === parent.id).length;
    return {
      id: parent.id,
      fullName: parent.fullName,
      email: parent.email,
      children: kids,
      childCount: kids.length,
      messageCount,
      waitingNanny: kids.length > 0 && kids.every((k) => !k.hasNanny),
      waitingChild: kids.length === 0,
    };
  });

  return {
    stats: {
      nannies: nannies.length,
      parents: parents.length,
      children: store.children.length,
      activeAssignments: activeAssignments.length,
      childrenWaitingNanny: childrenWaitingNanny.length,
      nanniesWithoutChildren: nanniesWithoutChildren.length,
      parentsWaitingChild: parentsWaitingChild.length,
      parentsWaitingNanny: parentsWaitingNanny.length,
      openShifts: openShifts.length,
      diaryEntries: store.entries.length,
      messages: (store.messages || []).length,
      scheduleUpcoming: upcomingSlots.length,
      scheduleThisWeek: slotsThisWeek.length,
    },
    lists: {
      childrenWaitingNanny: childrenWaitingNanny.map((c) => ({
        id: c.id,
        name: `${c.firstName} ${c.lastName}`,
        parents: store.parentChildren
          .filter((p) => p.childId === c.id)
          .map((p) => nameOf(p.parentId)),
      })),
      nanniesWithoutChildren: nanniesWithoutChildren.map((n) => ({
        id: n.id,
        fullName: n.fullName,
        email: n.email,
      })),
      parentsWaitingChild: parentsWaitingChild.map((p) => ({
        id: p.id,
        fullName: p.fullName,
        email: p.email,
      })),
      parentsWaitingNanny: parentsWaitingNanny.map((p) => ({
        id: p.id,
        fullName: p.fullName,
        email: p.email,
        children: store.parentChildren
          .filter((pc) => pc.parentId === p.id)
          .map((pc) => childName(pc.childId)),
      })),
      openShifts: openShifts.map((s) => ({
        id: s.id,
        childName: childName(s.childId),
        nannyName: nameOf(s.nannyId),
        startedAt: s.startedAt,
      })),
      upcomingSchedule: upcomingSlots
        .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt))
        .slice(0, 12)
        .map((s) => ({
          id: s.id,
          childName: childName(s.childId),
          nannyName: nameOf(s.nannyId),
          startsAt: s.startsAt,
          endsAt: s.endsAt,
          location: s.location,
        })),
    },
    nannyWorkload,
    parentActivity,
    recentDiary,
    recentMessages,
  };
}

export type AdminOverview = ReturnType<typeof buildAdminOverview>;
