"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { updateProduct } from "@/app/apis/fetchers/products";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.Id);
  console.log("PRODUCT ID:", id); // <-- perbaikan

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: 0,
    image: "",
    eventtag: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // <-- cegah fetch undefined

    async function fetchProduct() {
      const res = await fetch(`http://localhost:5000/products/${id}`);
      const data = await res.json();

      setForm({
        name: data.name,
        category: data.category,
        price: data.price,
        image: data.image,
        eventtag: data.eventtag,
      });

      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      await updateProduct(id, form);
      alert("Produk berhasil diperbarui!");
      router.push("/admin/products");
    } catch (err) {
      alert("Gagal update produk");
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h3>Edit Produk</h3>

      <form onSubmit={handleSubmit} className="mt-3">

        <label>Nama Produk</label>
        <input
          type="text"
          className="form-control mb-3"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Kategori</label>
        <input
          type="text"
          className="form-control mb-3"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <label>Harga</label>
        <input
          type="number"
          className="form-control mb-3"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <label>Image URL</label>
        <input
          type="text"
          className="form-control mb-3"
          name="image"
          value={form.image}
          onChange={handleChange}
          required
        />

        <label>Event Tag</label>
        <input
          type="text"
          className="form-control mb-3"
          name="eventtag"
          value={form.eventtag ?? ""}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-primary">
          Update Produk
        </button>
      </form>
    </div>
  );
}
