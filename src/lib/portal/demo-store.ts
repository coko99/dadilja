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
  UserRole,
} from "@/lib/portal/types";

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_PATH = path.join(DATA_DIR, "portal-store.json");

function seed(): PortalStore {
  const adminId = "u-admin";
  const nannyId = "u-nanny";
  const parentId = "u-parent";
  const childId = "c-milos";
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
        id: parentId,
        email: "roditelj@moja-dadilja.rs",
        fullName: "Jelena Roditelj",
        role: "parent",
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
        notes: "Voli blokove i šetnju u parku.",
        createdBy: adminId,
        createdAt: now,
      },
    ],
    parentChildren: [{ parentId, childId }],
    assignments: [
      {
        id: "a-1",
        nannyId,
        childId,
        assignedBy: adminId,
        assignedAt: now,
        active: true,
      },
    ],
    shifts: [],
    entries: [
      {
        id: "e-1",
        childId,
        nannyId,
        kind: "meal",
        title: "Doručak",
        body: "Ovsena kaša i banana.",
        occurredAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        createdAt: now,
      },
      {
        id: "e-2",
        childId,
        nannyId,
        kind: "play",
        title: "Igra sa blokovima",
        body: "Gradio kulu oko 25 minuta.",
        occurredAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
        createdAt: now,
      },
    ],
    messages: [
      {
        id: "m-1",
        childId,
        senderId: parentId,
        body: "Zdravo Marija, kako je Luka danas?",
        createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
        readBy: [parentId, nannyId],
      },
      {
        id: "m-2",
        childId,
        senderId: nannyId,
        body: "Odlično je — doručkovao i trenutno se igra blokovima.",
        createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
        readBy: [nannyId, parentId],
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
    ],
  };
}

function normalizeStore(raw: PortalStore): PortalStore {
  if (!Array.isArray(raw.messages)) raw.messages = [];
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
