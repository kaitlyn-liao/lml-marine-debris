// Navbar.js will render the navagation bar, including hyperlinks to 
// various pages, the logo, and mainly serve to navagate between the 
// different pages of the website by changing the URL of the site 

// Navbar.js is rendered by App.js, and renders the child Controller.js

import React from 'react';
import Controller from './Controller';

class Navbar extends React.Component {
    
    render() {     
      return (
        // html goes here
        <div>
          <Controller/>
        </div>
      );
    }
}

export default Navbar