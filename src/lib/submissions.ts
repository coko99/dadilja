export type SubmissionKind = "inquiry" | "contact" | "nanny-application";

type DeliverInput = {
  kind: SubmissionKind;
  payload: Record<string, unknown>;
};

/**
 * Adapter za kasnije povezivanje sa Resend, Supabase ili drugim endpointom.
 * Ključevi se čitaju isključivo iz okruženja i nisu upisani u kod.
 */
export async function deliverSubmission({ kind, payload }: DeliverInput) {
  const webhook = process.env.SUBMISSION_WEBHOOK_URL;
  const receivedAt = new Date().toISOString();

  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, payload, receivedAt }),
    });
    if (!response.ok) {
      throw new Error("Webhook nije prihvatio prijavu.");
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (resendKey && to) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "Moja dadilja <onboarding@resend.dev>",
        to: [to],
        subject: `Moja dadilja — ${kind}`,
        text: JSON.stringify({ kind, payload, receivedAt }, null, 2),
      }),
    });
    if (!response.ok) {
      throw new Error("Poruka nije poslata.");
    }
  }

  return { ok: true as const, receivedAt };
}
