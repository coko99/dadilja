"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const started = performance.now();
    const minMs = reduce ? 200 : 900;
    let closed = false;

    const close = () => {
      if (closed) return;
      closed = true;
      const wait = Math.max(0, minMs - (performance.now() - started));
      window.setTimeout(() => {
        setLeaving(true);
        window.setTimeout(() => setVisible(false), reduce ? 120 : 480);
      }, wait);
    };

    if (document.readyState === "complete") {
      close();
    } else {
      window.addEventListener("load", close, { once: true });
    }

    const fallback = window.setTimeout(close, 2800);
    return () => {
      window.removeEventListener("load", close);
      window.clearTimeout(fallback);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`preloader ${leaving ? "preloader-leave" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Učitavanje"
    >
      <div className="preloader-mark">
        <svg className="preloader-ring" viewBox="0 0 120 120" aria-hidden>
          <circle className="preloader-ring-track" cx="60" cy="60" r="52" />
          <circle className="preloader-ring-active" cx="60" cy="60" r="52" />
        </svg>
        <svg className="preloader-bottle" viewBox="0 0 64 64" aria-hidden>
          <path
            d="M26 8h12v6c0 2-1 3-3 4l1 4h-8l1-4c-2-1-3-2-3-4V8z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M24 22h16c3 0 5 2 5 5v8c0 10-5 21-13 21s-13-11-13-21v-8c0-3 2-5 5-5z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M24 30h26"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path
            d="M27 38c3 6 7 10 11 10s8-4 11-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.45"
          />
        </svg>
      </div>
      <p className="preloader-label">Moja dadilja</p>
    </div>
  );
}
