export type UserRole = "admin" | "nanny" | "parent";

export type ActivityKind =
  | "meal"
  | "sleep"
  | "play"
  | "walk"
  | "hygiene"
  | "note"
  | "other"
  | "shift_start"
  | "shift_end";

export type PortalUser = {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  active: boolean;
  password?: string;
  createdBy?: string;
  createdAt: string;
};

export type Child = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate?: string;
  notes?: string;
  createdBy?: string;
  createdAt: string;
};

export type NannyAssignment = {
  id: string;
  nannyId: string;
  childId: string;
  assignedBy?: string;
  assignedAt: string;
  active: boolean;
};

export type ParentChild = {
  parentId: string;
  childId: string;
};

export type CareShift = {
  id: string;
  childId: string;
  nannyId: string;
  startedAt: string;
  endedAt?: string;
  note?: string;
};

export type DiaryEntry = {
  id: string;
  childId: string;
  nannyId: string;
  shiftId?: string;
  kind: ActivityKind;
  title: string;
  body?: string;
  photoDataUrl?: string;
  occurredAt: string;
  createdAt: string;
};

export type AccessLog = {
  id: string;
  actorId?: string;
  action: string;
  meta?: Record<string, string>;
  createdAt: string;
};

export type ChatMessage = {
  id: string;
  childId: string;
  senderId: string;
  body: string;
  createdAt: string;
  readBy: string[];
};

export type PortalSession = {
  userId: string;
  role: UserRole;
  fullName: string;
  email: string;
};

export type PortalStore = {
  users: PortalUser[];
  children: Child[];
  parentChildren: ParentChild[];
  assignments: NannyAssignment[];
  shifts: CareShift[];
  entries: DiaryEntry[];
  messages: ChatMessage[];
  accessLogs: AccessLog[];
};

export const ACTIVITY_LABELS: Record<ActivityKind, string> = {
  meal: "Obrok",
  sleep: "Spavanje",
  play: "Igra",
  walk: "Šetnja",
  hygiene: "Higijena",
  note: "Napomena",
  other: "Ostalo",
  shift_start: "Početak čuvanja",
  shift_end: "Kraj čuvanja",
};

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Administrator",
  nanny: "Dadilja",
  parent: "Roditelj",
};
