/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [namaReview, setNamaReview] = useState("");
  const [kodeReview, setKodeReview] = useState("");
  const [deskripsiReview, setDeskripsiReview] = useState("");
  const [rekomendasiReview, setRekomendasiReview] = useState("");
  const [kodeProduk, setKodeProduk] = useState("");
  const [ProdukList, setProdukList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api-produk-one.vercel.app/api/api/review/${id}`)
      .then((response) => {
        const data = response.data;
        console.log(response);
        setNamaReview(data.nama || "");
        setKodeReview(data.kode_review || "");
        setDeskripsiReview(data.deskripsi || "");
        setRekomendasiReview(data.rekomendasi || "");
        setKodeProduk(data.produks_id || "");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Data tidak ditemukan");
      });
  }, [id]);

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "namaReview":
        setNamaReview(value);
        break;
      case "kodeReview":
        setKodeReview(value);
        break;
      case "deskripsiReview":
        setDeskripsiReview(value);
        break;
      case "rekomendasiReview":
        setRekomendasiReview(value);
        break;
      case "kodeProduk":
        setKodeProduk(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const response = await axios.patch(
        `https://api-produk-one.vercel.app/api/api/review/${id}`,
        {
          nama: namaReview,
          kode_review: kodeReview,
          deskripsi: deskripsiReview,
          rekomendasi: rekomendasiReview,
          produks_id: kodeProduk,
        }
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Review updated successfully",
          icon: "success",
        });
        navigate("/review");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Review cannot be updated",
          icon: "error",
        });
        console.log(error);
        setError("Failed to edit review");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Review cannot be updated",
        icon: "error",
      });
      console.log(error);
      setError("An error occured while editing review");
    }
  };

  return (
    <div className="container-fluid px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1">Edit Review</h4>
          <p className="text-muted mb-0">Untuk edit review</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Nama review */}
        <div className="mb-3">
          <label htmlFor="namaReview" className="form-label">
            Nama Review
          </label>
          <input
            type="text"
            id="namaReview"
            className="form-control"
            value={namaReview}
            onChange={handleChange}
            placeholder="Nama Review"
          />
        </div>

        {/* Kode review */}
        <div className="mb-3">
          <label htmlFor="kodeReview" className="form-label">
            Kode Review
          </label>
          <input
            type="text"
            id="kodeReview"
            className="form-control"
            value={kodeReview}
            onChange={handleChange}
            placeholder="Kode Review"
          />
        </div>

        {/* Deskripsi review */}
        <div className="mb-3">
          <label htmlFor="deskripsiReview" className="form-label">
            Deskripsi Review
          </label>
          <input
            type="text"
            id="deskripsiReview"
            className="form-control"
            value={deskripsiReview}
            onChange={handleChange}
            placeholder="Enter Deskripsi Review"
          />

          {/* Rekomendasi */}
          <div className="mb-3">
            <label htmlFor="rekomendasiReview" className="form-label">
              Rekomendasi
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

          {/* SSelect Produk */}
          <div className="mb-3">
            <label htmlFor="kodeProduk" className="form-label">
              Produk
            </label>
            <select
              id="kodeProduk"
              className="form-select"
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
        <div className="d-grid">
          <center>
            <button
              type="submit"
              className="btn btn-outline-primary btn-md w-25">
              Simpan
            </button>
          </center>
        </div>
      </form>
    </div>
  );
}
