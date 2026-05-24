import CountdownTimer from "@/components/CountdownTimer";
import ReservationActions from "@/components/ReservationActions";

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    expiresAt?: string;
  }>;
};

export default async function ReservationPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { expiresAt } = await searchParams;

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
          {id}
        </p>

        <div className="mt-8 rounded-2xl bg-sky-50 p-6">
          <p className="text-lg font-medium text-slate-800">
            Reservation expires in:
          </p>

          <CountdownTimer
            expiresAt={Number(expiresAt)}
          />
        </div>

        <ReservationActions reservationId={id} />
      </div>
    </main>
  );
}