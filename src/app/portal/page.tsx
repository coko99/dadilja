import { redirect } from "next/navigation";
import { getSession } from "@/lib/portal/session";

export default async function PortalIndexPage() {
  const session = await getSession();
  if (!session) redirect("/portal/login");
  if (session.role === "admin") redirect("/portal/admin");
  if (session.role === "nanny") redirect("/portal/dadilja");
  redirect("/portal/roditelj");
}
