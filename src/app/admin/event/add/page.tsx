"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addEvent } from "@/app/apis/fetchers/events";

export default function AddEventPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [active, setActive] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = { name, tag, active };

    await addEvent(payload);

    router.push("/admin/event");
  };

  return (
    <div className="container py-5">
      <h2>Tambah Event</h2>
      <hr />

      <form onSubmit={handleSubmit} className="card p-4">

        <div className="mb-3">
          <label className="form-label">Nama Event</label>
          <input
            type="text"
            className="form-control"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tag Event</label>
          <input
            type="text"
            className="form-control"
            value={tag}
            required
            onChange={(e) => setTag(e.target.value)}
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
          <label className="form-check-label">Event Aktif</label>
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => router.push("/admin/products")}
          >
            Batal
          </button>

        <button type="submit" className="btn btn-primary">
          Simpan Event
        </button>
      </div>

      </form>
    </div>
  );
}
