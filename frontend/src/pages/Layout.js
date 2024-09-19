import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaPlus } from "react-icons/fa"; 
import Navbar from "../components/component/navbar";
import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";

const Layout = () => {
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/";
      }
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="p-3">
          <Navbar />
        </div>
        <div className="container mt-5 m-4">
          <div className="row">
            <div className="col-12">
              <Outlet />
            </div>
          </div>
        </div>

        <footer className="fixed-bottom p-3 d-flex justify-content-between align-items-center">
          <button className="ms-auto" onClick={handleLogout}> 
            <FaSignOutAlt size={24} color="#d3d3d3" />
          </button>
          <Link to="/layout/journal-entry" className="me-auto"> 
            <FaPlus size={24} color="#d3d3d3" /> 
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
