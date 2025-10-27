import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function List() {
  const [review, setReview] = useState([]);

  useEffect(() => {
    axios
      .get("https://api-produk-one.vercel.app/api/api/review")
      .then((response) => {
        console.log("Response:", response.data);
        setReview(response.data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const handleDelete = (id, nama) => {
    Swal.fire({
      title: "Periksa kembali",
      text: `Apakah kamu yakin ingin menghapus data review dari ${nama}`,
      icon: "warning",
      showCancelButton: true,
      confirmedButtonColor: "#3085d6",
      cancelButtonColor: "#d33333",
      confirmButtonText: "Ya, hapus saja!",
      cancelButtonText: "Batal",
    }).then((respone) => {
      if (respone.isConfirmed) {
        axios
          .delete(`https://api-produk-one.vercel.app/api/api/review/${id}`)
          .then((response) => {
            setReview(review.filter((f) => f.id !== id));
            Swal.fire("Berhasil!", "Review berhasil dihapus", "success");
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire("Error", "Ada kendala menghapus review", "error");
          });
      }
    });
  };

  return (
    <div className="container-fluid py-4 px-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1">List Review</h4>
          <p className="text-muted mb-0">Untuk list review keren</p>
        </div>
        <NavLink to="/review/create" className="btn btn-primary shadow-sm">
          Tambah Review
        </NavLink>
      </div>

      <div className="row g-4">
        {review.map((data) => (
          <div key={data.id} className="col-md-4">
            <div className="card-body card border-1 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="fw-semibold mb-0">{data.nama}</h5>
                <div className="s">{data.kode_review}</div>
              </div>
              <p
                className="text-muted flex-grow-1"
                style={{
                  textAlign: "justify",
                  minHeight: 100,
                  maxHeight: 100,
                  overflow: "hidden",
                }}>
                {data.deskripsi}
              </p>
              <div className="small text-secondary mb-2">
                <div>
                  <strong>Nama Produk:</strong>{" "}
                  {data.produk ? data.produk.nama : "-"}
                </div>
                <div>
                  <strong>Rekomendasi:</strong>{" "}
                  {data.rekomendasi ? "Ya" : "Tidak"}
                </div>
                <hr className="my-2" />
                <div className="d-flex justify-content-between">
                  <small>
                    <strong>Dibuat: </strong>
                    {new Date(data.created_at).toLocaleString()}
                  </small>
                  <small>
                    <strong>Diperbarui: </strong>
                    {new Date(data.updated_at).toLocaleString()}
                  </small>
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <NavLink
                  to={`/review/edit/${data.id}`}
                  className="btn btn-outline-warning btn-sm w-50 me-2">
                  Edit
                </NavLink>
                <button
                  onClick={() => handleDelete(data.id, data.nama)}
                  className="btn btn-outline-danger btn-sm w-50">
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
