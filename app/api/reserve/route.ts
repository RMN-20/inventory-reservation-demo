import { products, reservations } from "@/data/store";
import { randomUUID } from "crypto";

function cleanupExpiredReservations() {
  const now = Date.now();

  reservations.forEach((reservation) => {
    if (
      reservation.status === "active" &&
      reservation.expiresAt < now
    ) {
      reservation.status = "expired";
    }
  });
}

export async function POST(request: Request) {
  cleanupExpiredReservations();

  const body = await request.json();

  const { productId, warehouseId } = body;

  const product = products.find(
    (p) => p.id === productId
  );

  if (!product) {
    return Response.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  const warehouse = product.stock.find(
    (w) => w.warehouseId === warehouseId
  );

  if (!warehouse || warehouse.quantity <= 0) {
    return Response.json(
      { message: "Stock unavailable" },
      { status: 409 }
    );
  }

  warehouse.quantity -= 1;

  const reservation = {
    id: randomUUID(),
    productId,
    warehouseId,
    expiresAt: Date.now() + 5 * 60 * 1000,
    status: "active" as const,
  };

  reservations.push(reservation);

  return Response.json(reservation);
}