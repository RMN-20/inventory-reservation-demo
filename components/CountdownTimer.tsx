"use client";

import { useEffect, useState } from "react";

type Props = {
  expiresAt: number;
};

export default function CountdownTimer({
  expiresAt,
}: Props) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      setTimeLeft(expiresAt - Date.now());
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

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