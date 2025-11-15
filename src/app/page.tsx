import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center py-5">
      <h1 className="display-4 fw-bold">Selamat Datang di Kedai Kirana</h1>
      <p className="mb-4">
        Makanan rumahan khas Indonesia
      </p>
      <Link href="/menu" className="btn btn-primary btn-lg mt-3">
      Lihat Menu
      </Link>
    </div>
  );
}
