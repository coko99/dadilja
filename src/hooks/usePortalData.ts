"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  AccessLog,
  Child,
  DiaryEntry,
  NannyAssignment,
  ParentChild,
  PortalSession,
  PortalUser,
  CareShift,
} from "@/lib/portal/types";

export type PortalChildView = Child & {
  entries: DiaryEntry[];
  openShift?: CareShift;
  assignment?: NannyAssignment;
};

export type PortalData = {
  session: PortalSession;
  mode: string;
  children: PortalChildView[];
  users: PortalUser[];
  assignments: NannyAssignment[];
  accessLogs: AccessLog[];
  parents: PortalUser[];
  nannies: PortalUser[];
  parentChildren: ParentChild[];
};

export function usePortalData(pollMs = 0) {
  const [data, setData] = useState<PortalData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    const response = await fetch("/api/portal/me", { cache: "no-store" });
    if (response.status === 401) {
      setError("unauthorized");
      setData(null);
      setLoading(false);
      return;
    }
    if (!response.ok) {
      setError("Greška pri učitavanju.");
      setLoading(false);
      return;
    }
    const json = (await response.json()) as PortalData;
    setData(json);
    setError("");
    setLoading(false);
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  useEffect(() => {
    if (!pollMs) return;
    const id = window.setInterval(() => void reload(), pollMs);
    return () => window.clearInterval(id);
  }, [pollMs, reload]);

  return { data, error, loading, reload };
}
