"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/cartContext";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function MenuDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (params?.id) {
      const id = Number(params.id);

      // Contoh data sementara (dummy)
      const data: Product[] = [
        {
          id: 1,
          name: "Kopi Hitam",
          description: "Kopi robusta hitam tanpa gula",
          price: 5000,
          image: "/images/kopi-hitam.jpg",
        },
        {
          id: 2,
          name: "Es Teh Manis",
          description: "Teh melati manis dan segar",
          price: 4000,
          image: "/images/es-teh.jpg",
        },
        {
          id: 3,
          name: "Risol Mayo",
          description: "Risol isi mayo yang lezat",
          price: 3000,
          image: "/images/risol-mayo.jpg",
        },
      ];

      const found = data.find((p) => p.id === id);
      setProduct(found || null);
    }
  }, [params]);

  if (!product) return <div className="text-center p-5">Produk tidak ditemukan</div>;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-success mb-3">
            Rp {product.price.toLocaleString("id-ID")}
          </h4>
          <button
            onClick={() => addToCart(product)}
            className="btn btn-primary"
          >
            Tambahkan ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
