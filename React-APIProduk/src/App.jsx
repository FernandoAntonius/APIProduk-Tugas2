import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

const Home = React.lazy(() => import("./components/Home"));
const ProdukList = React.lazy(() => import("./components/Produk/List"));
const ProdukCreate = React.lazy(() => import("./components/Produk/Create"));
const ProdukEdit = React.lazy(() => import("./components/Produk/Edit"));
const ReviewList = React.lazy(() => import("./components/Review/List"));
const ReviewCreate = React.lazy(() => import("./components/Review/Create"));
const ReviewEdit = React.lazy(() => import("./components/Review/Edit"));

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            API Produk
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link" to="/produk">
                  Produk
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link" to="/review">
                  Review
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Suspense fallback={<div>Loading.....</div>}>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/produk" element={<ProdukList></ProdukList>}></Route>
          <Route
            path="/produk/create"
            element={<ProdukCreate></ProdukCreate>}></Route>
          <Route
            path="/produk/edit/:id"
            element={<ProdukEdit></ProdukEdit>}></Route>
          <Route path="/review" element={<ReviewList></ReviewList>}></Route>
          <Route
            path="/review/create"
            element={<ReviewCreate></ReviewCreate>}></Route>
          <Route
            path="/review/edit/:id"
            element={<ReviewEdit></ReviewEdit>}></Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
