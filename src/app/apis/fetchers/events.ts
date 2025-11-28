const BASE_URL = "http://localhost:5000";

export async function getEvents() {
  const res = await fetch(`${BASE_URL}/events`, { cache: "no-store" });
  return res.json();
}

export async function getEventById(id: number) {
  console.log("URL Fetch:", `${BASE_URL}/events/${id}`);
  const res = await fetch(`${BASE_URL}/events/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Event tidak ditemukan");
  return res.json();
}

export async function addEvent(data: any) {
  const res = await fetch(`${BASE_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updateEvent(id: number, data: any) {
  const res = await fetch(`${BASE_URL}/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteEvent(id: number) {
  const res = await fetch(`${BASE_URL}/events/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Gagal menghapus event");
  return res.json();
}

export async function activateEvent(id: number) {
  const res = await fetch(`${BASE_URL}/events/activate/${id}`, {
    method: "PUT",
  });

  return res.json();
}

export async function deactivateEvent(id: number) {
  const res = await fetch(`${BASE_URL}/events/deactivate/0`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Gagal menonaktifkan event");

  return res.json();
}
