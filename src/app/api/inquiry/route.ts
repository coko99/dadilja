import { NextResponse } from "next/server";
import { deliverSubmission } from "@/lib/submissions";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || body.company) return NextResponse.json({ ok: true });
  if (!body.name || !body.email || !body.phone || !body.privacy) {
    return NextResponse.json({ ok: false, message: "Proverite obavezna polja." }, { status: 400 });
  }
  try {
    await deliverSubmission({
      kind: "inquiry",
      payload: {
        children: body.children,
        ages: body.ages,
        city: body.city,
        period: body.period,
        timeFrom: body.timeFrom,
        timeTo: body.timeTo,
        engagement: body.engagement,
        name: body.name,
        phone: body.phone,
        email: body.email,
      },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
