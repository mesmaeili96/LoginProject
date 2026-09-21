"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BlockedPage() {
  const router = useRouter();

  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const blockedUntil = localStorage.getItem("blockedUntil");

    if (!blockedUntil) {
      router.replace("/login");
      return;
    }

    function updateTimer() {
      const endTime = new Date(blockedUntil!).getTime();

      const difference = endTime - Date.now();

      if (difference <= 0) {
        localStorage.removeItem("blockedUntil");

        router.replace("/login");
        return;
      }

      setSecondsLeft(
        Math.ceil(difference / 1000)
      );
    }

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md rounded-xl border border-red-300 bg-white p-8 text-center shadow-lg">

        <h1 className="mb-4 text-3xl font-bold text-red-600">
          Account Blocked
        </h1>

        <p className="text-lg text-black">
          Too many failed login attempts.
        </p>

        <p className="mt-4 font-semibold text-red-600">
          Try again in {secondsLeft} seconds.
        </p>

      </div>
    </main>
  );
}