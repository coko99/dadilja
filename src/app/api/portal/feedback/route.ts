import { NextResponse } from "next/server";
import { getSession } from "@/lib/portal/session";
import {
  adminFeedbackForParent,
  createAdminFeedback,
  markAdminFeedbackRead,
  readStore,
} from "@/lib/portal/demo-store";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role === "nanny") {
    return NextResponse.json({ feedback: [] });
  }

  const store = readStore();
  if (session.role === "admin") {
    const rows = [...(store.adminFeedback || [])].sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    );
    const enriched = rows.map((f) => ({
      ...f,
      parentName: store.users.find((u) => u.id === f.parentId)?.fullName || "Majka",
      nannyName: store.users.find((u) => u.id === f.nannyId)?.fullName || "Dadilja",
      childName: f.childId
        ? (() => {
            const c = store.children.find((x) => x.id === f.childId);
            return c ? `${c.firstName} ${c.lastName}` : undefined;
          })()
        : undefined,
    }));
    return NextResponse.json({ feedback: enriched });
  }

  const rows = adminFeedbackForParent(session.userId);
  const enriched = rows.map((f) => ({
    ...f,
    nannyName: store.users.find((u) => u.id === f.nannyId)?.fullName || "Dadilja",
  }));
  return NextResponse.json({ feedback: enriched });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const action = String(body.action || "create");

  try {
    if (action === "create") {
      if (session.role !== "parent") {
        return NextResponse.json({ error: "Samo majka može da piše adminu o dadilji." }, { status: 403 });
      }
      const feedback = createAdminFeedback({
        parentId: session.userId,
        nannyId: String(body.nannyId || ""),
        childId: body.childId ? String(body.childId) : undefined,
        body: String(body.body || ""),
      });
      return NextResponse.json({ ok: true, feedback });
    }
    if (action === "markRead") {
      if (session.role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      const ids = Array.isArray(body.ids) ? body.ids.map(String) : [];
      markAdminFeedbackRead(ids, session.userId);
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
