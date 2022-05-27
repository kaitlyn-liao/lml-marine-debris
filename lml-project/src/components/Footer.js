import React from "react";
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>UCSC LML Marine Debris</h4>
            <ui className="list-unstyled">
              <li>342-420-6969</li>
              <li>College Nine, UCSC</li>
              <li>702 College Nine Road</li>
            </ui>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Visit Us!</h4>
            <ui className="list-unstyled">
              <a href="https://lmlstrandingnetwork.ucsc.edu/" target="_blank">Visit the offical LML website!</a>
            </ui>
            <br></br>
            <ui className="list-unstyled">
              <a href="https://lmlstrandingmap.herokuapp.com/" target="_blank">Visit our sister Marine Stranding website!</a>
            </ui>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} UCSC LML Marine Debris | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;