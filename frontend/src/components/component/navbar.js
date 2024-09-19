import React, { useState, useEffect } from "react";
import { Text, Box } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const [currentPage, setCurrentPage] = useState("");
    const location = useLocation();
    
    useEffect(() => {
        setCurrentPage(location.pathname);
    }, [location]);

    const isCurrentPage = (path) => {
        return currentPage === path;
    };

    return (
        <Box as="nav" className="navbar navbar-expand fixed-top" bg="rgb(23, 22, 22)">
            <Box className="container d-flex justify-content-between">
                <Link to="/layout" className="navbar-brand text-white">
                    <Text color="white" fontSize="2xl" fontFamily="Josefin Slab" fontWeight="bold">J o u r n a l - I t</Text>
                </Link>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <div className="container d-flex justify-content-between">
                        <li className="nav-item">
                            <Link to="/layout" className={`nav-link ${isCurrentPage("/layout") ? "active" : ""} text-white`}>
                                <Text color={isCurrentPage("/layout") ? "pink" : "white"} fontSize="xl" fontFamily="Varela Round" fontWeight={isCurrentPage("/layout") ? "bold" : "normal"}>home</Text>
                            </Link>
                        </li>
                        <li className="nav-item ms-5">
                            <Link to="/layout/todays" className={`nav-link ${isCurrentPage("/layout/todays") ? "active" : ""} text-white`}>
                                <Text color={isCurrentPage("/layout/todays") ? "pink" : "white"} fontSize="xl" fontFamily="Varela Round" fontWeight={isCurrentPage("/layout/todays") ? "bold" : "normal"}>today's</Text>
                            </Link>
                        </li>
                        <li className="nav-item ms-5">
                            <Link to="/layout/entries" className={`nav-link ${isCurrentPage("/layout/entries") ? "active" : ""} text-white`}>
                                <Text color={isCurrentPage("/layout/entries") ? "pink" : "white"} fontSize="xl" fontFamily="Varela Round" fontWeight={isCurrentPage("/layout/entries") ? "bold" : "normal"}>entries</Text>
                            </Link>
                        </li>
                        <li className="nav-item ms-5">
                            <Link to="/layout/favorites" className={`nav-link ${isCurrentPage("/layout/favorites") ? "active" : ""} text-white`}>
                                <Text color={isCurrentPage("/layout/favorites") ? "pink" : "white"}  fontSize="xl" fontFamily="Cedarville Cursive" fontWeight={isCurrentPage("/layout/favorites") ? "bold" : "normal"} >favorites</Text>
                            </Link>
                        </li>
                    </div>
                </ul>
            </Box>
        </Box>
    );
}
