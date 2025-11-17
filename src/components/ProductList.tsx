import Image from "next/image";
import { products } from "@/data/products";

export default function ProductList() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">Daftar Menu</h2>

      <div className="row g-4">
        {products.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm border-0">
              
              {/* Gambar */}
              <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={250}
                className="card-img-top"
                style={{ objectFit: "cover", height: "180px" }}
              />

              <div className="card-body d-flex flex-column">
                
                {/* Nama Produk */}
                <h5 className="card-title fw-bold">{item.name}</h5>

                {/* Kategori */}
                <span className="badge bg-primary mb-2 text-uppercase">
                  {item.category}
                </span>

                {/* Event tag (jika ada) */}
                {item.eventTag && (
                  <span className="badge bg-warning text-dark mb-2">
                    Event: {item.eventTag}
                  </span>
                )}

                {/* Harga */}
                <p className="mt-auto fw-bold text-success">
                  Rp {item.price.toLocaleString()}
                </p>

                {/* Tombol */}
                <button className="btn btn-dark w-100 mt-2">Tambah</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
