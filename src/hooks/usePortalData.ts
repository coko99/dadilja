"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  AccessLog,
  AdminFeedback,
  Child,
  DiaryEntry,
  NannyAssignment,
  NannyRating,
  ParentChild,
  PortalSession,
  PortalUser,
  CareShift,
  ScheduleSlot,
} from "@/lib/portal/types";
import type { AdminOverview } from "@/lib/portal/admin-overview";

export type PortalChildView = Child & {
  entries: DiaryEntry[];
  openShift?: CareShift;
  assignment?: NannyAssignment;
};

export type ScheduleSlotView = ScheduleSlot & {
  childName: string;
  nannyName: string;
};

export type RatingView = NannyRating & {
  nannyName: string;
  raterName: string;
};

export type AssignedNannyView = PortalUser & {
  myRating: NannyRating | null;
  adminRating: NannyRating | null;
};

export type FeedbackView = AdminFeedback & {
  nannyName?: string;
  parentName?: string;
  childName?: string;
};

export type PortalData = {
  session: PortalSession;
  mode: string;
  children: PortalChildView[];
  schedule: ScheduleSlotView[];
  ratings: RatingView[];
  assignedNannies: AssignedNannyView[];
  feedback: FeedbackView[];
  users: PortalUser[];
  assignments: NannyAssignment[];
  accessLogs: AccessLog[];
  parents: PortalUser[];
  nannies: PortalUser[];
  parentChildren: ParentChild[];
  overview: AdminOverview | null;
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
