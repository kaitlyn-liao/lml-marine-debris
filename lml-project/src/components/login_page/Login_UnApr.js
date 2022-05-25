// Login_UnApr.js renders the Admin Login Page for the site
// This comp will display a login prompt, which, when filled out correctly
// matching an existing user credentials on the PostgreSQL data table, 
// passes a security boolean value upwards to Login.js

// Login_UnApr.js is rendered by Login.js, and renders no children.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/LoginStyle.css';

var CryptoJS = require("crypto-js");

function Login_UnApr(props) {
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
          if (data.length !== 0 && (unlockPassword(data[0].password) === password.value)) {
            // setUserID sets the value of userID in the parent Controller component
            props.setUserID(userID.value);

            // Create JSON object for authtoken
            var authObj = new Object();
            authObj.userid = userID.value;
            authObj.authenticator = true;
            var authJsonString = JSON.stringify(authObj);

            const authtoken = lockAuthToken(authJsonString)
            localStorage.setItem('authtoken', authtoken)

            // authenticate sets the value of isAuthenticated in the parent Controller component
            // This is for the initial login
            props.authenticate()
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

  function lockAuthToken(authtoken){
    // Encrypt
    console.log("raw " + authtoken)
    var lockedtoken = CryptoJS.AES.encrypt(authtoken, 'protected key').toString();
    console.log("locked " + lockedtoken);
    return(lockedtoken)
  }

  function unlockPassword(pw){
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(pw, 'protected key');
    var unlockedpw = bytes.toString(CryptoJS.enc.Utf8);
    return(unlockedpw)
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
    </div>
  );

}

export default Login_UnApr