"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/data/products";
import ProductList from "@/components/ProductList";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "makanan" | "minuman";
};

export default function MenuPage() {
  const data: Product[] = [
    {
      id: 1,
      name: "Nasi Goreng",
      description: "Nasi goreng dengan topping ayam",
      price: 20000,
      image: "/images/nasi-goreng.jpg",
      category: "makanan",
    },
    {
      id: 2,
      name: "Ayam Geprek",
      description: "Ayam goreng dengan sambal pedas",
      price: 18000,
      image: "/images/ayam-geprek.jpg",
      category: "makanan",
    },
    {
      id: 3,
      name: "Es Teh Manis",
      description: "Teh manis dingin menyegarkan",
      price: 8000,
      image: "/images/es-teh.jpg",
      category: "minuman",
    },
    {
      id: 4,
      name: "Kopi Susu",
      description: "Kopi dicampur susu kental manis",
      price: 12000,
      image: "/images/kopi-susu.jpg",
      category: "minuman",
    },
  ];

  const makanan = data.filter((p) => p.category === "makanan");
  const minuman = data.filter((p) => p.category === "minuman");

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("none");

  // FILTER PRODUK EVENT
  const filteredProducts = products.filter((product) => {
    if (eventFilter !== "none") return product.eventTag === eventFilter;

    // jika tanpa event → sembunyikan produk event
    return product.eventTag === null;
  });

  return (
    <div className="container py-5">
      <div className="flex gap-4 mb-6">
        {/* Filter Event */}
        <select
          value={eventFilter}
          onChange={(e) => {
            setEventFilter(e.target.value);
            if (e.target.value !== "none") setCategoryFilter("all");
          }}
          className="border px-3 py-2 rounded"
        >
          <option value="none">Tanpa Event</option>
          <option value="jakarta">Hari Raya Jakarta</option>
          <option value="ramadhan">Menu Ramadhan</option>
        </select>

        {/* Filter Kategori */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border px-3 py-2 rounded"
          disabled={eventFilter !== "none"}
        >
          <option value="all">Semua</option>
          <option value="makanan">Makanan</option>
          <option value="minuman">Minuman</option>
        </select>
      </div>

      {/* ========================== */}
      {/*   MODE EVENT (hanya event) */}
      {/* ========================== */}
      {eventFilter !== "none" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((p) => (
            <div key={p.id} className="border rounded p-4 shadow-sm">
              <img
                src={p.image}
                className="w-full h-32 object-cover rounded"
                alt={p.name}
              />
              <h3 className="font-semibold mt-2">{p.name}</h3>
              <p className="text-sm text-gray-600">
                Rp {p.price.toLocaleString("id-ID")}
              </p>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <p className="mt-4 text-gray-500">
              Tidak ada menu untuk event ini.
            </p>
          )}
        </div>
      )}

      {/* ========================== */}
      {/*   MODE NORMAL (tanpa event) */}
      {/* ========================== */}
      {eventFilter === "none" && (
        <>
          {/* MAKANAN */}
          <h2 className="fw-bold mb-4">🍽️ Makanan</h2>
          <div className="row g-4 mb-5">
            {makanan.map((item) => (
              <div key={item.id} className="col-md-4">
                <div className="card h-100 shadow-sm">
                  <img src={item.image} className="card-img-top" alt={item.name} />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="text-muted">{item.description}</p>
                    <p className="fw-bold text-success">
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>
                    <Link
                      href={`/menu/${item.id}`}
                      className="btn btn-primary w-100"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MINUMAN */}
          <h2 className="fw-bold mb-4">🥤 Minuman</h2>
          <div className="row g-4">
            {minuman.map((item) => (
              <div key={item.id} className="col-md-4">
                <div className="card h-100 shadow-sm">
                  <img src={item.image} className="card-img-top" alt={item.name} />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="text-muted">{item.description}</p>
                    <p className="fw-bold text-success">
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>
                    <Link
                      href={`/menu/${item.id}`}
                      className="btn btn-primary w-100"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
