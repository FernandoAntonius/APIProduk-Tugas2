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
      text: `Apakah kamu yakin ingin menghapus data! produk: ${nama}`,
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
            Swal.fire("Deleted!", "Your data has been delete", "success");
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire("Error", "There was an issue deleting the data", "error");
          });
      }
    });
  };

  return (
    <div>
      <h2>List produk</h2>
      <NavLink to="/produk/create" className="btn btn-primary mb-3">
        Create
      </NavLink>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Nama Produk</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {produk.map((data) => (
            <tr key={data.id}>
              <td>{data.nama}</td>
              <td>
                <button
                  onClick={() => handleDelete(data.id, data.nama)}
                  className="btn btn-danger btn-sm me-2">
                  Hapus
                </button>
                <NavLink
                  to={`/produk/edit/${data.id}`}
                  className="btn btn-warning btn-sm">
                  Ubah
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
