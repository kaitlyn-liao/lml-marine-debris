// Login.js renders the Admin Login Page for the site
// This page will display a login prompt, and when logged in,
// displays forms to upload either new user credentials or a new .csv file

// Login.js is rendered by Controller.js, and renders the 
// children Login_Apr.js and Login_UnApr.js

import React, { useEffect, useRef, useState } from 'react';
//import { Outlet } from "react-router-dom"
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Login_Apr from './Login_Apr';
import Login_UnApr from './Login_UnApr';

function Login () {
  // User ID must be stored in the parent App component to be passed
  // to its child components
  const [userID, setUserID] = useState();

  return(
      <div className="Login">
        {/* <Outlet/> */}
          <Routes>
            <Route path="" element={<Login_UnApr setUserID={setUserID}/>}/>
            <Route path=":postSlug/" element={<Login_Apr userID={userID}/>} />

          </Routes>
      </div>
  );
}

export default Login