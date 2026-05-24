"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  reservationId: string;
};

export default function ReservationActions({
  reservationId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);

    alert(`Purchase confirmed for ${reservationId}`);

    router.push("/");
  };

  const handleCancel = async () => {
    setLoading(true);

    alert(`Reservation cancelled`);

    router.push("/");
  };

  return (
    <div className="mt-8 flex gap-4">
      <button
        onClick={handleConfirm}
        disabled={loading}
        className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
      >
        Confirm Purchase
      </button>

      <button
        onClick={handleCancel}
        disabled={loading}
        className="flex-1 rounded-xl bg-rose-600 px-4 py-3 font-medium text-white hover:bg-rose-700 disabled:opacity-50"
      >
        Cancel Reservation
      </button>
    </div>
  );
}