// Login_UnApr.js renders the Admin Login Page for the site
// This comp will display a login prompt, which, when filled out correctly
// matching an existing user credentials on the PostgreSQL data table, 
// passes a security boolean value upwards to Login.js

// Login_UnApr.js is rendered by Login.js, and renders no children.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/LoginStyle.css';

function Login_UnApr() {

  let navigate = useNavigate();
  const handleLogin = (event) =>{
    console.log(event.target.value)
    let path = `postSlug`;
    navigate(path);
  }
      
  return (
    <div className="Login_UnApr">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <input type="email" className="bg-gray email-input-size" name="email" type="email" placeholder=" Email" />
            <br></br>
            <br></br>

            <input type="password" className="bg-gray email-input-size" name="password" type="password" placeholder=" Password" />
            <br></br>

            <br></br>
            <button type="submit" className="btn-blue btn" onClick={handleLogin}>Login</button>
        </form>
    </div>
  );

}

export default Login_UnApr