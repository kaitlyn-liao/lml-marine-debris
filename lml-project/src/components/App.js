
// App.js is rendered by Index.js, and renders the child Navbar.js

// import TicTac from './react_tutorial_ref/Tictactoe.js'

// import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import UploadCSV from "./UploadCSV";

function App() {

  return (
    <div>
      <NavBar/>
      <UploadCSV/>
    </div>
  );
}
export default App;
