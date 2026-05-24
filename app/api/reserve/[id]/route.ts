import { reservations } from "@/data/store";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: Props
) {
  const { id } = await params;

  const reservation = reservations.find(
    (r) => r.id === id
  );

  if (!reservation) {
    return Response.json(
      { message: "Reservation not found" },
      { status: 404 }
    );
  }

  if (
    reservation.status === "expired" ||
    reservation.expiresAt < Date.now()
  ) {
    return Response.json(
      { message: "Reservation expired" },
      { status: 410 }
    );
  }

  return Response.json(reservation);
}