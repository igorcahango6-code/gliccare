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

function currentHHMM(date: Date) {
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}`;
}

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
      const hhmm = currentHHMM(now);
      const day = now.getDay();
      const todayKey = now.toISOString().slice(0, 10);

      (reminders as ReminderRow[]).forEach((reminder) => {
        if (!reminder.days_of_week.includes(day)) return;
        if (reminder.time_of_day.slice(0, 5) !== hhmm) return;

        const fireKey = `${reminder.id}-${todayKey}-${hhmm}`;
        if (firedRef.current.has(fireKey)) return;
        firedRef.current.add(fireKey);

        new Notification("GlicCare", { body: reminder.label });
      });
    }

    checkReminders();
    const interval = setInterval(checkReminders, 20_000);
    return () => clearInterval(interval);
  }, []);

  return null;
}
