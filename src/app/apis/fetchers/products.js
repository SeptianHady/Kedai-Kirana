import { API_BASE_URL } from "@/utils/api";

export async function getProducts() {
  const res = await fetch(`${API_BASE_URL}/products`, {
    cache: "no-store",
  });
  return res.json();
}

export async function addProduct(data) {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateProduct(id, data) {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
