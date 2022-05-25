// Navbar.js will render the navagation bar, including hyperlinks to 
// various pages, the logo, and mainly serve to navagate between the 
// different pages of the website by changing the URL of the site 

// Navbar.js is rendered by App.js, and renders the child Controller.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import brandImg from '../images/lmlsn-logo.png';
import Controller from './Controller';

var CryptoJS = require("crypto-js");

function NavBar() {

  const [newAuth, setAuth] = useState(false)
  const showAuth = (auth) => {
    setAuth(auth)
  }

  return (
    <Router basename="/lml_marine_debris">
      <div>
        <Navbar collapseOnSelect expand="lg" sticky="top"
          bg="light" variant="light" style={{ padding: "10px" }} >
          <Navbar.Brand href="/lml_marine_debris">
            <img
              src={brandImg}
              alt="UCSC LML Logo"
            />
            {' '}
            UCSC LML Marine Debris
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/lml_marine_debris/debris-data"> Debris Data      </Nav.Link>
              <Nav.Link href="/lml_marine_debris/methodology"> Data Collection  </Nav.Link>
              <Nav.Link href="/lml_marine_debris/team">        Meet the Team    </Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
              {/* <button type="button" className="btn btn-outline-primary" href="/login">Login</button> */}
              {newAuth ?
                <Nav.Link href="/lml_marine_debris/login/postSlug">
                  <button type="button" className="btn btn-outline-primary" href="/login/postSlug">View Profile</button>
                </Nav.Link>
                :
                <Nav.Link href="/lml_marine_debris/login">
                  <button type="button" className="btn btn-outline-primary" href="/login">Login</button>
                </Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br></br>
        <Controller showAuth={showAuth} />
      </div>
    </Router>
  );
}

export default NavBar