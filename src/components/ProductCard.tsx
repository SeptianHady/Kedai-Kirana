"use client";
import Link from 'next/link';

export default function ProductCard({ name, price, image }: any) {
  return (
    <div className="card">
      <img
        src={image || '/placeholder.jpg'} className="card-img-top" 
        alt={name}
      />
      <div className="card-body d-flex flex-column">
        <h5>{name}</h5>
        <p className="card-text text-muted flex-grow-1">
          {name.short_description || 'Lezat dan menggugah selera.'}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold text-primary">Rp {price}</span>
          <Link href={`/menu/${name.id}`} className="btn btn-sm btn-outline-primary">
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
