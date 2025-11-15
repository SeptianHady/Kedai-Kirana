import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
});

export default api;

export async function getProducts() {
  return [
    { id: 1, name: 'Nasi Uduk', price: 10000, image: "/placeholder.jpg" },
    { id: 2, name: 'Ayam Kremes', price: 20000, image: "/placeholder.jpg" },
    { id: 3, name: 'Menu Spesial', price: 30000, image: "/placeholder.jpg" },
  ];
}
