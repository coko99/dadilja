import { NextResponse } from "next/server";
import { getSession } from "@/lib/portal/session";
import { assignNanny, createChild, createUser } from "@/lib/portal/demo-store";
import type { UserRole } from "@/lib/portal/types";

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "admin") return null;
  return session;
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await request.json();
  const action = body.action as string;

  try {
    if (action === "createUser") {
      const user = createUser({
        email: String(body.email || ""),
        fullName: String(body.fullName || ""),
        role: body.role as UserRole,
        password: String(body.password || "promeni123"),
        phone: body.phone ? String(body.phone) : undefined,
        createdBy: session.userId,
      });
      const { password: _p, ...safe } = user;
      return NextResponse.json({ ok: true, user: safe });
    }
    if (action === "createChild") {
      const child = createChild({
        firstName: String(body.firstName || ""),
        lastName: String(body.lastName || ""),
        birthDate: body.birthDate ? String(body.birthDate) : undefined,
        notes: body.notes ? String(body.notes) : undefined,
        parentIds: Array.isArray(body.parentIds) ? body.parentIds.map(String) : [],
        createdBy: session.userId,
      });
      return NextResponse.json({ ok: true, child });
    }
    if (action === "assignNanny") {
      assignNanny({
        nannyId: String(body.nannyId || ""),
        childId: String(body.childId || ""),
        assignedBy: session.userId,
      });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Nepoznata akcija." }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Greška" },
      { status: 400 },
    );
  }
}
