import { NextResponse } from "next/server";
import { getSession } from "@/lib/portal/session";
import {
  adminFeedbackForParent,
  childrenForUser,
  entriesForChild,
  ratingsVisibleTo,
  readStore,
  scheduleForUser,
} from "@/lib/portal/demo-store";
import { buildAdminOverview } from "@/lib/portal/admin-overview";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ session: null }, { status: 401 });
  const store = readStore();
  const children = childrenForUser(session.userId, session.role).map((child) => ({
    ...child,
    entries: entriesForChild(child.id),
    openShift: store.shifts.find(
      (s) => s.childId === child.id && !s.endedAt && (session.role !== "nanny" || s.nannyId === session.userId),
    ),
    assignment: store.assignments.find((a) => a.childId === child.id && a.active),
  }));

  const schedule = scheduleForUser(session.userId, session.role).map((slot) => {
    const child = store.children.find((c) => c.id === slot.childId);
    const nanny = store.users.find((u) => u.id === slot.nannyId);
    return {
      ...slot,
      childName: child ? `${child.firstName} ${child.lastName}` : "Dete",
      nannyName: nanny?.fullName || "Dadilja",
    };
  });

  // Ocene i feedback — dadilja nikad ne dobija podatke
  const ratings =
    session.role === "nanny"
      ? []
      : ratingsVisibleTo(session.userId, session.role).map((r) => ({
          ...r,
          nannyName: store.users.find((u) => u.id === r.nannyId)?.fullName || "Dadilja",
          raterName: store.users.find((u) => u.id === r.raterId)?.fullName || "Korisnik",
        }));

  const assignedNannies =
    session.role === "parent"
      ? (() => {
          const nannyIds = new Set(
            children
              .map((c) => c.assignment?.nannyId)
              .filter((id): id is string => Boolean(id)),
          );
          return store.users
            .filter((u) => nannyIds.has(u.id))
            .map(({ password: _p, ...u }) => {
              const mine = ratings.filter((r) => r.nannyId === u.id && r.raterId === session.userId);
              const adminOnes = ratings.filter((r) => r.nannyId === u.id && r.raterRole === "admin");
              return {
                ...u,
                myRating: mine[0] || null,
                adminRating: adminOnes[0] || null,
              };
            });
        })()
      : [];

  const myFeedback =
    session.role === "parent"
      ? adminFeedbackForParent(session.userId).map((f) => ({
          ...f,
          nannyName: store.users.find((u) => u.id === f.nannyId)?.fullName || "Dadilja",
        }))
      : session.role === "admin"
        ? (store.adminFeedback || [])
            .slice()
            .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
            .map((f) => ({
              ...f,
              parentName: store.users.find((u) => u.id === f.parentId)?.fullName || "Majka",
              nannyName: store.users.find((u) => u.id === f.nannyId)?.fullName || "Dadilja",
              childName: f.childId
                ? (() => {
                    const c = store.children.find((x) => x.id === f.childId);
                    return c ? `${c.firstName} ${c.lastName}` : undefined;
                  })()
                : undefined,
            }))
        : [];

  return NextResponse.json({
    session,
    mode: process.env.NEXT_PUBLIC_SUPABASE_URL ? "supabase" : "demo",
    children,
    schedule,
    ratings,
    assignedNannies,
    feedback: myFeedback,
    users: session.role === "admin" ? store.users.map(({ password: _p, ...u }) => u) : [],
    assignments: session.role === "admin" ? store.assignments : [],
    accessLogs: session.role === "admin" ? store.accessLogs.slice(0, 40) : [],
    parents: session.role === "admin" ? store.users.filter((u) => u.role === "parent") : [],
    nannies: session.role === "admin" ? store.users.filter((u) => u.role === "nanny") : [],
    parentChildren: session.role === "admin" ? store.parentChildren : [],
    overview: session.role === "admin" ? buildAdminOverview(store) : null,
  });
}
