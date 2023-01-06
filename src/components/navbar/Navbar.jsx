import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const {
    authState: { user },
    dispatch,
  } = useAuthContext();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div className="navbar">
      <div className="navbarContainer">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="logo">BookingApp</span>
        </Link>
        <div className="navItems">
          {user ? (
            <>
              <span>{user.email}</span>
              <button type="button" className="navButton" onClick={handleLogoutClick}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button type="button" className="navButton">
                <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Login
                </Link>
              </button>
              <button type="button" className="navButton">
                <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Register
                </Link>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
