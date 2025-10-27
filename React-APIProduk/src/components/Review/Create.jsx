// src/components/Review/Create.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function CreateReview() {
  const [namaReview, setNamaReview] = useState("");
  const [kodeReview, setKodeReview] = useState("");
  const [deskripsiReview, setDeskripsiReview] = useState("");
  const [rekomendasiReview, setRekomendasiReview] = useState("");
  const [kodeProduk, setKodeProduk] = useState("");
  const [ProdukList, setProdukList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const response = await axios.get(
          "https://api-produk-one.vercel.app/api/api/produk"
        );
        setProdukList(response.data);
      } catch (error) {
        console.error("Error fetch data produk:", error);
        Swal.fire({
          title: "Error!",
          text: "Error fetch daftar produk",
          icon: "error",
        });
      }
    };

    fetchProduk();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (namaReview.trim() == "") {
      Swal.fire({
        title: "Error!",
        text: "Nama review tidak bisa kosong",
        icon: "error",
      });
      setError("Nama Review is required");
      return;
    }

    if (kodeReview.trim() === "") {
      Swal.fire({
        title: "Error!",
        text: "Kode review tidak bisa kosong",
        icon: "error",
      });
      setError("Kode review is required");
      return;
    }

    if (kodeProduk.trim() === "") {
      Swal.fire({
        title: "Error!",
        text: "Kode produk tidak bisa kosong",
        icon: "error",
      });
      setError("Kode produk is required");
      return;
    }

    try {
      const response = await axios
        .post("https://api-produk-one.vercel.app/api/api/review", {
          nama: namaReview,
          kode_review: kodeReview,
          deskripsi: deskripsiReview,
          rekomendasi: rekomendasiReview,
          produks_id: kodeProduk,
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: "Tidak dapat menambah review!",
            icon: "error",
          });
          setError(error.response.data.message);
        });
      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Berhasil menambah review!",
          icon: "success",
        });
        setSuccess("Review created successfully!");
        setNamaReview("");
        setKodeProduk("");
        setDeskripsiReview("");
        setRekomendasiReview("");
        setKodeProduk("");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Tidak dapat menambah review!",
          icon: "error",
        });
        setError("Failed to create review");
      }
    } catch (error) {}
  };

  return (
    <div className="container-fluid px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1">Tambah Review</h4>
          <p className="text-muted mb-0">Untuk menambahakan review</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Nama Review */}
        <div className="mb-3">
          <label htmlFor="namaReview" className="form-label">
            <strong>Nama Review</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="namaReview"
            placeholder="Nama reviewan"
            value={namaReview}
            onChange={(e) => setNamaReview(e.target.value)}
          />
        </div>

        {/* Kode Review */}
        <div className="mb-3">
          <label htmlFor="kodeReview" className="form-label">
            <strong>Kode Review</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="kodeReview"
            placeholder="Kode review"
            value={kodeReview}
            onChange={(e) => setKodeReview(e.target.value)}
          />
        </div>

        {/* Deskripsi Review */}
        <div className="mb-3">
          <label htmlFor="deskripsiReview" className="form-label">
            <strong>Isi Review</strong>
          </label>
          <textarea
            className="form-control"
            id="deskripsiReview"
            rows="3"
            placeholder="Isi review produk"
            value={deskripsiReview}
            onChange={(e) => setDeskripsiReview(e.target.value)}></textarea>
        </div>

        {/* Rekomendasi Review */}
        <div className="mb-3">
          <label htmlFor="rekomendasiReview" className="form-label">
            <strong>Merekomendasi</strong>
          </label>
          <select
            className="form-control"
            id="rekomendasiReview"
            placeholder="Produk terekomendasi"
            value={rekomendasiReview}
            onChange={(e) => setRekomendasiReview(e.target.value)}>
            <option value="">Ya atau Tidak</option>
            <option value="1">Ya</option>
            <option value="0">Tidak</option>
          </select>
        </div>

        {/* Produk */}
        <div className="mb-4">
          <label htmlFor="kodeProduk" className="form-label">
            <strong>Produk</strong>
          </label>
          <select
            className="form-select"
            id="kodeProduk"
            value={kodeProduk}
            onChange={(e) => setKodeProduk(e.target.value)}>
            <option value="">Pilih Produk</option>
            {ProdukList.map((produk) => (
              <option key={produk.id} value={produk.id}>
                {produk.nama}
              </option>
            ))}
          </select>
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
