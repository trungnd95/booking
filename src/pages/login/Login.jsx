import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const handleChange = (e) => {};

  const handleClick = (e) => {};
  return (
    <div className="login">
      {/* {error && <span>{error.message}</span>} */}
      <div className="lContainer">
        <input
          type="text"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button type="submit" onClick={handleClick} className="lButton">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
