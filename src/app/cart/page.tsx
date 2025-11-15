"use client";
import { useCart } from "@/context/cartContext";

export default function CartPage() {
  const { cart, total, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h4>Keranjang masih kosong 🛒</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold text-center">Keranjang Belanja</h2>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Produk</th>
              <th>Harga</th>
              <th>Qty</th>
              <th>Subtotal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded me-3"
                      style={{ objectFit: "cover" }}
                    />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td>Rp {item.price.toLocaleString("id-ID")}</td>
                <td>{item.qty}</td>
                <td>Rp {(item.price * item.qty).toLocaleString("id-ID")}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <button onClick={clearCart} className="btn btn-outline-secondary">
          Kosongkan Keranjang
        </button>
        <h4>Total: Rp {total.toLocaleString("id-ID")}</h4>
      </div>

      <div className="text-end mt-3">
        <button className="btn btn-success">Lanjut ke Checkout</button>
      </div>
    </div>
  );
}
