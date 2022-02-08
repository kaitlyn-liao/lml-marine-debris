import './App.css';
import TicTac from './Tictactoe.js'
import LandingPage from './LandingPage.js'

import React, {useState, useEffect} from 'react';
function App() {
  
  const [merchants, setMerchants] = useState(false);
  useEffect(() => { getMerchant(); });

  // console.log(merchants);

  let merch_rows= []
  let merch_id= []
  let merch_name= []
  let merch_email= []

  if(merchants){
    // merch_rows = merchants.split(",")
    for(var i=0; i < merchants.length; i++){
      merch_rows[i] = merchants[i]
      merch_id[i] = merchants[i].id
      merch_name[i] = merchants[i].name
      merch_email[i] = merchants[i].email
    }
  }

  function getMerchant() {
    fetch('http://localhost:3001')
      .then(response => response.json())
      .then(data => { setMerchants(data);});
  }
  function createMerchant() {
    let name = prompt('Enter merchant name');
    let email = prompt('Enter merchant email');
    fetch('http://localhost:3001/merchants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMerchant();
      });
  }
  function deleteMerchant() {
    let id = prompt('Enter merchant id');
    fetch(`http://localhost:3001/merchants/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMerchant();
      });
  }

  return (
    <div>
      <div className='db_reqs'>
        {/* {merchants ? merchants : 'There is no merchant data available'} <p/> */}

        {merchants ? merch_id : 'There is no merchant data available'}  <p/>
        {merchants ? merch_name : 'There is no merchant data available'}  <p/>
        {merchants ? merch_email : 'There is no merchant data available'}  <p/>

        <br />
        <button onClick={createMerchant}>Add merchant</button>
        <br />
        <button onClick={deleteMerchant}>Delete merchant</button>
      </div>
      <div className="App">
         <LandingPage/>
         <TicTac/>
      </div>
    </div>
  );
}
export default App;
