
// App.js is rendered by Index.js, and renders the child Navbar.js

// import TicTac from './react_tutorial_ref/Tictactoe.js'

// import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./Navbar.js";
import Team from './team_page/Team.js';

function App() {

  return (
    <div>
      <NavBar/>
    </div>
  );
}
export default App;
