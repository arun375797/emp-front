import React, { useEffect, useState } from 'react';
import '../nav.css';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = () => {
  const navigate = useNavigate();
  const tokenRelease = () => {
    sessionStorage.removeItem('userToken');
  };

  const adminCheck = () => {
    console.log("Checking admin...");
    if (sessionStorage.userToken) {
      console.log("Admin token found. Redirecting...");
      navigate("/empapp");
    } else {
      console.log("No admin token found.");
      alert("You are not an admin");
    }
  };
  const adminCheckform = () => {
    console.log("Checking admin...");
    if (sessionStorage.userToken) {
      console.log("Admin token found. Redirecting...");
      navigate("/form");
    } else {
      console.log("No admin token found.");
      alert("You are not an admin");
    }
  };

  return (
    <div>
      <div>
        <header id="header" className="header d-flex ">
          <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <a href="/empapp" className="logo d-flex align-items-center">
              <h1 className='emp-app'>
                Employee App<span>.</span>
              </h1>
            </a>
            <nav id="navbar" className="navbar">
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  {/* Pass adminCheck function to onClick */}
                  <button  className="button"onClick={adminCheck}> Dashboard</button> 
                </li>
                <li>
                 <button className="button"onClick={adminCheckform}>Form</button>
                </li>
                <li>
                  <Link to="/" onClick={tokenRelease}>Logout</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Navbar;
