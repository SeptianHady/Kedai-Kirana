"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Makanan");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // nanti disini dipasang API backend
    console.log({
      name,
      category,
      price,
    });

    alert("Produk berhasil ditambahkan (dummy). Backend belum dihubungkan.");

    router.push("/admin/products");
  };

  return (
    <div className="card p-4">
      <h3 className="mb-4">Tambah Produk</h3>

      <form onSubmit={handleSubmit}>
        
        {/* Nama Produk */}
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
            value={price}
            min="1000"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Tombol */}
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={() => router.push("/admin/products")}>
            Batal
          </button>
          <button type="submit" className="btn btn-primary">
            Simpan Produk
          </button>
        </div>
      </form>
    </div>
  );
}
