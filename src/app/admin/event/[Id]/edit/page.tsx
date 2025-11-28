"use client";

import { useEffect, useState } from "react";
import { getEventById, updateEvent } from "@/app/apis/fetchers/events";
import { useRouter } from "next/navigation";

export default function EditEventPage({ params }) {
  const router = useRouter();
  const { id } = params;

  const [form, setForm] = useState({
    name: "",
    tag: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const numericId = Number(id);
      console.log("ID PARAM:", id, "AS NUMBER:", numericId);

      const data = await getEventById(numericId);

      setForm({
        name: data.name,
        tag: data.tag,
      });
      setLoading(false);
    }

    if (id) loadData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateEvent(Number(id), form);
    alert("Event berhasil diupdate!");
    router.push("/admin/event");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2>Edit Event</h2>

      <form onSubmit={handleSubmit}>
        <label>Nama Event</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <label>Tag</label>
        <input
          type="text"
          value={form.tag}
          onChange={(e) => setForm({ ...form, tag: e.target.value })}
          required
        />

        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}
