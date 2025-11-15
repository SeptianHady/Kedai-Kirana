"use client";

import React, { useEffect, useState } from "react";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: OrderItem[];
  total: number;
  status: string;
  created_at: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // sementara pakai data dummy
    const dummyOrders: Order[] = [
      {
        id: 1,
        customer_name: "Sinta Dewi",
        customer_phone: "081234567890",
        customer_address: "Jl. Melati No. 45, Jakarta",
        items: [
          { name: "Nasi Goreng Kirana", price: 25000, quantity: 2 },
          { name: "Teh Manis Dingin", price: 8000, quantity: 2 },
        ],
        total: 66000,
        status: "Selesai",
        created_at: "2025-11-12",
      },
      {
        id: 2,
        customer_name: "Budi Santoso",
        customer_phone: "089876543210",
        customer_address: "Jl. Kenanga No. 12, Bandung",
        items: [
          { name: "Mie Ayam Kirana", price: 20000, quantity: 1 },
          { name: "Es Jeruk", price: 10000, quantity: 1 },
        ],
        total: 30000,
        status: "Diproses",
        created_at: "2025-11-11",
      },
    ];

    setOrders(dummyOrders);
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">📦 Daftar Pesanan Pelanggan</h2>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nama Pelanggan</th>
              <th>No. Telepon</th>
              <th>Alamat</th>
              <th>Item</th>
              <th>Total</th>
              <th>Status</th>
              <th>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.customer_phone}</td>
                  <td>{order.customer_address}</td>
                  <td>
                    <ul className="list-unstyled mb-0">
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.name} x{item.quantity} — Rp{" "}
                          {(item.price * item.quantity).toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>Rp {order.total.toLocaleString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.status === "Selesai"
                          ? "bg-success"
                          : order.status === "Diproses"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>{order.created_at}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  Tidak ada pesanan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
