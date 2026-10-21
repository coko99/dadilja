import { NextResponse } from "next/server";
import { getSession } from "@/lib/portal/session";
import { ratingsVisibleTo, upsertNannyRating } from "@/lib/portal/demo-store";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role === "nanny") {
    return NextResponse.json({ ratings: [] });
  }
  return NextResponse.json({ ratings: ratingsVisibleTo(session.userId, session.role) });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "admin" && session.role !== "parent") {
    return NextResponse.json({ error: "Dadilje ne mogu da ocenjuju niti da vide ocene." }, { status: 403 });
  }

  const body = await request.json();
  try {
    const rating = upsertNannyRating({
      nannyId: String(body.nannyId || ""),
      raterId: session.userId,
      raterRole: session.role === "admin" ? "admin" : "parent",
      score: Number(body.score),
      comment: body.comment ? String(body.comment) : undefined,
      childId: body.childId ? String(body.childId) : undefined,
    });
    return NextResponse.json({ ok: true, rating });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Greška" },
      { status: 400 },
    );
  }
}
