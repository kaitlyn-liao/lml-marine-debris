// Login_UnApr.js renders the Admin Login Page for the site
// This comp will display a login prompt, which, when filled out correctly
// matching an existing user credentials on the PostgreSQL data table, 
// passes a security boolean value upwards to Login.js

// Login_UnApr.js is rendered by Login.js, and renders no children.

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/LoginStyle.css';
import UploadAdmin from '../UploadAdmin';
import Login from './Login';
import Login_Apr from './Login_Apr';

function Login_UnApr({ setUserID }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  let navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    const { userID, password } = event.target.elements;

    if (userID.value === "" || password.value === "") {
      document.getElementById("loginForm").reset()
      document.getElementById("login-error").style.visibility = "visible";
    }
    else{
      // Check if userID and password combination is valid
      fetch(`http://localhost:3001/lml_admins/checkAdmins/${userID.value}/${password.value}`)
        .then(response => response.json())
        .then(data => {
          if (data.exists) {
            console.log("Logged in", data.exists);
            // setUserID sets the value of userID in the parent Login component
            setUserID(userID.value);
            let path = `postSlug`;
            navigate(path);
  
          }
          else {
            document.getElementById("loginForm").reset()
            document.getElementById("login-error").style.visibility = "visible";
          }
        });

    }


  }

  return (
    <div>
      <div className="Login_UnApr">
        <h1>Login</h1>
        <div id="login-error" className="login-error-msg mx-auto alert alert-danger" role="alert">
          Incorrect username or password
        </div>
        <form id="loginForm" onSubmit={handleLogin}>
          <input type="text" className="bg-gray email-input-size" name="userID" placeholder=" User ID" onChange={event => setUserName(event.target.value)} />
          <br></br>
          <br></br>

          <input type="password" className="bg-gray email-input-size" name="password" placeholder=" Password" onChange={event => setPassword(event.target.value)} />
          <br></br>

          <br></br>
          <button type="submit" className="btn-blue btn">Login</button>
        </form>
      </div>
      <br></br>
      {/* <UploadAdmin/> */}
    </div>
  );

}

export default Login_UnApr