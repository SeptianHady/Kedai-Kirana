"use client";
import Link from "next/link";
import { useCart } from "@/context/cartContext";

export default function Navbar() {
  const { cart } = useCart();
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" href="/">
          <img
            src="/images/logo.png"
            alt="Logo Kedai Kirana"
            style={{
              width: "100px",
              height: "60px",
              objectFit: "contain",
            }}
          />
          <span className="ms-2"></span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href="/menu">
                Menu
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/checkout">
                Checkout
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <Link href="/cart" className="btn btn-outline-light position-relative">
              🛒 Keranjang
              {totalQty > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.7rem" }}
                >
                  {totalQty}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
