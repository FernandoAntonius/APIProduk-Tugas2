/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [namaProduk, setNamaProduk] = useState("");
  const [deskripsiProduk, setDeskripsiProduk] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api-produk-one.vercel.app/api/api/produk/${id}`)
      .then((response) => {
        const data = response.data;
        console.log(response);
        setNamaProduk(data.nama || "");
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
      console.log(error);
      setError("An error occured while editing produk");
    }
  };

  return (
    <div>
      <h2>Edit Produk</h2>

      {error && <p className="text-danger">{error}</p>}
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="namaProduk" className="form-label">
            Nama Produk
          </label>
          <input
            type="text"
            id="namaProduk"
            className="form-control"
            value={namaProduk}
            onChange={handleChange}
            placeholder="Enter Nama Produk"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="deskripsiProduk" className="form-label">
            Deskripsi Produk
          </label>
          <input
            type="text"
            id="deskripsiProduk"
            className="form-control"
            value={deskripsiProduk}
            onChange={handleChange}
            placeholder="Enter Deskripsi Produk"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Simpan
        </button>
      </form>
    </div>
  );
}
