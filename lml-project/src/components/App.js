// Renders application at the near-highest level to serve as foundation

// App.js is rendered by Index.js, and renders the child Navbar.js

import TicTac from './react_tutorial_ref/Tictactoe.js'
import MerchentTable from './db_test.js'
import Methodology from './method_page/Methodology.js';
import CallToAction from './landing_page/CallToAction.js';
import Login from './login_page/Login.js'
import Login_UnApr from './login_page/Login_UnApr.js';
import Login_Apr from './login_page/Login_Apr.js';

import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";

function App() {

  return (
    <div>
      {/* <div className="db_reqs">
         <MerchentTable/>
      </div> */}
      <div className="App">
         
         <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>}>
              <Route path="" element={<Login_UnApr/>}/>
              <Route path=":postSlug" element={<Login_Apr />} />
            </Route>
          </Routes>
         </BrowserRouter>
      </div>
    <div>
      <div className="db_reqs">
         {/* <MerchentTable/> */}
      </div>
      <div className="App">
         <CallToAction/>
         <Methodology/>
      </div>
    </div>
    </div>
  );
}
export default App;
