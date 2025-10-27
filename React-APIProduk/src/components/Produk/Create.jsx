// src/components/Produk/Create.jsx
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function CreateProduk() {
  const [namaProduk, setNamaProduk] = useState("");
  const [kodeProduk, setKodeProduk] = useState("");
  const [deskripsiProduk, setDeskripsiProduk] = useState("");
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

    if (kodeProduk.trim() == "") {
      Swal.fire({
        title: "Error!",
        text: "Kode produk tidak bisa kosong",
        icon: "error",
      });
      setError("Kode Produk is required");
      return;
    }

    try {
      const response = await axios
        .post("https://api-produk-one.vercel.app/api/api/produk", {
          nama: namaProduk,
          kode_produk: kodeProduk,
          deskripsi: deskripsiProduk,
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: "Tidak bisa menambah produk!",
            icon: "error",
          });
          setError(error.response.data.message);
        });
      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Berhasil menambah produk!",
          icon: "success",
        });
        setSuccess("Produk created successfully!");
        setNamaProduk("");
        setKodeProduk("");
        setDeskripsiProduk("");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Tidak bisa menambah produk!",
          icon: "error",
        });
        setError("Failed to create produk");
      }
    } catch (error) {}
  };

  return (
    <div className="container-fluid px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1">Tambah Produk</h4>
          <p className="text-muted mb-0">Untuk menambahkan produk</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Nama Produk */}
        <div className="mb-3">
          <label htmlFor="namaProduk" className="form-label">
            <strong>Nama Produk</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="namaProduk"
            placeholder="Nama Produk"
            value={namaProduk}
            onChange={(e) => setNamaProduk(e.target.value)}
          />
        </div>

        {/* Kode Produk */}
        <div className="mb-3">
          <label htmlFor="kodeProduk" className="form-label">
            <strong>Kode Produk</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="kodeProduk"
            placeholder="Kode Produk"
            value={kodeProduk}
            onChange={(e) => setKodeProduk(e.target.value)}
          />
        </div>

        {/* Deskripsi Produk */}
        <div className="mb-4">
          <label htmlFor="deskripsiProduk" className="form-label">
            <strong>Deskripsi Produk</strong>
          </label>
          <textarea
            className="form-control"
            id="deskripsiProduk"
            rows="3"
            placeholder="Deskripsi Produk"
            value={deskripsiProduk}
            onChange={(e) => setDeskripsiProduk(e.target.value)}></textarea>
        </div>

        {/* Tombol Submit */}
        <div className="d-grid">
          <center>
            <button
              type="submit"
              className="btn btn-outline-primary btn-md w-25">
              Create
            </button>
          </center>
        </div>
      </form>
    </div>
  );
}
