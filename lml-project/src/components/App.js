// App.js is rendered by Index.js, and renders the child Navbar.js

import React from 'react';
import NavBar from "./Navbar.js";
import Footer from "./Footer"

function App() {

  return (
    <div>
      <NavBar/>
      <Footer/>
    </div>
  );
}
export default App;