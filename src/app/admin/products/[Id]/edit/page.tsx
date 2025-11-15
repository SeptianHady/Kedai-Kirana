"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  const productId = params.id; // ambil ID dari URL

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Makanan");
  const [price, setPrice] = useState("");

  // Load data (dummy sebelum backend)
  useEffect(() => {
    const dummyProduct = {
      id: productId,
      name: "Nasi Goreng",
      category: "Makanan",
      price: 15000,
    };

    setName(dummyProduct.name);
    setCategory(dummyProduct.category);
    setPrice(String(dummyProduct.price));
  }, [productId]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // backend PUT nanti
    console.log({
      id: productId,
      name,
      category,
      price,
    });

    alert("Produk berhasil diperbarui (dummy). Backend belum dihubungkan.");

    router.push("/admin/products");
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Edit Produk</h3>

        <Link href="/admin/products" className="btn btn-secondary">
          ← Kembali
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="card p-4">
        
        {/* Nama */}
        <div className="mb-3">
          <label className="form-label">Nama Produk</label>
          <input
            type="text"
            className="form-control"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Kategori */}
        <div className="mb-3">
          <label className="form-label">Kategori</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
          </select>
        </div>

        {/* Harga */}
        <div className="mb-3">
          <label className="form-label">Harga (Rp)</label>
          <input
            type="number"
            className="form-control"
            min="1000"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Tombol */}
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            Update Produk
          </button>
        </div>
      </form>
    </div>
  );
}
