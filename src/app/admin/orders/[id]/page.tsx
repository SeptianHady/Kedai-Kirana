"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function OrderDetailPage() {
  const { id } = useParams(); // ambil ID dari URL
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetail = async () => {
    try {
      const res = await fetch(`http://localhost:5000/orders/${id}`);
      const data = await res.json();

      setOrder(data.order);
      setItems(data.items);
    } catch (err) {
      console.error("Error fetching detail:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!order) return <p className="p-4">Order tidak ditemukan.</p>;

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3">📄 Detail Order #{order.id}</h2>

      <button
        className="btn btn-secondary mb-4"
        onClick={() => history.back()}
      >
        ← Kembali
      </button>

      <div className="card mb-4">
        <div className="card-header bg-dark text-white fw-bold">Informasi Pelanggan</div>
        <div className="card-body">
          <p><strong>Nama:</strong> {order.customername}</p>
          <p><strong>Telepon:</strong> {order.customerphone}</p>
          <p><strong>Alamat:</strong> {order.address}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total Harga:</strong> Rp {Number(order.totalprice).toLocaleString()}</p>
          <p><strong>Dibuat:</strong> {new Date(order.created_at).toLocaleString()}</p>
        </div>
      </div>

      <div className="card">
        <div className="card-header bg-primary text-white fw-bold">Item Pesanan</div>
        <ul className="list-group list-group-flush">
          {items.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between">
              <div>
                <strong>Produk ID:</strong> {item.product_id} <br />
                <small>{item.quantity} x Rp {item.price.toLocaleString()}</small>
              </div>

              <span className="fw-bold">
                Rp {(item.quantity * item.price).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
