export type WarehouseStock = {
  warehouseId: string;
  warehouseName: string;
  quantity: number;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  stock: WarehouseStock[];
};

export type Reservation = {
  id: string;
  productId: string;
  warehouseId: string;
  expiresAt: number;
  status: "active" | "confirmed" | "expired" | "cancelled";
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Wireless Mouse",
    price: 799,
    stock: [
      {
        warehouseId: "w1",
        warehouseName: "Chennai Warehouse",
        quantity: 5,
      },
      {
        warehouseId: "w2",
        warehouseName: "Bangalore Warehouse",
        quantity: 3,
      },
    ],
  },
  {
    id: "p2",
    name: "Mechanical Keyboard",
    price: 2499,
    stock: [
      {
        warehouseId: "w1",
        warehouseName: "Chennai Warehouse",
        quantity: 2,
      },
      {
        warehouseId: "w2",
        warehouseName: "Bangalore Warehouse",
        quantity: 4,
      },
    ],
  },
];

export const reservations: Reservation[] = [];