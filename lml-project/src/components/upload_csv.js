// A file used to test the implimentation of uploading a csv file into the PostgreSQL Database

import React, {useState,useEffect} from 'react';
import { usePapaParse } from 'react-papaparse';
import localCSV from '../SSDS_tester.csv'


// Completes the process of accepting a user's CSV file, parsing through
// the file, and beginning the process of handing off the information to the postgreSQL
function UploadCSV() {
  const [uploadFile, setUploadFile] = useState([]);
  const [fileText, setText ] = useState('');
  const [fileContentJSON, setFileContent] = useState([]);
  const {readString} = usePapaParse();

  // takes accepted file and prints to confirm upload 
  const acceptFile = (event) => { event.preventDefault(); console.log("uploadFile", uploadFile[0]); };

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
  }
  
  // Communicate with database server
  const [debrisData, setDebrisData] = useState(false);
  useEffect(() => { getDebrisData(); }, []);

  async function getDebrisData() {
    await fetch('http://localhost:3001')
      .then(response => response.text())
      .then(data => { setDebrisData(data);
    });
  }

  async function postDebrisData() {
    // loop for future use of adding in every row into the database, do be filtered by checking for new entries
    let i = 0;
    while(fileContentJSON.data[i] !== undefined){
      i = i + await createDesbrisData(i);
    }
    getDebrisData();
  }

  async function createDesbrisData(i){
    let beach = fileContentJSON.data[i][0];  
    let mentor = fileContentJSON.data[i][1]; 
    let type = fileContentJSON.data[i][2];
    let season = fileContentJSON.data[i][3]; 
    let mmddyy = fileContentJSON.data[i][4]; 
    
    let mesoFragPlastic = fileContentJSON.data[i][5];
    let macroFragPlastic = fileContentJSON.data[i][6];
    let totalFragPlastic = fileContentJSON.data[i][7];

    let mesoPlasticProducts = fileContentJSON.data[i][8];
    let macroPlasticProducts = fileContentJSON.data[i][9];
    let totalPlasticProducts = fileContentJSON.data[i][10];

    let mesoFoodWrap = fileContentJSON.data[i][11];
    let macroFoodWrap = fileContentJSON.data[i][12];
    let totalFoodWrap = fileContentJSON.data[i][13];

    let mesoStyro = fileContentJSON.data[i][14];
    let macroStyro = fileContentJSON.data[i][15];
    let totalStyro = fileContentJSON.data[i][16];

    let mesoCigButts = fileContentJSON.data[i][17];
    let macroCigButts = fileContentJSON.data[i][18];
    let totalCigButts = fileContentJSON.data[i][19];

    let mesoPaper = fileContentJSON.data[i][20];
    let macroPaper = fileContentJSON.data[i][21];
    let totalPaper = fileContentJSON.data[i][22];

    let mesoMetal = fileContentJSON.data[i][23];
    let macroMetal = fileContentJSON.data[i][24];
    let totalMetal = fileContentJSON.data[i][25];

    let mesoGlass = fileContentJSON.data[i][26];
    let macroGlass = fileContentJSON.data[i][27];
    let totalGlass = fileContentJSON.data[i][28];

    let mesoFabric = fileContentJSON.data[i][29];
    let macroFabric = fileContentJSON.data[i][30];
    let toalFabric = fileContentJSON.data[i][31];

    let mesoPellets = fileContentJSON.data[i][32];
    let macroPellets = fileContentJSON.data[i][33];
    let totalPellets = fileContentJSON.data[i][34];

    let mesoFishingGear = fileContentJSON.data[i][35];
    let macroFishingGear = fileContentJSON.data[i][36];
    let totalFishingGear = fileContentJSON.data[i][37];

    let mesoRubber = fileContentJSON.data[i][38];
    let macroRubber = fileContentJSON.data[i][39];
    let totalRubber = fileContentJSON.data[i][40];

    let mesoOther = fileContentJSON.data[i][41];
    let macroOther = fileContentJSON.data[i][42];
    let totalOther = fileContentJSON.data[i][43];

    let totalMesoDebris = fileContentJSON.data[i][44];
    let totalMacroDebris = fileContentJSON.data[i][45];
    let totalTotalDebris = fileContentJSON.data[i][46];

    let mesoDebrisDivMsq = fileContentJSON.data[i][47];
    let macroDebrisDivMsq = fileContentJSON.data[i][48];
    let totalDebrisDivMsq = fileContentJSON.data[i][49];

    let notes = fileContentJSON.data[i][50];

    console.log("loop in func")
    await fetch('http://localhost:3001/lml_debris_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        beach, mentor, type, season, mmddyy, 
        mesoFragPlastic, macroFragPlastic, totalFragPlastic, 
        mesoPlasticProducts, macroPlasticProducts, totalPlasticProducts,
        mesoFoodWrap, macroFoodWrap, totalFoodWrap,
        mesoStyro, macroStyro, totalStyro,
        mesoCigButts, macroCigButts, totalCigButts,
        mesoPaper, macroPaper, totalPaper,
        mesoMetal, macroMetal, totalMetal,
        mesoGlass, macroGlass, totalGlass,
        mesoFabric, macroFabric, toalFabric,
        mesoPellets, macroPellets, totalPellets, 
        mesoFishingGear, macroFishingGear, totalFishingGear,
        mesoRubber, macroRubber, totalRubber, 
        mesoOther, macroOther, totalOther,
        totalMesoDebris, totalMacroDebris, totalTotalDebris,
        mesoDebrisDivMsq, macroDebrisDivMsq, totalDebrisDivMsq,
        notes
      }),
    })
      .then(response => {
        response.text();
      });
    return 1;
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
        // alert(data);
        getDebrisData();
      });
  }

  //  call deleteDebrisData() enough times to clear the entire table;
  function ClearDebrisDataTable() {
    fetch(`http://localhost:3001/lml_debris_data`, {
      method: 'DELETE'
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
      <button type="button" className="btn btn-primary" onClick={postDebrisData}>Add Debris Data Entry</button>
      <br />
      <button type="button" className="btn btn-outline-warning" onClick={deleteDebrisData}>Delete Debris Data Entry</button>
      <button type="button" className="btn btn-outline-warning" onClick={ClearDebrisDataTable}>EMPTY Debris Data Entry</button>
      <br/>
      {debrisData ? debrisData : 'There is no debrisData available'}  <p/>

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