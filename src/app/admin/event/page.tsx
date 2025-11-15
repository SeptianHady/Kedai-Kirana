"use client";

import Link from "next/link";
import { useState } from "react";

export default function EventAdminPage() {
  const [events, setEvents] = useState([
    { id: 1, name: "Hari Raya Jakarta", tag: "jakarta", active: false },
    { id: 2, name: "Menu Ramadhan", tag: "ramadhan", active: false },
  ]);

  const setActiveEvent = (id: number) => {
    setEvents((prev) =>
      prev.map((e) => ({
        ...e,
        active: e.id === id, // yang dipilih = aktif
      }))
    );
  };

  const deactivateEvent = () => {
    setEvents((prev) =>
      prev.map((e) => ({
        ...e,
        active: false,
      }))
    );
  };

  const deleteEvent = (id: number) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
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
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
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
                {!event.active && (
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => setActiveEvent(event.id)}
                  >
                    Aktifkan
                  </button>
                )}

                {event.active && (
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={deactivateEvent}
                  >
                    Nonaktifkan
                  </button>
                )}

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteEvent(event.id)}
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
