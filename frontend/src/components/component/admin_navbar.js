import React from "react";
import { Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

export default function AdminNavbar() {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand bg-body-tertiary fixed-top" style={{ backgroundColor: "rgb(23, 22, 22)" }}>
            <div className="container d-flex justify-content-between">
                <a className="navbar-brand text-white" >
                    <Text color="white" fontSize="2xl" fontFamily="Josefin Slab" fontWeight="bold">A d m i n P a n e l</Text>
                </a>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <div className="container d-flex justify-content-between">
                        <li className={`nav-item ${location.pathname === '/admin/panel' ? 'active' : ''}`}>
                            <Link to='/admin/panel' className="nav-link text-white">
                                <Text color={location.pathname === '/admin/panel' ? "linear-gradient(to right, #8B0000, #FF4500)" : "white"} fontSize="xl" fontFamily="Varela Round">users</Text>
                            </Link>
                        </li>
                        <li className={`nav-item ms-5 ${location.pathname === '/admin/panel/addadmin' ? 'active' : ''}`}>
                            <Link to='/admin/panel/addadmin' className="nav-link text-white">
                                <Text color={location.pathname === '/admin/panel/addadmin' ? "linear-gradient(to right, #8B0000, #FF4500)" : "white"} fontSize="xl" fontFamily="Varela Round">add admin</Text>
                            </Link>
                        </li>
                        <li className={`nav-item ms-5 ${location.pathname === '/admin/panel/adduser' ? 'active' : ''}`}>
                            <Link to='/admin/panel/adduser' className="nav-link text-white">
                                <Text color={location.pathname === '/admin/panel/adduser' ? "linear-gradient(to right, #8B0000, #FF4500)" : "white"} fontSize="xl" fontFamily="Varela Round">add user</Text>
                            </Link>
                        </li>
                        {/* <li className="nav-item ms-5">
                            <a className="nav-link text-white">
                                <Text color="white" fontSize="xl" fontFamily="Cedarville Cursive">notes</Text>
                            </a>
                        </li> */}
                    </div>
                </ul>
            </div>
        </nav>
    );
}
