"use client";

import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(5 * 60 * 1000);

  useEffect(() => {
    const expiresAt = Date.now() + 5 * 60 * 1000;

    const interval = setInterval(() => {
      setTimeLeft(expiresAt - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeLeft <= 0) {
    return (
      <p className="mt-2 text-4xl font-bold text-rose-600">
        Expired
      </p>
    );
  }

  const totalSeconds = Math.floor(timeLeft / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <p className="mt-2 text-4xl font-bold text-sky-700">
      {String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </p>
  );
}