import { NextResponse } from "next/server";
import { getSession } from "@/lib/portal/session";
import {
  canAccessChat,
  chatParticipants,
  markMessagesRead,
  messagesForChild,
  readStore,
  sendChatMessage,
  unreadCountForUser,
} from "@/lib/portal/demo-store";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const childId = new URL(request.url).searchParams.get("childId");
  if (!childId) {
    return NextResponse.json({
      unread: unreadCountForUser(session.userId, session.role),
    });
  }

  if (!canAccessChat(session.userId, session.role, childId)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  markMessagesRead(session.userId, session.role, childId);
  const store = readStore();
  const messages = messagesForChild(childId).map((message) => ({
    ...message,
    senderName: store.users.find((u) => u.id === message.senderId)?.fullName || "Korisnik",
    senderRole: store.users.find((u) => u.id === message.senderId)?.role,
    mine: message.senderId === session.userId,
  }));

  return NextResponse.json({
    messages,
    participants: chatParticipants(childId),
    unread: unreadCountForUser(session.userId, session.role, childId),
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (session.role !== "parent" && session.role !== "nanny" && session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const childId = String(body.childId || "");
    const text = String(body.body || "");
    sendChatMessage({
      childId,
      senderId: session.userId,
      role: session.role,
      body: text,
    });
    markMessagesRead(session.userId, session.role, childId);
    const store = readStore();
    const messages = messagesForChild(childId).map((message) => ({
      ...message,
      senderName: store.users.find((u) => u.id === message.senderId)?.fullName || "Korisnik",
      senderRole: store.users.find((u) => u.id === message.senderId)?.role,
      mine: message.senderId === session.userId,
    }));
    return NextResponse.json({ ok: true, messages });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Greška" },
      { status: 400 },
    );
  }
}
