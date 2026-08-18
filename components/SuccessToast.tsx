"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function SuccessToast({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      router.replace(pathname);
    }, 3000);
    return () => clearTimeout(timer);
  }, [pathname, router]);

  if (!visible) return null;

  return (
    <div className="flex items-center gap-2 rounded-2xl bg-teal-50 p-3 text-sm font-medium text-teal-800 shadow-sm [animation:fade-in_0.25s_ease-out] dark:bg-teal-950 dark:text-teal-300">
      <span>✓</span>
      {message}
    </div>
  );
}
