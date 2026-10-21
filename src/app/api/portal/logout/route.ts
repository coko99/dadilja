import { NextResponse } from "next/server";
import { clearSessionCookie, getSession } from "@/lib/portal/session";
import { logAccess, readStore, writeStore } from "@/lib/portal/demo-store";

export async function POST() {
  const session = await getSession();
  if (session) {
    const store = readStore();
    logAccess(store, session.userId, "logout");
    writeStore(store);
  }
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
