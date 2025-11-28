const BASE_URL = "http://localhost:5000";

export async function getOrders() {
  const res = await fetch(`${BASE_URL}/orders`);
  return res.json();
}

export async function addOrder(data: any) {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateOrderStatus(id: number, status: string) {
  const res = await fetch(`${BASE_URL}/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
}

export async function deleteOrder(id: number) {
  const res = await fetch(`${BASE_URL}/orders/${id}`, {
    method: "DELETE",
  });
  return res.json();
}