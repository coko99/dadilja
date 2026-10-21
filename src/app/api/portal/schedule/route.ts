import { NextResponse } from "next/server";
import { getSession } from "@/lib/portal/session";
import {
  createScheduleSlot,
  readStore,
  scheduleForUser,
  updateScheduleSlot,
} from "@/lib/portal/demo-store";
import type { ScheduleStatus } from "@/lib/portal/types";

function enrich(slots: ReturnType<typeof scheduleForUser>) {
  const store = readStore();
  return slots.map((slot) => {
    const child = store.children.find((c) => c.id === slot.childId);
    const nanny = store.users.find((u) => u.id === slot.nannyId);
    return {
      ...slot,
      childName: child ? `${child.firstName} ${child.lastName}` : "Dete",
      nannyName: nanny?.fullName || "Dadilja",
    };
  });
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const slots = enrich(scheduleForUser(session.userId, session.role));
  return NextResponse.json({ slots });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "admin") {
    return NextResponse.json({ error: "Samo admin može menjati raspored." }, { status: 403 });
  }

  const body = await request.json();
  const action = String(body.action || "create");

  try {
    if (action === "create") {
      const slot = createScheduleSlot({
        childId: String(body.childId || ""),
        nannyId: String(body.nannyId || ""),
        startsAt: String(body.startsAt || ""),
        endsAt: String(body.endsAt || ""),
        location: body.location ? String(body.location) : undefined,
        note: body.note ? String(body.note) : undefined,
        createdBy: session.userId,
      });
      return NextResponse.json({ ok: true, slot });
    }
    if (action === "update" || action === "cancel" || action === "complete") {
      const status: ScheduleStatus | undefined =
        action === "cancel"
          ? "cancelled"
          : action === "complete"
            ? "completed"
            : body.status
              ? (String(body.status) as ScheduleStatus)
              : undefined;
      const slot = updateScheduleSlot({
        id: String(body.id || ""),
        status,
        startsAt: body.startsAt ? String(body.startsAt) : undefined,
        endsAt: body.endsAt ? String(body.endsAt) : undefined,
        location: body.location !== undefined ? String(body.location) : undefined,
        note: body.note !== undefined ? String(body.note) : undefined,
        actorId: session.userId,
      });
      return NextResponse.json({ ok: true, slot });
    }
    return NextResponse.json({ error: "Nepoznata akcija." }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Greška" },
      { status: 400 },
    );
  }
}
