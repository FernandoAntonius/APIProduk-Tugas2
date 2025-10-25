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
    <div className="container mt-5">
      <h2 className="mb-4">Create Review</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <hr />
          {/* Nama Review */}
          <label htmlFor="namaReview" className="form-label">
            Nama Review
          </label>
          <input
            type="text"
            className="form-control"
            id="namaReview"
            value={namaReview}
            onChange={(e) => setNamaReview(e.target.value)}
            placeholder="Enter Review Name"
          />

          {/* Kode Review */}
          <label htmlFor="kodeReview" className="form-label">
            Kode Review
          </label>
          <input
            type="text"
            className="form-control"
            id="kodeReview"
            value={kodeReview}
            onChange={(e) => setKodeReview(e.target.value)}
            placeholder="Enter Review Kode"
          />

          {/* Deskripsi Review */}
          <label htmlFor="deskripsiReview" className="form-label">
            Deskripsi Review
          </label>
          <input
            type="text"
            className="form-control"
            id="deskripsiReview"
            value={deskripsiReview}
            onChange={(e) => setDeskripsiReview(e.target.value)}
            placeholder="Enter Review Deskripsi"
          />

          {/* Rekomendasi Review */}
          <label htmlFor="rekomendasiReview" className="form-label">
            Rekomendasi Review
          </label>
          <input
            type="text"
            className="form-control"
            id="rekomendasiReview"
            value={rekomendasiReview}
            onChange={(e) => setRekomendasiReview(e.target.value)}
            placeholder="Enter Review Rekomendasi"
          />

          {/* Kode Produk */}
          <div className="mb-3">
            <label className="form-label">Produk</label>
            <select
              className="form-select"
              id="kodeProduk"
              value={kodeProduk}
              onChange={(e) => setKodeProduk(e.target.value)}>
              <option value="">Select Produk</option>
              {ProdukList.map((produk) => (
                <option key={produk.id} value={produk.id}>
                  {produk.nama}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}
