import CountdownTimer from "@/components/CountdownTimer";
import ReservationActions from "@/components/ReservationActions";
import { reservations } from "@/data/store";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ReservationPage({
  params,
}: Props) {
  const { id } = await params;

  const reservation = reservations.find(
    (r) => r.id === id
  );

  if (!reservation) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-slate-100 to-cyan-100 p-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Reservation not found
        </h1>
      </main>
    );
  }

  if (reservation.status === "expired") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-slate-100 to-cyan-100 p-8">
        <h1 className="text-2xl font-bold text-rose-600">
          Reservation expired
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-slate-100 to-cyan-100 p-8">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-slate-900">
          Reservation Details
        </h1>

        <p className="mt-4 text-slate-600">
          Reservation ID
        </p>

        <p className="mt-1 rounded-lg bg-slate-100 p-3 font-mono text-sm text-slate-800">
          {reservation.id}
        </p>

        <div className="mt-8 rounded-2xl bg-sky-50 p-6">
          <p className="text-lg font-medium text-slate-800">
            Reservation expires in:
          </p>

          <CountdownTimer />
        </div>

        <ReservationActions reservationId={reservation.id} />
      </div>
    </main>
  );
}