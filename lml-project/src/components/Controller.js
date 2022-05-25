// Controller.js reads the current URL determined in Navbar.js and 
// will render one of its children to reflect the URL. This file mainly 
// serves to navagate between the different pages of the website by reading the URL

// Controller.js is rendered by Navbar.js, and renders 
// the children DataVis.js, About.js, Login.js, and Team.js

import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Methodology from './method_page/Methodology.js';
import Team from './team_page/Team.js';
import CallToAction from './landing_page/CallToAction.js';
import Login from './login_page/Login.js'
import Login_UnApr from './login_page/Login_UnApr.js';
import Login_Apr from './login_page/Login_Apr.js';
import DataVis from './data_page/DataVis.js';

var CryptoJS = require("crypto-js");


function Controller ({showAuth}) {
  // User ID must be stored in the parent component to be passed
  // to its child components
  const [userID, setUserID] = useState();
  
  const [isAuthenticated, setAuthentication] = useState(false);

  // Function is called by child component Login_UnApr to rerender Controller
  const authenticate = () => {
    setAuthentication(true)
  }

  function unlockAuthToken(authtoken){
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(authtoken, 'protected key');
    var unlockedtoken = bytes.toString(CryptoJS.enc.Utf8);
    return(unlockedtoken)
  }

  // Retrieve authtoken from local storage and confirming authentication
  var isAuth = false;
  if((localStorage.getItem('authtoken') !== null)){
    const auth = unlockAuthToken(localStorage.getItem('authtoken'))
    const authObj = JSON.parse(auth)
    if((authObj.authenticator === true)){
      isAuth = true;
    }
  }
  useEffect(() => {
    showAuth(isAuth);
  }, []);
  

  return (
    // A <Switch> looks through its children <Route>s and renders the 
    // first one that matches the current URL.
    <div>
      <Routes>
        <Route path="/debris-data" element={<DataVis/>}> </Route>
        <Route path="/methodology" element={<Methodology/>}> </Route>
        <Route path="/team" element={<Team/>}> </Route>
        <Route path="/login/" element={<Login />}> 
            <Route path="" element={<Login_UnApr setUserID={setUserID} authenticate={authenticate}/>}/>
            <Route path=":postSlug/" element={isAuth ? <Login_Apr userID={userID} /> : <Navigate to="/"/>} />
        </Route>
        <Route path="/" element={<CallToAction/>}> </Route>
      </Routes>
    </div>
  );
}

export default Controller
