"use client";

import { products } from "@/data/store";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const handleReserve = async (
    productId: string,
    warehouseId: string
  ) => {
    setLoadingId(productId);

    const response = await fetch("/api/reserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        warehouseId,
      }),
    });

    if (response.status === 409) {
      alert("Stock unavailable");
      setLoadingId(null);
      return;
    }

    const reservation = await response.json();

    router.push(
  `/reservation/${reservation.id}?expiresAt=${reservation.expiresAt}`
);

    setLoadingId(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-slate-100 to-cyan-100 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Inventory Reservation System
          </h1>
          <p className="mt-2 text-slate-600">
            Reserve products across warehouses in real time
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-xl font-medium text-sky-700">
                    ₹{product.price}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {product.stock.map((warehouse) => (
                  <div
                    key={warehouse.warehouseId}
                    className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-medium text-slate-800">
                        {warehouse.warehouseName}
                      </span>

                      <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                        Stock: {warehouse.quantity}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        handleReserve(
                          product.id,
                          warehouse.warehouseId
                        )
                      }
                      disabled={loadingId === product.id}
                      className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 px-4 py-3 font-medium text-white transition hover:from-sky-700 hover:to-cyan-700 disabled:opacity-50"
                    >
                      {loadingId === product.id
                        ? "Reserving..."
                        : "Reserve"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}