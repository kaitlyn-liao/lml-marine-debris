// Controller.js reads the current URL determined in Navbar.js and 
// will render one of its children to reflect the URL. This file mainly 
// serves to navagate between the different pages of the website by reading the URL

// Controller.js is rendered by Navbar.js, and renders 
// the children DataVis.js, About.js, Login.js, and Team.js

import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Methodology from './method_page/Methodology.js';
import Team from './team_page/Team.js';
import CallToAction from './landing_page/CallToAction.js';
import Login from './login_page/Login.js'
import UploadCSV from './UploadCSV.js';
// import Login_UnApr from './login_page/Login_UnApr.js';
// import Login_Apr from './login_page/Login_Apr.js';

class Controller extends React.Component {
    
    render() {     
      return (
        // A <Switch> looks through its children <Route>s and renders the 
        // first one that matches the current URL.
        <div>
          <Routes>
            <Route path="/debris-data" element={<UploadCSV/>}> </Route>
            <Route path="/methodology" element={<Methodology/>}> </Route>
            <Route path="/team" element={<Team/>}> </Route>
            <Route path="/login" element={<Login/>}> </Route>
            <Route path="/" element={<CallToAction/>}> </Route>
          </Routes>

          {/* The below commeted out code is required for login page functionality.
              Ref. to Bridget when react router US needs to be completed 
          */}
          {/* <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login/>}>
                <Route path="" element={<Login_UnApr/>}/>
                <Route path=":postSlug" element={<Login_Apr />} />
              </Route>
            </Routes>
          </BrowserRouter>  */}
          
          {/* <Login/> */}
          {/* <Login_UnApr/> */}
          {/* <Login_Apr/> */}

        </div>
      );
    }
}

export default Controller
