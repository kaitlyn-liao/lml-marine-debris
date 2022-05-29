// Navbar.js will render the navagation bar, including hyperlinks to 
// various pages, the logo, and mainly serve to navagate between the 
// different pages of the website by changing the URL of the site 

// Navbar.js is rendered by App.js, and renders the child Controller.js

import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import brandImg from '../images/lmlsn-logo.png';
import Controller from './Controller';
import Footer from "./Footer.js";

function NavBar() {

  const [newAuth, setAuth] = useState(false)
  const showAuth = (auth) => {
    setAuth(auth)
  }

  return (
    <Router basename="/">
      <div>
        <Navbar collapseOnSelect expand="lg" sticky="top"
          bg="light" variant="light" style={{ padding: "10px" }} >
          <Navbar.Brand href="/">
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
              <Nav.Link href="/debris-data"> Debris Data      </Nav.Link>
              <Nav.Link href="/methodology"> Data Collection  </Nav.Link>
              <Nav.Link href="/team">        Meet the Team    </Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
              {/* <button type="button" className="btn btn-outline-primary" href="/login">Login</button> */}
              {newAuth ?
                <Nav.Link href="/login/postSlug">
                  <button type="button" className="btn btn-outline-primary" href="/login/postSlug">View Profile</button>
                </Nav.Link>
                :
                <Nav.Link href="/login">
                  <button type="button" className="btn btn-outline-primary" href="/login">Login</button>
                </Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br></br>
        <Controller showAuth={showAuth} />
      </div>
      <br></br>
      <Footer/>
    </Router>
  );
}

export default NavBar