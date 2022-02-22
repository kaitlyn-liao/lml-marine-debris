import TicTac from './react_tutorial_ref/Tictactoe.js'
import MerchentTable from './db_test.js'

function App() {

  return (
    <div>
      <div className="db_reqs">
         <MerchentTable/>
      </div>
      <div className="App">
         <TicTac/>
      </div>
    </div>
  );
}
export default App;
