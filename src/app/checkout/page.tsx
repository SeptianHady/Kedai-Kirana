"use client";
import React, { useState } from "react";
import { useCart } from "@/context/cartContext";

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) return alert("Keranjang masih kosong!");

    // 🔥 Siapkan payload untuk backend
    const orderBody = {
      customer_name: name,
      customer_address: address,
      payment_method: payment,
      items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.qty,
        price: item.price,
      })),
    };

    try {
      const res = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderBody),
      });

      const data = await res.json();

      if (!res.ok) {
        return alert("Gagal membuat pesanan: " + data.error);
      }

      console.log("ORDER CREATED:", data);

      setIsSubmitted(true);
      clearCart();
    } catch (err) {
      alert("Terjadi kesalahan saat checkout");
      console.error(err);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container py-5 text-center">
        <h3>✅ Terima kasih telah berbelanja!</h3>
        <p>Pesanan kamu sedang diproses.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">💳 Checkout</h2>

      {cart.length === 0 ? (
        <p>Keranjang kosong. Silakan kembali ke halaman produk.</p>
      ) : (
        <div className="row">
          <div className="col-md-7">
            <form onSubmit={handleCheckout}>
              <div className="mb-3">
                <label className="form-label">Nama Lengkap</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Alamat</label>
                <textarea
                  className="form-control"
                  rows={3}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Metode Pembayaran</label>
                <select
                  className="form-select"
                  required
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                >
                  <option value="">Pilih Metode</option>
                  <option value="transfer">Transfer Bank</option>
                  <option value="cod">COD (Bayar di Tempat)</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-3">
                Proses Pesanan
              </button>
            </form>
          </div>

          <div className="col-md-5">
            <div className="card shadow-sm">
              <div className="card-header bg-dark text-white fw-bold">
                Ringkasan Pesanan
              </div>
              <ul className="list-group list-group-flush">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      {item.name} <br />
                      <small className="text-muted">
                        {item.qty} x Rp {item.price.toLocaleString()}
                      </small>
                    </div>
                    <span className="fw-semibold">
                      Rp {(item.price * item.qty).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="card-footer text-end fw-bold">
                Total: Rp {total.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
