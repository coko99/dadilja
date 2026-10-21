import { NextResponse } from "next/server";
import { getSession } from "@/lib/portal/session";
import {
  childrenForUser,
  entriesForChild,
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

  return NextResponse.json({
    session,
    mode: process.env.NEXT_PUBLIC_SUPABASE_URL ? "supabase" : "demo",
    children,
    schedule,
    users: session.role === "admin" ? store.users.map(({ password: _p, ...u }) => u) : [],
    assignments: session.role === "admin" ? store.assignments : [],
    accessLogs: session.role === "admin" ? store.accessLogs.slice(0, 40) : [],
    parents: session.role === "admin" ? store.users.filter((u) => u.role === "parent") : [],
    nannies: session.role === "admin" ? store.users.filter((u) => u.role === "nanny") : [],
    parentChildren: session.role === "admin" ? store.parentChildren : [],
    overview: session.role === "admin" ? buildAdminOverview(store) : null,
  });
}
