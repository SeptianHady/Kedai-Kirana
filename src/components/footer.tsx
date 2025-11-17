export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-4">
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} Kedai Kirana</p>
        <p className="mb-0" style={{ fontSize: "0.9rem" }}>
          Makanan rumahan khas Indonesia — Lezat, Aman, dan Terjangkau
        </p>
      </div>
    </footer>
  );
}
