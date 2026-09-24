import { NextResponse } from "next/server";
import { deliverSubmission } from "@/lib/submissions";

export async function POST(request: Request) {
  const form = await request.formData();
  if (String(form.get("company") || "")) return NextResponse.json({ ok: true });
  const cv = form.get("cv");
  if (!(cv instanceof File) || cv.size === 0 || cv.size > 5 * 1024 * 1024) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const photo = form.get("photo");
  try {
    await deliverSubmission({
      kind: "nanny-application",
      payload: {
        firstName: form.get("firstName"),
        lastName: form.get("lastName"),
        birthDate: form.get("birthDate"),
        city: form.get("city"),
        phone: form.get("phone"),
        email: form.get("email"),
        experience: form.get("experience"),
        ages: form.getAll("ages"),
        types: form.getAll("types"),
        license: form.get("license"),
        languages: form.get("languages"),
        availability: form.get("availability"),
        message: form.get("message"),
        cvName: cv.name,
        cvSize: cv.size,
        photoName: photo instanceof File && photo.size > 0 ? photo.name : null,
      },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
