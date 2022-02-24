// A file used to test the implimentation of uploading a csv file into the PostgreSQL Database
import React, {useState} from 'react';
import { usePapaParse } from 'react-papaparse';
import localCSV from '../SSDS_tester.csv'


// Completes the process of accepting a user's CSV file, parsing through
// the file, and beginning the process of handing off the information to the postgreSQL
function UploadCSV() {
  const [uploadFile, setUploadFile] = useState([]);
  // const [fileText, setText ] = useState('');
  const {readString} = usePapaParse();

  // takes accepted file and prints to confirm up 
  const acceptFile = (event) => {
    event.preventDefault();
    console.log("uploadFile", uploadFile[0]);
  };

  // loadFile() -> fetches the text content of a csv file
  async function loadFile (){
    return await fetch( localCSV ).then( response => response.text());
    // fetch( localCSV ).then( response => response.text().then( responseText => setText(responseText)));
  };

  // handleReadString() -> parses through CSV text content and converts it to JSON format vis Papaparse
  async function handleReadString() {
  //const fileContent = `Column 1,Column 2,Column 3,Column 4' etc
    const fileContent =  await loadFile();

    readString(fileContent, {
      worker: true,
      complete: (results) => {
        console.log('---------------------------');
        console.log(results);
        console.log('---------------------------');
      },
    });

    // begin to parse through and upload new entries to the lml-data datatable in PostgreSQL
    // fileContent
  }
  
  // function getMerchant() {
  //   fetch('http://localhost:3001')
  //     .then(response => response.json())
  //     .then(data => { setMerchants(data);});
  // }
  // function createMerchant() {
  //   let name = prompt('Enter merchant name');
  //   let email = prompt('Enter merchant email');
  //   fetch('http://localhost:3001/merchants', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({name, email}),
  //   })
  //     .then(response => {
  //       return response.text();
  //     })
  //     .then(data => {
  //       alert(data);
  //       getMerchant();
  //     });
  // }
  // function deleteMerchant() {
  //   let id = prompt('Enter merchant id');
  //   fetch(`http://localhost:3001/merchants/${id}`, {
  //     method: 'DELETE',
  //   })
  //     .then(response => {
  //       return response.text();
  //     })
  //     .then(data => {
  //       alert(data);
  //       getMerchant();
  //     });
  // }

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

      <button onClick={handleReadString}>readString</button>
      <br/><br/>

      <form onSubmit={acceptFile}>
        <input  className="csv-input" 
                type="file" 
                id="react-csv-reader-input" 
                accept=".csv, text/csv" 
                name="myFile" 
                onChange={(e) => setUploadFile(e.target.files)} >    
        </input>
        <br/>
        <input type="submit" /> 
      </form>

      {/* <div>
        <button onClick={ loadFile }>loadFile</button>
        <h2>Content:</h2>
        <pre>{ fileText }</pre>
      </div> */}
    </div>
  );
}


export default UploadCSV

// SQL Initialization for associated data tables

// CREATE DATABASE lml_database;

// CREATE TABLE lml_admins (
// 	admin_id serial PRIMARY KEY,
// 	username VARCHAR ( 100 ) UNIQUE NOT NULL,
// 	password VARCHAR ( 100 ) NOT NULL,
// 	email VARCHAR ( 255 ) UNIQUE NOT NULL,
// 	created_on TIMESTAMP NOT NULL,
//  last_login TIMESTAMP 
// );

// CREATE TABLE lml_debris_data (
// 	 entry_id serial PRIMARY KEY,
//   beach VARCHAR (100) NOT NULL,
//   mentor VARCHAR (100),
//   type VARCHAR (1),
//   season VARCHAR(100),
//   date VARCHAR (100),
//   meso_fragmented_plastic INT,
//   macro_fragmented_plastic INT,
//   total_fragmented_plastic INT,
//   meso_plastic_products INT,
//   macro_plastic_products INT,
//   total_plastic_products INT,
//   meso_food_wrappers INT,
//   macro_food_wrappers INT,
//   total_food_wrappers INT,
//   meso_styrofoam INT,
//   macro_styrofoam INT,
//   total_styrofoam INT,
//   meso_cigarette_butts INT,
//   macro_cigarette_butts INT,
//   total_cigarette_butts INT,
//   meso_paper_and_treated_wood INT,
//   macro_paper_and_treated_wood INT,
//   total_paper_and_treated_wood INT,
//   meso_metal INT,
//   macro_metal INT,
//   total_metal INT,
//   meso_glass INT,
//   macro_glass INT,
//   total_glass INT,
//   meso_fabric INT,
//   macro_fabric INT,
//   total_fabric INT,
//   meso_fetilizer_pellets INT,
//   macro_fetilizer_pellets INT,
//   total_fetilizer_pellets INT,
//   meso_fishing_gear INT,
//   macro_fishing_gear INT,
//   total_fishing_gear INT,
//   meso_rubber INT,
//   macro_rubber INT,
//   total_rubber INT,
//   meso_other INT,
//   macro_other INT,
//   total_other INT,
//   total_meso_debris INT,
//   total_macro_debris INT,
//   total_debris INT,
//   meso_debris_divby_m_sq FLOAT,
//   macro_debris_divby_m_sq FlOAT,
//   total_debris_divby_m_sq FLOAT,
//   notes VARCHAR(255),
//   last_update TIMESTAMP 
// );
