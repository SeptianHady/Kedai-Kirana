const BASE_URL = "http://localhost:5000";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`, {
    next: { revalidate: 0 }, // always fetch fresh
  });
  return res.json();
}

export async function addProduct(data: any) {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteProduct(id: number) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });

  return res.json();
}

export async function updateProduct(id: number, formData: any) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Gagal update product");
  return res.json();
}
