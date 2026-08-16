"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

type ReminderRow = {
  id: string;
  label: string;
  time_of_day: string;
  days_of_week: number[];
  is_active: boolean;
};

const MATCH_WINDOW_MS = 90_000;

export function ReminderNotifier() {
  const firedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) return;

    const supabase = createClient();

    async function checkReminders() {
      if (Notification.permission !== "granted") return;

      const { data: reminders } = await supabase
        .from("reminders")
        .select("id, label, time_of_day, days_of_week, is_active")
        .eq("is_active", true);

      if (!reminders) return;

      const now = new Date();
      const day = now.getDay();
      const todayKey = now.toISOString().slice(0, 10);

      (reminders as ReminderRow[]).forEach((reminder) => {
        if (!reminder.days_of_week.includes(day)) return;

        const [hours, minutes] = reminder.time_of_day.split(":").map(Number);
        const target = new Date(now);
        target.setHours(hours, minutes, 0, 0);

        const diffMs = now.getTime() - target.getTime();
        if (diffMs < 0 || diffMs > MATCH_WINDOW_MS) return;

        const fireKey = `${reminder.id}-${todayKey}`;
        if (firedRef.current.has(fireKey)) return;
        firedRef.current.add(fireKey);

        new Notification("GlicCare", { body: reminder.label });
      });
    }

    checkReminders();
    const interval = setInterval(checkReminders, 15_000);

    function onVisible() {
      if (document.visibilityState === "visible") checkReminders();
    }
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", checkReminders);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", checkReminders);
    };
  }, []);

  return null;
}
