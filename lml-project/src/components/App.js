
// App.js is rendered by Index.js, and renders the child Navbar.js

// import TicTac from './react_tutorial_ref/Tictactoe.js'
// import MerchentTable from './db_test.js'
import Methodology from './method_page/Methodology.js';
import Team from './team_page/Team.js';
import BarChart from './Charts/BarChart.js';
import PieChart from './Charts/PieChart.js';
import StackedChart from './Charts/StackedChart.js';
import ComparisonChart from './Charts/ComparisonChart.js';
import CallToAction from './landing_page/CallToAction.js';
// import Login from './login_page/Login.js'
// import Login_UnApr from './login_page/Login_UnApr.js';
// import Login_Apr from './login_page/Login_Apr.js';

// import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";


function App() {
  // Add this in node_modules/react-dom/index.js
  // Check for more than one React instance, for debugging
/*window.React1 = require('react');

// Add this in your component file
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);*/

  return (
    <div>
      <div className="db_reqs">
         {/* <MerchentTable/> */}
      </div>
      
      <div className="App">
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

         {/*<Team/>
         <CallToAction/>
         <Methodology/>
         <BarChart/>
         <StackedChart/>
         <ComparisonChart/>
         <PieChart/>*/}
         
      </div>
    </div>
  );
}
export default App;
