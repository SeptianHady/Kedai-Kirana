"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id: number) => {
    if (!confirm("Yakin ingin menghapus order ini?")) return;

    await fetch(`http://localhost:5000/orders/${id}`, {
      method: "DELETE",
    });

    fetchOrders(); // refresh
  };

  const updateStatus = async (id: number, newStatus: string) => {
    await fetch(`http://localhost:5000/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setSelectedOrder(null);
    fetchOrders(); // refresh
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">📦 Admin Orders</h2>

      {orders.length === 0 ? (
        <p>Tidak ada order.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Telepon</th>
                <th>Alamat</th>
                <th>Total</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order: any) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customername}</td>
                  <td>{order.customerphone}</td>
                  <td>{order.address}</td>
                  <td>Rp {Number(order.totalprice).toLocaleString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.status === "Pending"
                          ? "bg-warning"
                          : order.status === "Selesai"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => setSelectedOrder(order)}
                    >
                      Update Status
                    </button>

                    <button
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => deleteOrder(order.id)}
                    >
                      Delete
                    </button>

                    <Link 
                      href={`/admin/orders/${order.id}`} 
                      className="btn btn-sm btn-info text-white"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL UPDATE STATUS */}
      {selectedOrder && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Update Status Order #{selectedOrder.id}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedOrder(null)}
                ></button>
              </div>

              <div className="modal-body">
                <select
                  className="form-select"
                  defaultValue={selectedOrder.status}
                  onChange={(e) =>
                    updateStatus(selectedOrder.id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Diproses">Diproses</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Dibatalkan">Dibatalkan</option>
                </select>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedOrder(null)}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
