import logo from './logo.svg';
import './App.css';


import Head from "./header.js"
import Switch from "./switchButton.js"
import HeatItem from "./heatItem.js"
import '../node_modules/bulma/css/bulma.min.css';

function App() {
  return (
    <div className="App">
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
      </header>*/}
      <div class="columns">
        <div class="column is-2">
          <h1 class="title"><Head/></h1>
        </div>
      </div>
      <div class="columns">
        <div class="column is-3">
          <div class="tile is-ancestor">

            <div class="tile is-parent is-vertical">
            <div class="tile is-child notification is-warning">
              <div class="columns">
              <div class="column is-6">
                <h1 class="is-pulled-left">Heatmap</h1>
              </div>
              <div class="column is-6">
                <Switch />
              </div>
              </div>
              <div class="columns">
              <div class="column is-6">
                <h1 class="is-pulled-left">Time Slider</h1>
              </div>
              <div class="column is-6">
                <Switch />
              </div>
              </div>
          </div>
          </div>
          </div>
        </div>
      
      </div>
      {/*<div classname="main"> 
          <div className="buttons">
            <button class="button is-primary">Primary</button>
            <button class="button is-link">Link</button>
            <button class="button is-info">Info</button>
            <button class="button is-success">Success</button>
            <button class="button is-warning">Warning</button>
            <button class="button is-danger">Danger</button>
            <button class="button is-black">Black</button>
            <button class="button is-white">White</button>
            <button class="button is-dark">Dark</button>
            <button class="button is-light">Light</button>
          </div>
        </div>*/}
    </div>
  );
}

export default App;
