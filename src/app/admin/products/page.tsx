"use client";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Nasi Goreng",
      category: "Makanan",
      price: 20000,
      image: "/images/nasgor.jpg",
    },
    {
      id: 2,
      name: "Es Teh Manis",
      category: "Minuman",
      price: 8000,
      image: "/images/esteh.jpg",
    },
  ]);

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="m-0">Daftar Produk</h3>

        <Link href="/admin/products/add" className="btn btn-primary">
          + Tambah Produk
        </Link>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Gambar</th>
            <th>Nama</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th className="w-25">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center">
                Belum ada produk
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                </td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>Rp {p.price.toLocaleString()}</td>
                <td>

                  {/* Tombol Edit → menuju halaman edit */}
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
