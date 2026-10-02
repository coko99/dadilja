"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const words = [
  "Majčinstvo",
  "Dadilja",
  "Poverenje",
  "Porodica",
  "Nežnost",
  "Briga",
  "Sigurnost",
  "Dom",
  "Bliskost",
  "Podrška",
  "Mir",
  "Ritam",
];

export function Preloader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const bootDone = useRef(false);
  const lastPath = useRef(pathname);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const showThenHide = (minMs: number) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    clearTimers();
    setVisible(true);
    setLeaving(false);
    setWordIndex(0);
    const started = performance.now();
    const finish = () => {
      const wait = Math.max(0, minMs - (performance.now() - started));
      timers.current.push(
        window.setTimeout(() => {
          setLeaving(true);
          timers.current.push(
            window.setTimeout(
              () => {
                setVisible(false);
                setLeaving(false);
                bootDone.current = true;
              },
              reduce ? 120 : 420,
            ),
          );
        }, wait),
      );
    };
    finish();
  };

  useEffect(() => {
    if (!visible) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setWordIndex((value) => (value + 1) % words.length);
    }, 700);
    return () => window.clearInterval(id);
  }, [visible]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let started = false;
    const hide = () => {
      if (started) return;
      started = true;
      showThenHide(reduce ? 250 : 1100);
    };

    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide, { once: true });

    const fallback = window.setTimeout(hide, 2800);
    return () => {
      window.removeEventListener("load", hide);
      window.clearTimeout(fallback);
      clearTimers();
    };
    // Initial boot only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!bootDone.current) {
      lastPath.current = pathname;
      return;
    }
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    showThenHide(reduce ? 180 : 720);
    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
        <svg className="preloader-heart" viewBox="0 0 32 32" aria-hidden>
          <path d="M16 27s-9.2-5.7-12.2-11.1C2.1 12.6 3.2 8.2 7.1 7.2c2.2-.6 4.2.3 5.4 2.1C13.7 7.5 15.7 6.6 17.9 7.2c3.9 1 5 5.4 3.3 8.7C25.2 21.3 16 27 16 27z" />
        </svg>
      </div>
      <p className="preloader-label">Moja dadilja</p>
      <div className="preloader-words" aria-hidden>
        <span key={`${pathname}-${wordIndex}`} className="preloader-word">
          {words[wordIndex]}
        </span>
      </div>
    </div>
  );
}
