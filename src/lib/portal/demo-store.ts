import { randomUUID } from "crypto";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import type {
  AccessLog,
  ActivityKind,
  CareShift,
  ChatMessage,
  Child,
  DiaryEntry,
  NannyAssignment,
  ParentChild,
  PortalStore,
  PortalUser,
  ScheduleSlot,
  ScheduleStatus,
  UserRole,
} from "@/lib/portal/types";

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_PATH = path.join(DATA_DIR, "portal-store.json");

function minsAgo(mins: number) {
  return new Date(Date.now() - mins * 60 * 1000).toISOString();
}

/** dayOffset: 0 = Monday of current week … 6 = Sunday; then hour/minute local. */
function weekSlot(dayOffset: number, hour: number, minute = 0, weekOffset = 0) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  const day = d.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + mondayOffset + weekOffset * 7 + dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

function seed(): PortalStore {
  const adminId = "u-admin";
  const nannyId = "u-nanny";
  const nannyFreeId = "u-nanny-2";
  const nannyAnaId = "u-nanny-3";
  const parentId = "u-parent";
  const parentWaitingId = "u-parent-2";
  const parentNoChildId = "u-parent-3";
  const parentMarkoId = "u-parent-4";
  const childId = "c-luka";
  const childWaitingId = "c-sofija";
  const childNinaId = "c-nina";
  const childWaiting2Id = "c-marko";
  const shiftOpenId = "s-open-1";
  const now = new Date().toISOString();

  return {
    users: [
      {
        id: adminId,
        email: "admin@moja-dadilja.rs",
        fullName: "Ana Admin",
        role: "admin",
        active: true,
        password: "admin123",
        createdAt: now,
      },
      {
        id: nannyId,
        email: "dadilja@moja-dadilja.rs",
        fullName: "Marija Dadilja",
        role: "nanny",
        phone: "+381 65 35 80 352",
        active: true,
        password: "dadilja123",
        createdBy: adminId,
        createdAt: now,
      },
      {
        id: nannyFreeId,
        email: "dadilja2@moja-dadilja.rs",
        fullName: "Ivana Slobodna",
        role: "nanny",
        phone: "+381 64 11 22 333",
        active: true,
        password: "dadilja123",
        createdBy: adminId,
        createdAt: now,
      },
      {
        id: nannyAnaId,
        email: "ana.dadilja@moja-dadilja.rs",
        fullName: "Ana Nikolić",
        role: "nanny",
        phone: "+381 63 44 55 66",
        active: true,
        password: "dadilja123",
        createdBy: adminId,
        createdAt: now,
      },
      {
        id: parentId,
        email: "roditelj@moja-dadilja.rs",
        fullName: "Jelena Roditelj",
        role: "parent",
        phone: "+381 61 22 33 44",
        active: true,
        password: "roditelj123",
        createdBy: adminId,
        createdAt: now,
      },
      {
        id: parentWaitingId,
        email: "majka.ceka@moja-dadilja.rs",
        fullName: "Milica Čeka",
        role: "parent",
        phone: "+381 62 11 00 22",
        active: true,
        password: "roditelj123",
        createdBy: adminId,
        createdAt: now,
      },
      {
        id: parentNoChildId,
        email: "majka.nova@moja-dadilja.rs",
        fullName: "Sanja Nova",
        role: "parent",
        active: true,
        password: "roditelj123",
        createdBy: adminId,
        createdAt: now,
      },
      {
        id: parentMarkoId,
        email: "tata.marko@moja-dadilja.rs",
        fullName: "Marko Jović",
        role: "parent",
        phone: "+381 60 98 76 54",
        active: true,
        password: "roditelj123",
        createdBy: adminId,
        createdAt: now,
      },
    ],
    children: [
      {
        id: childId,
        firstName: "Luka",
        lastName: "Petrović",
        birthDate: "2022-04-12",
        notes: "Voli blokove i šetnju u parku. Alergija na kikiriki.",
        createdBy: adminId,
        createdAt: now,
      },
      {
        id: childWaitingId,
        firstName: "Sofija",
        lastName: "Jovanović",
        birthDate: "2023-09-01",
        notes: "Čeka dodelu dadilje — majka želi 3x nedeljno.",
        createdBy: adminId,
        createdAt: now,
      },
      {
        id: childNinaId,
        firstName: "Nina",
        lastName: "Jović",
        birthDate: "2021-11-03",
        notes: "Voli crtanje i čitanje priča.",
        createdBy: adminId,
        createdAt: now,
      },
      {
        id: childWaiting2Id,
        firstName: "Vuk",
        lastName: "Stanković",
        birthDate: "2024-01-18",
        notes: "Beba — čeka dadilju za popodnevne termine.",
        createdBy: adminId,
        createdAt: now,
      },
    ],
    parentChildren: [
      { parentId, childId },
      { parentId: parentWaitingId, childId: childWaitingId },
      { parentId: parentMarkoId, childId: childNinaId },
      { parentId: parentWaitingId, childId: childWaiting2Id },
    ],
    assignments: [
      {
        id: "a-1",
        nannyId,
        childId,
        assignedBy: adminId,
        assignedAt: minsAgo(60 * 24 * 14),
        active: true,
      },
      {
        id: "a-2",
        nannyId: nannyAnaId,
        childId: childNinaId,
        assignedBy: adminId,
        assignedAt: minsAgo(60 * 24 * 7),
        active: true,
      },
    ],
    shifts: [
      {
        id: shiftOpenId,
        childId,
        nannyId,
        startedAt: minsAgo(185),
        note: "Jutarnje čuvanje kod kuće",
      },
      {
        id: "s-closed-1",
        childId: childNinaId,
        nannyId: nannyAnaId,
        startedAt: minsAgo(60 * 26),
        endedAt: minsAgo(60 * 20),
        note: "Jučerašnje popodne",
      },
    ],
    entries: [
      {
        id: "e-1",
        childId,
        nannyId,
        shiftId: shiftOpenId,
        kind: "shift_start",
        title: "Početak čuvanja",
        body: "Marija je stigla u 8:00. Luka je odmoran i nasmejan.",
        occurredAt: minsAgo(185),
        createdAt: now,
      },
      {
        id: "e-2",
        childId,
        nannyId,
        shiftId: shiftOpenId,
        kind: "meal",
        title: "Doručak",
        body: "Ovsena kaša, banana i čaša mleka. Pojeo sve.",
        occurredAt: minsAgo(160),
        createdAt: now,
      },
      {
        id: "e-3",
        childId,
        nannyId,
        shiftId: shiftOpenId,
        kind: "play",
        title: "Igra sa blokovima",
        body: "Gradio kulu oko 25 minuta, pa smo čitali knjigu o vozovima.",
        occurredAt: minsAgo(120),
        createdAt: now,
      },
      {
        id: "e-4",
        childId,
        nannyId,
        shiftId: shiftOpenId,
        kind: "walk",
        title: "Šetnja u parku",
        body: "40 minuta na igralištu. Lepo vreme, bez kašlja.",
        occurredAt: minsAgo(70),
        createdAt: now,
      },
      {
        id: "e-5",
        childId,
        nannyId,
        shiftId: shiftOpenId,
        kind: "hygiene",
        title: "Pranje ruku i užina",
        body: "Jabuka i jogurt posle šetnje.",
        occurredAt: minsAgo(45),
        createdAt: now,
      },
      {
        id: "e-6",
        childId,
        nannyId,
        shiftId: shiftOpenId,
        kind: "note",
        title: "Raspoloženje",
        body: "Odličan dan — malo umoran posle šetnje, ali dobra volja.",
        occurredAt: minsAgo(25),
        createdAt: now,
      },
      {
        id: "e-7",
        childId: childNinaId,
        nannyId: nannyAnaId,
        kind: "meal",
        title: "Ručak",
        body: "Pileća čorba i hleb. Popila vodu.",
        occurredAt: minsAgo(60 * 22),
        createdAt: now,
      },
      {
        id: "e-8",
        childId: childNinaId,
        nannyId: nannyAnaId,
        kind: "play",
        title: "Crtanje",
        body: "Crtala kuću i mačku — slika u albumu.",
        occurredAt: minsAgo(60 * 21),
        createdAt: now,
      },
      {
        id: "e-9",
        childId: childNinaId,
        nannyId: nannyAnaId,
        kind: "sleep",
        title: "Dnevni odmor",
        body: "Spavala 55 minuta.",
        occurredAt: minsAgo(60 * 20 + 30),
        createdAt: now,
      },
    ],
    messages: [
      {
        id: "m-1",
        childId,
        senderId: parentId,
        body: "Zdravo Marija, kako je Luka danas?",
        createdAt: minsAgo(95),
        readBy: [parentId, nannyId],
      },
      {
        id: "m-2",
        childId,
        senderId: nannyId,
        body: "Odlično je — doručkovao i išli smo u park. Trenutno užina.",
        createdAt: minsAgo(88),
        readBy: [nannyId, parentId],
      },
      {
        id: "m-3",
        childId,
        senderId: parentId,
        body: "Super! Molim te da mu daš jaknu ako duva.",
        createdAt: minsAgo(80),
        readBy: [parentId, nannyId],
      },
      {
        id: "m-4",
        childId,
        senderId: nannyId,
        body: "Naravno, već smo se vratili kući. Sve u redu.",
        createdAt: minsAgo(72),
        readBy: [nannyId, parentId],
      },
      {
        id: "m-5",
        childId: childNinaId,
        senderId: parentMarkoId,
        body: "Ana, da li Nina može danas da ostane do 17h?",
        createdAt: minsAgo(60 * 23),
        readBy: [parentMarkoId, nannyAnaId],
      },
      {
        id: "m-6",
        childId: childNinaId,
        senderId: nannyAnaId,
        body: "Može, bez problema. Javiću ti kad završimo crtanje.",
        createdAt: minsAgo(60 * 22 + 40),
        readBy: [nannyAnaId, parentMarkoId],
      },
      {
        id: "m-7",
        childId: childWaitingId,
        senderId: parentWaitingId,
        body: "Zdravo, da li znate kad ćemo dobiti dadilju za Sofiju?",
        createdAt: minsAgo(40),
        readBy: [parentWaitingId],
      },
      {
        id: "m-8",
        childId: childWaiting2Id,
        senderId: parentWaitingId,
        body: "I za Vuka nam treba popodnevna dadilja od sledeće nedelje.",
        createdAt: minsAgo(18),
        readBy: [parentWaitingId],
      },
    ],
    schedule: [
      {
        id: "sch-1",
        childId,
        nannyId,
        startsAt: weekSlot(0, 8),
        endsAt: weekSlot(0, 13),
        location: "Kod kuće — Petrović",
        note: "Jutarnje čuvanje",
        status: "scheduled",
        createdBy: adminId,
        createdAt: now,
      },
      {
        id: "sch-2",
        childId,
        nannyId,
        startsAt: weekSlot(1, 8),
        endsAt: weekSlot(1, 13),
        location: "Kod kuće — Petrović",
        status: "scheduled",
        createdBy: adminId,
        createdAt: now,
      },
      {
        id: "sch-3",
        childId,
        nannyId,
        startsAt: weekSlot(3, 8),
        endsAt: weekSlot(3, 12),
        location: "Kod kuće — Petrović",
        note: "Kraći termin (roditeljski sastanak)",
        status: "scheduled",
        createdBy: adminId,
        createdAt: now,
      },
      {
        id: "sch-4",
        childId: childNinaId,
        nannyId: nannyAnaId,
        startsAt: weekSlot(2, 14),
        endsAt: weekSlot(2, 18),
        location: "Kod kuće — Jović",
        note: "Popodnevno čuvanje",
        status: "scheduled",
        createdBy: adminId,
        createdAt: now,
      },
      {
        id: "sch-5",
        childId: childNinaId,
        nannyId: nannyAnaId,
        startsAt: weekSlot(4, 9),
        endsAt: weekSlot(4, 13),
        location: "Park + kuća",
        status: "scheduled",
        createdBy: adminId,
        createdAt: now,
      },
      {
        id: "sch-6",
        childId,
        nannyId,
        startsAt: weekSlot(0, 8, 0, 1),
        endsAt: weekSlot(0, 13, 0, 1),
        location: "Kod kuće — Petrović",
        status: "scheduled",
        createdBy: adminId,
        createdAt: now,
      },
      {
        id: "sch-7",
        childId: childNinaId,
        nannyId: nannyAnaId,
        startsAt: weekSlot(1, 14, 0, 1),
        endsAt: weekSlot(1, 18, 0, 1),
        location: "Kod kuće — Jović",
        status: "scheduled",
        createdBy: adminId,
        createdAt: now,
      },
      {
        id: "sch-8",
        childId,
        nannyId,
        startsAt: weekSlot(-1, 9, 0, 0),
        endsAt: weekSlot(-1, 13, 0, 0),
        location: "Kod kuće — Petrović",
        note: "Prošlonedeljni termin",
        status: "completed",
        createdBy: adminId,
        createdAt: now,
      },
      {
        id: "sch-9",
        childId: childNinaId,
        nannyId: nannyAnaId,
        startsAt: weekSlot(5, 10),
        endsAt: weekSlot(5, 14),
        location: "Kod kuće — Jović",
        note: "Otkazano — bolovanje majke",
        status: "cancelled",
        createdBy: adminId,
        createdAt: now,
      },
    ],
    accessLogs: [
      {
        id: "l-1",
        actorId: adminId,
        action: "seed",
        meta: { note: "Demo podaci učitani" },
        createdAt: now,
      },
      {
        id: "l-2",
        actorId: nannyId,
        action: "login",
        meta: { email: "dadilja@moja-dadilja.rs" },
        createdAt: minsAgo(190),
      },
      {
        id: "l-3",
        actorId: parentId,
        action: "login",
        meta: { email: "roditelj@moja-dadilja.rs" },
        createdAt: minsAgo(100),
      },
      {
        id: "l-4",
        actorId: adminId,
        action: "login",
        meta: { email: "admin@moja-dadilja.rs" },
        createdAt: minsAgo(5),
      },
    ],
  };
}

