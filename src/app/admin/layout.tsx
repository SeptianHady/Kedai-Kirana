"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Jika halaman = /admin/login → jangan render sidebar admin
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // 🔐 CEK LOGIN
  useEffect(() => {
    const isAdmin = Cookies.get("isAdmin");
    if (!isAdmin) router.push("/admin/login");
  }, [router]);

  const handleLogout = () => {
    Cookies.remove("isAdmin");
    router.push("/admin/login");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
        <h4 className="text-center mb-4">Kedai Kirana</h4>

        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link
              href="/admin/dashboard"
              className={`nav-link text-white ${
                pathname === "/admin/dashboard" ? "text-warning fw-bold" : ""
              }`}
            >
              Dashboard
            </Link>
          </li>

          {/* Produk */}
          <li className="nav-item mb-2">
            <Link
             href="/admin/products"
             className={`nav-link text-white ${
                pathname === "/admin/products" ? "text-warning fw-bold" : ""
              }`}
            >
               Menu Produk
            </Link>
          </li>


          <li className="nav-item mb-2">
            <Link
              href="/admin/orders"
              className={`nav-link text-white ${
                pathname === "/admin/orders" ? "text-warning fw-bold" : ""
              }`}
            >
              Pesanan
            </Link>
          </li>

        {/* Events */}
        <li className="nav-item mb-2">
            <Link
             href="/admin/event"
             className={`nav-link text-white ${
                pathname === "/admin/event" ? "text-warning fw-bold" : ""
              }`}
            >
               Kelola Event
            </Link>
          </li>
        </ul>

        <hr />
        <button onClick={handleLogout} className="btn btn-outline-light w-100">
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-grow-1 p-4 bg-light">{children}</div>
    </div>
  );
}
