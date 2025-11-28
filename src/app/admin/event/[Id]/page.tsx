"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getEventById } from "@/app/apis/fetchers/events";
import Link from "next/link";

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvent();
  }, []);

  const loadEvent = async () => {
    const data = await getEventById(Number(id));
    setEvent(data);
    setLoading(false);
  };

  if (loading) return <p className="p-4">Memuat detail event...</p>;

  if (!event)
    return (
      <div className="p-4">
        <h3>Event tidak ditemukan</h3>
        <button className="btn btn-secondary mt-3" onClick={() => router.back()}>
          Kembali
        </button>
      </div>
    );

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Detail Event</h2>
        <Link href="/admin/event" className="btn btn-secondary">
          Kembali
        </Link>
      </div>

      <div className="card p-4 shadow-sm">
        <h3 className="mb-3">{event.name}</h3>

        <p>
          <strong>Tag:</strong> {event.tag}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {event.active ? (
            <span className="badge bg-success">Aktif</span>
          ) : (
            <span className="badge bg-secondary">Tidak Aktif</span>
          )}
        </p>

        <hr />

        <div className="mt-3">
          <Link
            href={`/admin/event/${event.id}/edit`}
            className="btn btn-primary me-2"
          >
            Edit Event
          </Link>
        </div>
      </div>
    </div>
  );
}