function normalizeStore(raw: PortalStore): PortalStore {
  if (!Array.isArray(raw.messages)) raw.messages = [];
  if (!Array.isArray(raw.schedule)) raw.schedule = [];
  return raw;
}

function ensureStore(): PortalStore {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  if (!existsSync(STORE_PATH)) {
    const initial = seed();
    writeFileSync(STORE_PATH, JSON.stringify(initial, null, 2), "utf8");
    return initial;
  }
  return normalizeStore(JSON.parse(readFileSync(STORE_PATH, "utf8")) as PortalStore);
}

export function readStore(): PortalStore {
  return ensureStore();
}

export function writeStore(store: PortalStore) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

export function logAccess(store: PortalStore, actorId: string | undefined, action: string, meta?: Record<string, string>) {
  const row: AccessLog = {
    id: randomUUID(),
    actorId,
    action,
    meta,
    createdAt: new Date().toISOString(),
  };
  store.accessLogs.unshift(row);
}

export function findUserByEmail(email: string) {
  return readStore().users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function createUser(input: {
  email: string;
  fullName: string;
  role: UserRole;
  password: string;
  phone?: string;
  createdBy?: string;
}) {
  const store = readStore();
  if (store.users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
    throw new Error("Korisnik sa ovim e-mailom već postoji.");
  }
  const user: PortalUser = {
    id: randomUUID(),
    email: input.email.trim().toLowerCase(),
    fullName: input.fullName.trim(),
    role: input.role,
    phone: input.phone,
    active: true,
    password: input.password,
    createdBy: input.createdBy,
    createdAt: new Date().toISOString(),
  };
  store.users.push(user);
  logAccess(store, input.createdBy, "user.create", { userId: user.id, role: user.role });
  writeStore(store);
  return user;
}

export function createChild(input: {
  firstName: string;
  lastName: string;
  birthDate?: string;
  notes?: string;
  parentIds: string[];
  createdBy?: string;
}) {
  const store = readStore();
  const child: Child = {
    id: randomUUID(),
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    birthDate: input.birthDate,
    notes: input.notes,
    createdBy: input.createdBy,
    createdAt: new Date().toISOString(),
  };
  store.children.push(child);
  for (const parentId of input.parentIds) {
    const link: ParentChild = { parentId, childId: child.id };
    if (!store.parentChildren.some((p) => p.parentId === parentId && p.childId === child.id)) {
      store.parentChildren.push(link);
    }
  }
  logAccess(store, input.createdBy, "child.create", { childId: child.id });
  writeStore(store);
  return child;
}

export function assignNanny(input: { nannyId: string; childId: string; assignedBy?: string }) {
  const store = readStore();
  const existing = store.assignments.find(
    (a) => a.nannyId === input.nannyId && a.childId === input.childId,
  );
  if (existing) {
    existing.active = true;
    existing.assignedAt = new Date().toISOString();
    existing.assignedBy = input.assignedBy;
  } else {
    const row: NannyAssignment = {
      id: randomUUID(),
      nannyId: input.nannyId,
      childId: input.childId,
      assignedBy: input.assignedBy,
      assignedAt: new Date().toISOString(),
      active: true,
    };
    store.assignments.push(row);
  }
  logAccess(store, input.assignedBy, "assignment.create", {
    nannyId: input.nannyId,
    childId: input.childId,
  });
  writeStore(store);
  return store.assignments;
}

export function startShift(nannyId: string, childId: string) {
  const store = readStore();
  const open = store.shifts.find((s) => s.nannyId === nannyId && s.childId === childId && !s.endedAt);
  if (open) return open;
  const shift: CareShift = {
    id: randomUUID(),
    childId,
    nannyId,
    startedAt: new Date().toISOString(),
  };
  store.shifts.unshift(shift);
  const entry: DiaryEntry = {
    id: randomUUID(),
    childId,
    nannyId,
    shiftId: shift.id,
    kind: "shift_start",
    title: "Početak čuvanja",
    occurredAt: shift.startedAt,
    createdAt: shift.startedAt,
  };
  store.entries.unshift(entry);
  writeStore(store);
  return shift;
}

export function endShift(nannyId: string, childId: string) {
  const store = readStore();
  const open = store.shifts.find((s) => s.nannyId === nannyId && s.childId === childId && !s.endedAt);
  if (!open) throw new Error("Nema aktivnog čuvanja.");
  open.endedAt = new Date().toISOString();
  store.entries.unshift({
    id: randomUUID(),
    childId,
    nannyId,
    shiftId: open.id,
    kind: "shift_end",
    title: "Kraj čuvanja",
    occurredAt: open.endedAt,
    createdAt: open.endedAt,
  });
  writeStore(store);
  return open;
}

export function addDiaryEntry(input: {
  childId: string;
  nannyId: string;
  kind: ActivityKind;
  title: string;
  body?: string;
  photoDataUrl?: string;
  occurredAt?: string;
}) {
  const store = readStore();
  const allowed = store.assignments.some(
    (a) => a.nannyId === input.nannyId && a.childId === input.childId && a.active,
  );
  if (!allowed) throw new Error("Dadilja nema dodelu za ovo dete.");
  const open = store.shifts.find(
    (s) => s.nannyId === input.nannyId && s.childId === input.childId && !s.endedAt,
  );
  const now = new Date().toISOString();
  const entry: DiaryEntry = {
    id: randomUUID(),
    childId: input.childId,
    nannyId: input.nannyId,
    shiftId: open?.id,
    kind: input.kind,
    title: input.title.trim(),
    body: input.body?.trim(),
    photoDataUrl: input.photoDataUrl,
    occurredAt: input.occurredAt || now,
    createdAt: now,
  };
  store.entries.unshift(entry);
  writeStore(store);
  return entry;
}

export function childrenForUser(userId: string, role: UserRole) {
  const store = readStore();
  if (role === "admin") return store.children;
  if (role === "nanny") {
    const ids = new Set(
      store.assignments.filter((a) => a.nannyId === userId && a.active).map((a) => a.childId),
    );
    return store.children.filter((c) => ids.has(c.id));
  }
  const ids = new Set(store.parentChildren.filter((p) => p.parentId === userId).map((p) => p.childId));
  return store.children.filter((c) => ids.has(c.id));
}

export function entriesForChild(childId: string) {
  return readStore()
    .entries.filter((e) => e.childId === childId)
    .sort((a, b) => +new Date(b.occurredAt) - +new Date(a.occurredAt));
}

export function canAccessChat(userId: string, role: UserRole, childId: string) {
  if (role === "admin") return true;
  const store = readStore();
  if (role === "parent") {
    return store.parentChildren.some((p) => p.parentId === userId && p.childId === childId);
  }
  if (role === "nanny") {
    return store.assignments.some((a) => a.nannyId === userId && a.childId === childId && a.active);
  }
  return false;
}

export function messagesForChild(childId: string) {
  return readStore()
    .messages.filter((m) => m.childId === childId)
    .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
}

export function unreadCountForUser(userId: string, role: UserRole, childId?: string) {
  const store = readStore();
  return store.messages.filter((m) => {
    if (childId && m.childId !== childId) return false;
    if (!canAccessChat(userId, role, m.childId)) return false;
    return m.senderId !== userId && !m.readBy.includes(userId);
  }).length;
}

export function markMessagesRead(userId: string, role: UserRole, childId: string) {
  if (!canAccessChat(userId, role, childId)) return;
  const store = readStore();
  let changed = false;
  for (const message of store.messages) {
    if (message.childId !== childId) continue;
    if (!message.readBy.includes(userId)) {
      message.readBy.push(userId);
      changed = true;
    }
  }
  if (changed) writeStore(store);
}

export function sendChatMessage(input: { childId: string; senderId: string; role: UserRole; body: string }) {
  const body = input.body.trim();
  if (!body) throw new Error("Poruka ne može biti prazna.");
  if (body.length > 2000) throw new Error("Poruka je predugačka.");
  if (!canAccessChat(input.senderId, input.role, input.childId)) {
    throw new Error("Nemate pristup ovom razgovoru.");
  }
  if (input.role === "admin") {
    // admin može da čita, ali chat je za roditelja i dadilju
  }
  const store = readStore();
  const message: ChatMessage = {
    id: randomUUID(),
    childId: input.childId,
    senderId: input.senderId,
    body,
    createdAt: new Date().toISOString(),
    readBy: [input.senderId],
  };
  store.messages.push(message);
  logAccess(store, input.senderId, "chat.send", { childId: input.childId });
  writeStore(store);
  return message;
}

export function chatParticipants(childId: string) {
  const store = readStore();
  const parentIds = store.parentChildren.filter((p) => p.childId === childId).map((p) => p.parentId);
  const nannyIds = store.assignments.filter((a) => a.childId === childId && a.active).map((a) => a.nannyId);
  const ids = [...new Set([...parentIds, ...nannyIds])];
  return store.users
    .filter((u) => ids.includes(u.id))
    .map(({ password: _p, ...user }) => user);
}

export function scheduleForUser(userId: string, role: UserRole): ScheduleSlot[] {
  const store = readStore();
  const slots = store.schedule || [];
  if (role === "admin") return [...slots].sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt));
  if (role === "nanny") {
    return slots
      .filter((s) => s.nannyId === userId)
      .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt));
  }
  const childIds = new Set(
    store.parentChildren.filter((p) => p.parentId === userId).map((p) => p.childId),
  );
  return slots
    .filter((s) => childIds.has(s.childId))
    .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt));
}

