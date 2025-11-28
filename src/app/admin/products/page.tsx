"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;

    await fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts(); // Refresh list
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">📦 Daftar Produk</h2>

        <Link href="/admin/products/add" className="btn btn-primary">
          + Tambah Produk
        </Link>
      </div>

      {products.length === 0 ? (
        <p>Belum ada produk.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Harga</th>
                <th>Deskripsi</th>
                <th>Gambar</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p: any) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>Rp {Number(p.price).toLocaleString()}</td>
                  <td>{p.description}</td>
                  <td>
                    <img
                      src={p.imageurl}
                      width={60}
                      height={60}
                      style={{ objectFit: "cover" }}
                    />
                  </td>
                  <td>
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="btn btn-sm btn-info text-white me-2"
                    >
                      Detail
                    </Link>

                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteProduct(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
