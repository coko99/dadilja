import { NextResponse } from "next/server";
import { deliverSubmission } from "@/lib/submissions";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || body.company) return NextResponse.json({ ok: true });
  if (!body.name || !body.email || !body.message || !body.privacy) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  try {
    await deliverSubmission({
      kind: "contact",
      payload: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        topic: body.topic,
        message: body.message,
      },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
