"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addProduct } from "@/app/apis/fetchers/products";

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Makanan");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const newProduct = {
      name,
      category,
      price: Number(price),
      description,
      image: imageUrl,
    };

    try {
      const res = await addProduct(newProduct);

      alert("Produk berhasil ditambahkan!");
      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Gagal menambah produk!");
    } finally {
      setLoading(false);
    }
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
            min="1000"
            className="form-control"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Deskripsi */}
        <div className="mb-3">
          <label className="form-label">Deskripsi</label>
          <textarea
            className="form-control"
            rows={3}
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Gambar */}
        <div className="mb-3">
          <label className="form-label">URL Gambar</label>
          <input
            type="text"
            className="form-control"
            placeholder="https://contoh.com/gambar.jpg"
            value={imageUrl}
            required
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        {/* Tombol */}
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => router.push("/admin/products")}
          >
            Batal
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan Produk"}
          </button>
        </div>
      </form>
    </div>
  );
}
