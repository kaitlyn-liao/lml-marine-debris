// Login.js renders the Admin Login Page for the site
// This page will display a login prompt, and when logged in,
// displays forms to upload either new user credentials or a new .csv file

// Login.js is rendered by Controller.js, and renders the 
// children Login_Apr.js and Login_UnApr.js

import React from 'react';
import { Outlet } from "react-router-dom"

function Login () {
  return(

      <div className="Login">
          <Outlet/>
      </div>
  );
}

export default Login