"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEventPage() {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const router = useRouter();

  const addEvent = () => {
    if (!name || !tag) {
      alert("Nama & Tag harus diisi");
      return;
    }

    alert("Event baru ditambahkan!");

    router.push("/admin/event");
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Tambah Event Baru</h2>

      <div className="mb-3">
        <label>Nama Event</label>
        <input
          type="text"
          className="form-control"
          placeholder="Contoh: Hari Raya Jakarta"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Tag Event (untuk filter di menu)</label>
        <input
          type="text"
          className="form-control"
          placeholder="Contoh: jakarta"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={addEvent}>
        Simpan
      </button>
    </div>
  );
}
