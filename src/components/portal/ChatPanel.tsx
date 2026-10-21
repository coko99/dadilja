"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { GlassCard } from "@/components/portal/GlassCard";
import { ROLE_LABELS, type UserRole } from "@/lib/portal/types";

type ChatViewMessage = {
  id: string;
  body: string;
  createdAt: string;
  senderName: string;
  senderRole?: UserRole;
  mine: boolean;
};

function formatTime(iso: string) {
  return new Intl.DateTimeFormat("sr-RS", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  }).format(new Date(iso));
}

export function ChatPanel({
  childId,
  childName,
}: {
  childId: string;
  childName: string;
}) {
  const [messages, setMessages] = useState<ChatViewMessage[]>([]);
  const [participants, setParticipants] = useState<{ fullName: string; role: UserRole }[]>([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function load() {
    const response = await fetch(`/api/portal/chat?childId=${encodeURIComponent(childId)}`, {
      cache: "no-store",
    });
    if (!response.ok) return;
    const json = await response.json();
    setMessages(json.messages || []);
    setParticipants(json.participants || []);
  }

  useEffect(() => {
    void load();
    const id = window.setInterval(() => void load(), 3000);
    return () => window.clearInterval(id);
  }, [childId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  async function onSend(event: FormEvent) {
    event.preventDefault();
    if (!text.trim()) return;
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/portal/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childId, body: text }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Slanje nije uspelo.");
      setMessages(json.messages || []);
      setText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška");
    } finally {
      setSending(false);
    }
  }

  const counterpart = participants
    .map((p) => `${p.fullName} (${ROLE_LABELS[p.role]})`)
    .join(" · ");

  return (
    <GlassCard className="flex min-h-[420px] flex-col">
      <div className="border-b border-white/10 pb-3">
        <h2 className="font-serif text-2xl text-[#faf2f4]">Poruke</h2>
        <p className="mt-1 text-sm text-white/60">
          Razgovor oko {childName}
          {counterpart ? ` · ${counterpart}` : ""}
        </p>
      </div>

      <div className="mt-4 max-h-[320px] flex-1 space-y-3 overflow-y-auto pr-1">
        {!messages.length ? (
          <p className="text-sm text-white/55">Još nema poruka. Pošaljite prvu.</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.mine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-[20px] px-3.5 py-2.5 text-sm ${
                  message.mine
                    ? "bg-[#8a4058] text-[#faf2f4]"
                    : "border border-white/10 bg-black/30 text-white/90"
                }`}
              >
                {!message.mine ? (
                  <p className="text-[11px] font-medium text-[#e8a8b8]">
                    {message.senderName}
                    {message.senderRole ? ` · ${ROLE_LABELS[message.senderRole]}` : ""}
                  </p>
                ) : null}
                <p className="mt-0.5 whitespace-pre-wrap leading-relaxed">{message.body}</p>
                <p className={`mt-1 text-[10px] ${message.mine ? "text-white/60" : "text-white/40"}`}>
                  {formatTime(message.createdAt)}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={onSend} className="mt-4 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Napišite poruku…"
          className="portal-input flex-1"
          maxLength={2000}
        />
        <button
          type="submit"
          disabled={sending || !text.trim()}
          className="home-neon-btn shrink-0 rounded-full px-5 py-3 text-sm font-semibold disabled:opacity-50"
        >
          Pošalji
        </button>
      </form>
      {error ? <p className="mt-2 text-sm text-[#f0a0b4]">{error}</p> : null}
    </GlassCard>
  );
}
