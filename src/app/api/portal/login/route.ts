import { NextResponse } from "next/server";
import { findUserByEmail, logAccess, readStore, writeStore } from "@/lib/portal/demo-store";
import { setSessionCookie } from "@/lib/portal/session";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };
  const email = body.email?.trim().toLowerCase() || "";
  const password = body.password || "";
  const user = findUserByEmail(email);
  if (!user || !user.active || user.password !== password) {
    return NextResponse.json({ error: "Pogrešan e-mail ili lozinka." }, { status: 401 });
  }
  await setSessionCookie({
    userId: user.id,
    role: user.role,
    fullName: user.fullName,
    email: user.email,
  });
  const store = readStore();
  logAccess(store, user.id, "login", { role: user.role });
  writeStore(store);
  return NextResponse.json({
    ok: true,
    role: user.role,
    fullName: user.fullName,
  });
}
