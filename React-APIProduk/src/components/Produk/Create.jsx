// src/components/Produk/Create.jsx
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function CreateProduk() {
  const [namaProduk, setNamaProduk] = useState("");
  const [kodeProduk, setKodeProduk] = useState("");
  const [deskripsiProduk, setDeskripsiProduk] = useState("");
  const [rekomendasiProduk, setRekomendasiProduk] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (namaProduk.trim() == "") {
      Swal.fire({
        title: "Error!",
        text: "Nama produk tidak bisa kosong",
        icon: "error",
      });
      setError("Nama Produk is required");
      return;
    }

    try {
      const response = await axios
        .post("https://api-produk-one.vercel.app/api/api/produk", {
          nama: namaProduk,
          kode_produk: kodeProduk,
          deskripsi: deskripsiProduk,
          rekomendasi: rekomendasiProduk,
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: "Nama produk tidak bisa sama",
            icon: "error",
          });
          setError(error.response.data.message);
        });
      if (response.status === 201) {
        setSuccess("Produk created successfully!");
        setNamaProduk("");
      } else {
        setError("Failed to create produk");
      }
    } catch (error) {}
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Produk</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          {/* Nama Produk */}
          <label htmlFor="namaProduk" className="form-label">
            Nama Produk
          </label>
          <input
            type="text"
            className="form-control"
            id="namaProduk"
            value={namaProduk}
            onChange={(e) => setNamaProduk(e.target.value)}
            placeholder="Enter Produk Name"
          />

          {/* Kode Produk */}
          <label htmlFor="kodeProduk" className="form-label">
            Kode Produk
          </label>
          <input
            type="text"
            className="form-control"
            id="kodeProduk"
            value={kodeProduk}
            onChange={(e) => setKodeProduk(e.target.value)}
            placeholder="Enter Produk Kode"
          />

          {/* Deskripsi Produk */}
          <label htmlFor="deskripsiProduk" className="form-label">
            Deskripsi Produk
          </label>
          <input
            type="text"
            className="form-control"
            id="deskripsiProduk"
            value={deskripsiProduk}
            onChange={(e) => setDeskripsiProduk(e.target.value)}
            placeholder="Enter Produk Deskripsi"
          />

          {/* Rekomendasi Produk */}
          <label htmlFor="rekomendasiProduk" className="form-label">
            Rekomendasi Produk
          </label>
          <input
            type="text"
            className="form-control"
            id="rekomendasiProduk"
            value={rekomendasiProduk}
            onChange={(e) => setRekomendasiProduk(e.target.value)}
            placeholder="Enter Produk Rekomendasi"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}
