"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AdminProductDetail() {
  const params = useParams();
  const router = useRouter();

  const id = params.Id;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  if (loading) return <p className="mt-4">Loading...</p>;
  if (!product) return <p className="mt-4">Produk tidak ditemukan.</p>;

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => router.push("/admin/products")}>
        Kembali
      </button>

      <h2 className="fw-bold">Detail Produk</h2>

      <div className="row mt-4">
        <div className="col-md-4">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-8">
          <h3>{product.name}</h3>
          <p><strong>Kategori:</strong> {product.category}</p>
          <p><strong>Harga:</strong> Rp {Number(product.price).toLocaleString()}</p>
          <p><strong>Event Tag:</strong> {product.eventtag ?? "-"}</p>

          <button
            className="btn btn-warning me-2"
            onClick={() => router.push(`/admin/products/${id}/edit`)}
          >
            Edit Produk
          </button>
        </div>
      </div>
    </div>
  );
}
