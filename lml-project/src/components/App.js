// Renders application at the near-highest level to serve as foundation

// App.js is rendered by Index.js, and renders the child Navbar.js

import React from 'react';
// import TicTac from './react_tutorial_ref/Tictactoe.js'
// import MerchentTable from './db_test.js'
import UploadCSV from './upload_csv'

function App() {

  return (
    <div>
      {/* <div className="db_reqs">
         <MerchentTable/>
      </div> */}

      <div className="csv">
         <UploadCSV/>
      </div>

      {/* <div className="App">
         <TicTac/>
      </div> */}

    </div>
  );
}
export default App;
