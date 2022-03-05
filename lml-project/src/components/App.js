
// App.js is rendered by Index.js, and renders the child Navbar.js

// import TicTac from './react_tutorial_ref/Tictactoe.js'

// import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import UploadCSV from "./upload_csv";

function App() {

  return (
    <div>
      <Navbar/>
      <UploadCSV/>
    </div>
  );
}
export default App;
