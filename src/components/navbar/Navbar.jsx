import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbarContainer">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="logo">BookingApp</span>
        </Link>
        <div className="navItems">
          <button type="button" className="navButton">
            Login
          </button>
          <button type="button" className="navButton">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