export function createScheduleSlot(input: {
  childId: string;
  nannyId: string;
  startsAt: string;
  endsAt: string;
  location?: string;
  note?: string;
  createdBy?: string;
}) {
  const store = readStore();
  const child = store.children.find((c) => c.id === input.childId);
  const nanny = store.users.find((u) => u.id === input.nannyId && u.role === "nanny");
  if (!child) throw new Error("Dete nije pronađeno.");
  if (!nanny) throw new Error("Dadilja nije pronađena.");
  const starts = new Date(input.startsAt);
  const ends = new Date(input.endsAt);
  if (Number.isNaN(+starts) || Number.isNaN(+ends)) throw new Error("Neispravan datum/vreme.");
  if (ends <= starts) throw new Error("Kraj mora biti posle početka.");

  const overlap = (store.schedule || []).some((s) => {
    if (s.status === "cancelled") return false;
    if (s.nannyId !== input.nannyId && s.childId !== input.childId) return false;
    const a0 = +new Date(s.startsAt);
    const a1 = +new Date(s.endsAt);
    return +starts < a1 && +ends > a0;
  });
  if (overlap) throw new Error("Termin se preklapa sa postojećim (ista dadilja ili isto dete).");

  const slot: ScheduleSlot = {
    id: randomUUID(),
    childId: input.childId,
    nannyId: input.nannyId,
    startsAt: starts.toISOString(),
    endsAt: ends.toISOString(),
    location: input.location?.trim() || undefined,
    note: input.note?.trim() || undefined,
    status: "scheduled",
    createdBy: input.createdBy,
    createdAt: new Date().toISOString(),
  };
  store.schedule = store.schedule || [];
  store.schedule.push(slot);
  logAccess(store, input.createdBy, "schedule.create", { slotId: slot.id, childId: slot.childId });
  writeStore(store);
  return slot;
}

export function updateScheduleSlot(input: {
  id: string;
  status?: ScheduleStatus;
  startsAt?: string;
  endsAt?: string;
  location?: string;
  note?: string;
  actorId?: string;
}) {
  const store = readStore();
  const slot = (store.schedule || []).find((s) => s.id === input.id);
  if (!slot) throw new Error("Termin nije pronađen.");
  if (input.status) slot.status = input.status;
  if (input.startsAt) slot.startsAt = new Date(input.startsAt).toISOString();
  if (input.endsAt) slot.endsAt = new Date(input.endsAt).toISOString();
  if (input.location !== undefined) slot.location = input.location.trim() || undefined;
  if (input.note !== undefined) slot.note = input.note.trim() || undefined;
  if (new Date(slot.endsAt) <= new Date(slot.startsAt)) {
    throw new Error("Kraj mora biti posle početka.");
  }
  logAccess(store, input.actorId, "schedule.update", { slotId: slot.id, status: slot.status });
  writeStore(store);
  return slot;
}
