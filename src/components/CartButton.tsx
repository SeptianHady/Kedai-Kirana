"use client";
export default function CartButton({ children, onClick }) {
  return (
    <button onClick={onClick} className="btn btn-primary btn-lg mt-3">
      {children}
    </button>
  );
}
