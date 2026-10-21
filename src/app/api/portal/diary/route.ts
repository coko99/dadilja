import { NextResponse } from "next/server";
import { getSession } from "@/lib/portal/session";
import { addDiaryEntry, endShift, entriesForChild, startShift } from "@/lib/portal/demo-store";
import type { ActivityKind } from "@/lib/portal/types";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const childId = new URL(request.url).searchParams.get("childId");
  if (!childId) return NextResponse.json({ error: "childId required" }, { status: 400 });
  return NextResponse.json({ entries: entriesForChild(childId) });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const action = body.action as string;
  const childId = String(body.childId || "");

  try {
    if (action === "startShift") {
      if (session.role !== "nanny" && session.role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      const shift = startShift(session.userId, childId);
      return NextResponse.json({ ok: true, shift, entries: entriesForChild(childId) });
    }
    if (action === "endShift") {
      if (session.role !== "nanny" && session.role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      const shift = endShift(session.userId, childId);
      return NextResponse.json({ ok: true, shift, entries: entriesForChild(childId) });
    }
    if (action === "addEntry") {
      if (session.role !== "nanny" && session.role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      const entry = addDiaryEntry({
        childId,
        nannyId: session.userId,
        kind: (body.kind || "note") as ActivityKind,
        title: String(body.title || ""),
        body: body.body ? String(body.body) : undefined,
        photoDataUrl: body.photoDataUrl ? String(body.photoDataUrl) : undefined,
        occurredAt: body.occurredAt ? String(body.occurredAt) : undefined,
      });
      return NextResponse.json({ ok: true, entry, entries: entriesForChild(childId) });
    }
    return NextResponse.json({ error: "Nepoznata akcija." }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Greška" },
      { status: 400 },
    );
  }
}
