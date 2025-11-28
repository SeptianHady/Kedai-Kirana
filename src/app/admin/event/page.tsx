"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  getEvents,
  deleteEvent,
  activateEvent,
  deactivateEvent,
} from "@/app/apis/fetchers/events";

export default function EventAdminPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  const handleActivate = async (id: number) => {
    await activateEvent(id);
    loadEvents();
  };

  const handleDeactivate = async (id: number) => {
    await deactivateEvent(id);
    loadEvents();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus event ini?")) return;

    await deleteEvent(id);
    loadEvents();
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Kelola Event</h2>
        <Link href="/admin/event/add" className="btn btn-primary">
          + Tambah Event
        </Link>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nama Event</th>
            <th>Tag</th>
            <th>Status</th>
            <th style={{ width: "220px" }}>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event: any) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.tag}</td>
              <td>
                {event.active ? (
                  <span className="badge bg-success">Aktif</span>
                ) : (
                  <span className="badge bg-secondary">Tidak Aktif</span>
                )}
              </td>
              <td>
                {event.active ? (
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleDeactivate(event.id)}
                  >
                    Nonaktifkan
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => handleActivate(event.id)}
                  >
                    Aktifkan
                  </button>
                )}

                <Link
                  href={`/admin/event/${event.id}/edit`}
                  className="btn btn-sm btn-info me-2"
                >
                  Edit
                </Link>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(event.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
