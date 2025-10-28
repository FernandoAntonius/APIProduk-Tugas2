import React from "react";
import apiproduk from "../assets/apiproduk.jpg";

export default function Home() {
  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold mb-5">
        Selamat datang di Data API Produk
      </h1>

      <div className="row align-items-center">
        {/* Logo */}
        <div className="col-md-3 text-center mb-4 mb-md-0">
          <img
            src={apiproduk}
            alt="Logo BMKG"
            className="img-fluid"
            style={{ maxWidth: "180px" }}
          />
          <h4 className="fw-bold mt-2">API Produk</h4>
        </div>

        {/* Deskripsi */}
        <div className="col-md-9">
          <p className="fs-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a
            augue dolor. Mauris ornare odio at venenatis feugiat. Etiam nec
            feugiat nisi. Quisque iaculis pretium purus, ut elementum purus
            porta vitae. Mauris vulputate, neque sed vehicula vestibulum, augue
            eros accumsan dui, id semper nisl ante non ligula. Fusce faucibus
            augue sed orci ultrices blandit. Sed consequat molestie ultricies.
            Cras sed leo iaculis, sollicitudin augue in, rhoncus leo. Donec
            egestas est bibendum, aliquet elit et, ullamcorper mi. Duis rhoncus
            a nisi a pretium. Quisque vel leo tellus. Aliquam ac congue mauris.
          </p>
          <small className="mt-3">
            Pilih navigasi <strong>"Produk"</strong> untuk melihat data produk
            dan <strong>"Review"</strong> untuk melihat data review.
          </small>
        </div>
      </div>

      <hr className="my-5" />

      <footer className="text-center text-muted">
        Dibuat oleh <strong>Fernando Antonius</strong> | 2428250014
      </footer>
    </div>
  );
}
