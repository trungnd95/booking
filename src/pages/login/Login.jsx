import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import './Login.css';

function Login() {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value,
    });
  };

  const {
    authState: { error },
    dispatch,
  } = useAuthContext();
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: credentials });
      navigate('/');
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <h2 className="lTitle">Login Form</h2>
        {error && <span className="lError">{error.msg}</span>}
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="lInput"
          value={credentials.email}
        />

        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
          value={credentials.password}
        />

        <button type="submit" onClick={handleClick} className="lButton">
          Login
        </button>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Login;
