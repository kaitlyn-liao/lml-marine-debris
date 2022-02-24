// A file used to test the implimentation of uploading a csv file into the PostgreSQL Database

import React, {useState,useEffect} from 'react';
import { usePapaParse } from 'react-papaparse';
import localCSV from '../SSDS_tester.csv'


// Completes the process of accepting a user's CSV file, parsing through
// the file, and beginning the process of handing off the information to the postgreSQL
function UploadCSV() {
  const [uploadFile, setUploadFile] = useState([]);
  const [fileText, setText ] = useState('');
  const {readString} = usePapaParse();

  const [fileContentJSON, setFileContent] = useState([]);

  // takes accepted file and prints to confirm up 
  const acceptFile = (event) => {
    event.preventDefault();
    console.log("uploadFile", uploadFile[0]);
  };

  // loadFile() -> fetches the text content of a csv file
  async function loadFile (){
    fetch( localCSV ).then( response => response.text().then( responseText => setText(responseText)));
    return await fetch( localCSV ).then( response => response.text());
  };

  // handleReadString() -> parses through CSV text content and converts it to JSON format vis Papaparse
  // reference found at https://github.com/Bunlong/react-papaparse/blob/v4.0.0/examples/readString.tsx
  async function handleReadString() {
    const content =  await loadFile();
    setFileContent(content);

    readString(content, {
      worker: true,
      complete: (results) => {
        console.log('---------------------------');
        console.log(results);
        console.log('---------------------------');
        setFileContent(results);
      },
    });

    // begin to parse through and upload new entries to the lml-data datatable in PostgreSQL
    // fileContent
  }
  
  const [debrisData, setDebrisData] = useState(false);
  useEffect(() => { getDebrisData(); }, []);

  function getDebrisData() {
    fetch('http://localhost:3001')
      .then(response => response.text())
      .then(data => { setDebrisData(data);});
  }

  function createDebrisData() {
    // loop for future use of adding in every row into the database, do be filtered by checking for new entries
    // let i = 0;
    // while(fileContentJSON.data[i] !== undefined){
    //   console.log("loop");
    //   i++;
    // }

    let Beach = fileContentJSON.data[1][0]; let Mentor = fileContentJSON.data[1][1]; let Type = fileContentJSON.data[1][2];
    let Season = fileContentJSON.data[1][3]; let MMDDYY = fileContentJSON.data[1][4]; let MesoFragmentedPlastic = fileContentJSON.data[1][5];

    console.log({Beach, Mentor, Type, Season, MMDDYY, MesoFragmentedPlastic });
    fetch('http://localhost:3001/lml_debris_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Beach, Mentor, Type, Season, MMDDYY, MesoFragmentedPlastic }),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getDebrisData();
      });
  }

  function deleteDebrisData() {
    let entry_id = prompt('Enter debris entry_id');
    fetch(`http://localhost:3001/lml_debris_data/${entry_id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getDebrisData();
      });
  }

  // const showFile = async (e) => {
  //   e.preventDefault()
  //   const reader = new FileReader()
  //   reader.onload = async (e) => { 
  //     const text = (e.target.result)
  //     console.log(text)
  //     alert(text)
  //   };
  //   reader.readAsText(e.target.files[0])
  // }

  return (
    <div>
      <button onClick={handleReadString}>Upload CSV Data</button>
      <br /><br />
      {debrisData ? debrisData : 'There is no debrisData available'}  <p/>
      <button type="button" className="btn btn-primary" onClick={createDebrisData}>Add Debris Data Entry</button>
      <br />
      <button type="button" className="btn btn-outline-warning" onClick={deleteDebrisData}>Delete Debris Data Entry</button>

      {/* <form onSubmit={acceptFile}>
        <input  className="csv-input" 
                type="file" 
                id="react-csv-reader-input" 
                accept=".csv, text/csv" 
                name="myFile" 
                onChange={(e) => setUploadFile(e.target.files)} >    
        </input>
        <br/>
        <input type="submit" /> 
      </form> */}


      {/* <div>
        <button onClick={ loadFile }>loadFile</button>
        <h2>Content:</h2>
        <pre>{ fileText }</pre>
      </div> */}
    </div>
  );
}

export default UploadCSV

// THINGS TO DO ON lml postgreSQL
// 1. CREATE ROLE lml_user WITH LOGIN PASSWORD 'wave';
// 2. ALTER ROLE lml_user CREATEDB;
// 3. exit out and log in as lml_user
// 4. CREATE DATABASE lml_database;
// 5.
//   CREATE TABLE lml_debris_data (
//   	 entry_id serial PRIMARY KEY,
//     beach VARCHAR (100) NOT NULL,
//     mentor VARCHAR (100),
//     type VARCHAR (1),
//     season VARCHAR(100),
//     date VARCHAR (100),
//     meso_fragmented_plastic INT,
//     macro_fragmented_plastic INT,
//     total_fragmented_plastic INT,
//     meso_plastic_products INT,
//     macro_plastic_products INT,
//     total_plastic_products INT,
//     meso_food_wrappers INT,
//     macro_food_wrappers INT,
//     total_food_wrappers INT,
//     meso_styrofoam INT,
//     macro_styrofoam INT,
//     total_styrofoam INT,
//     meso_cigarette_butts INT,
//     macro_cigarette_butts INT,
//     total_cigarette_butts INT,
//     meso_paper_and_treated_wood INT,
//     macro_paper_and_treated_wood INT,
//     total_paper_and_treated_wood INT,
//     meso_metal INT,
//     macro_metal INT,
//     total_metal INT,
//     meso_glass INT,
//     macro_glass INT,
//     total_glass INT,
//     meso_fabric INT,
//     macro_fabric INT,
//     total_fabric INT,
//     meso_fetilizer_pellets INT,
//     macro_fetilizer_pellets INT,
//     total_fetilizer_pellets INT,
//     meso_fishing_gear INT,
//     macro_fishing_gear INT,
//     total_fishing_gear INT,
//     meso_rubber INT,
//     macro_rubber INT,
//     total_rubber INT,
//     meso_other INT,
//     macro_other INT,
//     total_other INT,
//     total_meso_debris INT,
//     total_macro_debris INT,
//     total_debris INT,
//     meso_debris_divby_m_sq FLOAT,
//     macro_debris_divby_m_sq FlOAT,
//     total_debris_divby_m_sq FLOAT,
//     notes VARCHAR(255),
//     last_update TIMESTAMP 
//   );

// optional / for later
// 6.
//   CREATE TABLE lml_admins (
//   	admin_id serial PRIMARY KEY,
//   	username VARCHAR ( 100 ) UNIQUE NOT NULL,
//   	password VARCHAR ( 100 ) NOT NULL,
//   	email VARCHAR ( 255 ) UNIQUE NOT NULL,
//   	created_on TIMESTAMP NOT NULL,
//    last_login TIMESTAMP 
//   );