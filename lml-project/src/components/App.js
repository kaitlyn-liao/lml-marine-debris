
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
import NavBar from "./Navbar.js";

function App() {
  // Add this in node_modules/react-dom/index.js
window.React1 = require('react');

// Add this in your component file
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);
  return (
    <div>
      <NavBar/>
    </div>
  );
}
export default App;
