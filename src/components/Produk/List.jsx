import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function List() {
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    axios
      .get("https://api-produk-one.vercel.app/api/api/produk")
      .then((response) => {
        console.log("Response:", response.data);
        setProduk(response.data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const handleDelete = (id, nama) => {
    Swal.fire({
      title: "Periksa kembali",
      text: `Apakah kamu yakin ingin menghapus data produk ${nama}`,
      icon: "warning",
      showCancelButton: true,
      confirmedButtonColor: "#3085d6",
      cancelButtonColor: "#d33333",
      confirmButtonText: "Ya, hapus saja!",
      cancelButtonText: "Batal",
    }).then((respone) => {
      if (respone.isConfirmed) {
        axios
          .delete(`https://api-produk-one.vercel.app/api/api/produk/${id}`)
          .then((response) => {
            setProduk(produk.filter((f) => f.id !== id));
            Swal.fire("Berhasil!", "Produk berhasil dihapus", "success");
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire("Error", "Terdapat kendala menghapus produk", "error");
          });
      }
    });
  };

  return (
    <div className="container-fluid py-4 px-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold">List Produk</h4>
          <p className="text-muted mb-0">Untuk melihat dan mengelola produk</p>
        </div>
        <NavLink to="/produk/create" className="btn btn-primary">
          Tambah Produk
        </NavLink>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <table className="table table-bordered align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>No</th>
                <th>Nama Produk</th>
                <th>Kode Produk</th>
                <th>Deskripsi</th>
                <th>Dibuat</th>
                <th>Diperbarui</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {produk.map((data, index) => (
                <tr key={data.id}>
                  <td>{index + 1}.</td>
                  <td>{data.nama}</td>
                  <td>{data.kode_produk}</td>
                  <td
                    style={{
                      textAlign: "justify",
                      maxWidth: "450px",
                      overflow: "hidden",
                    }}>
                    {data.deskripsi}
                  </td>
                  <td>{new Date(data.created_at).toLocaleString()}</td>
                  <td>{new Date(data.updated_at).toLocaleString()}</td>
                  <td>
                    <NavLink
                      to={`/produk/edit/${data.id}`}
                      className="btn btn-outline-warning btn-sm me-2">
                      Edit
                    </NavLink>
                    <button
                      onClick={() => handleDelete(data.id, data.nama)}
                      className="btn btn-outline-danger btn-sm">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
