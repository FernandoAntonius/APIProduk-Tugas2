/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [namaProduk, setNamaProduk] = useState("");
  const [kodeProduk, setKodeProduk] = useState("");
  const [deskripsiProduk, setDeskripsiProduk] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api-produk-one.vercel.app/api/api/produk/${id}`)
      .then((response) => {
        const data = response.data;
        console.log(response);
        setNamaProduk(data.nama || "");
        setKodeProduk(data.kode_produk || "");
        setDeskripsiProduk(data.deskripsi || "");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Data tidak ditemukan");
      });
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "namaProduk":
        setNamaProduk(value);
        break;
      case "kodeProduk":
        setKodeProduk(value);
        break;
      case "deskripsiProduk":
        setDeskripsiProduk(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (namaProduk.trim() == "") {
      Swal.fire({
        title: "Error!",
        text: "Nama produk tidak bisa kosong",
        icon: "error",
      });
      setError("Nama Produk is required");
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
        `https://api-produk-one.vercel.app/api/api/produk/${id}`,
        {
          nama: namaProduk,
          kode_produk: kodeProduk,
          deskripsi: deskripsiProduk,
        }
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Produk updated successfully",
          icon: "success",
        });
        navigate("/produk");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Produk cannot be updated",
          icon: "error",
        });
        console.log(error);
        setError("Failed to edit produk");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Produk cannot be updated",
        icon: "error",
      });
      console.log({
        nama: namaProduk,
        kode_produk: kodeProduk,
        deskripsi: deskripsiProduk,
      });
      setError("An error occured while editing produk");
    }
  };

  return (
    <div className="container-fluid px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1">Edit Produk</h4>
          <p className="text-muted mb-0">Untuk edit produk</p>
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
            id="namaProduk"
            className="form-control"
            value={namaProduk}
            onChange={handleChange}
            placeholder="Nama Produk"
          />
        </div>

        {/* Kode Produk */}
        <div className="mb-3">
          <label htmlFor="kodeProduk" className="form-label">
            <strong>Kode Produk</strong>
          </label>
          <input
            type="text"
            id="kodeProduk"
            className="form-control"
            value={kodeProduk}
            onChange={handleChange}
            placeholder="Kode Produk, cth: PR000"
          />
        </div>

        {/* Deskripsi Produk */}
        <div className="mb-4">
          <label htmlFor="deskripsiProduk" className="form-label">
            <strong>Deskripsi Produk</strong>
          </label>
          <textarea
            id="deskripsiProduk"
            className="form-control"
            rows="3"
            value={deskripsiProduk}
            onChange={handleChange}
            placeholder="Deskripsi Produk"></textarea>
        </div>

        {/* Tombol Submit */}
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
