/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`)
      .then((response) => {
        console.log(response);
        setNama(response.data.result.nama);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Data tidak ditemukan");
      });
  }, [id]);

  const handleChange = (e) => {
    setNama(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nama.trim() == "") {
      setError("Nama Fakultas is required");
      Swal.fire({
        title: "Error!",
        text: "Fakultas name cannot be empty",
        icon: "error",
      });
      return;
    }

    try {
      const response = await axios.patch(
        `https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`,
        {
          nama,
        }
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Fakultas updated successfully",
          icon: "success",
        });
        navigate("/fakultas");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Fakultas cannot be updated",
          icon: "error",
        });
        setError("Failed to edit fakultas");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Fakultas cannot be updated",
        icon: "error",
      });
      setError("An error occured while editing fakultas");
    }
  };

  return (
    <div>
      <h2>Edit Fakultas</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama Fakultas
          </label>
          <input
            type="text"
            id="nama"
            className="form-control"
            value={nama}
            onChange={handleChange}
            placeholder="Enter Fakultas Nama"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
