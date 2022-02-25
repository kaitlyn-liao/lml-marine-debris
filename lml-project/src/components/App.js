// Renders application at the near-highest level to serve as foundation

// App.js is rendered by Index.js, and renders the child Navbar.js

import TicTac from './react_tutorial_ref/Tictactoe.js'
import MerchentTable from './db_test.js'
import Methodology from './method_page/Methodology.js';
import Team from './team_page/Team.js';

function App() {

  return (
    <div>
      <div className="db_reqs">
         {/* <MerchentTable/> */}
      </div>
      <div className="App">
         <Team/>
      </div>
    </div>
  );
}
export default App;
