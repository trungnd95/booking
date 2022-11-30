import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbarContainer">
        <span className="logo">BookingApp</span>
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
