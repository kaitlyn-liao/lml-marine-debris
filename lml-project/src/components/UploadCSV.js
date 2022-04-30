// A file used to test the implimentation of uploading a csv file into the PostgreSQL Database

import React, {useState,useEffect} from 'react';
import { usePapaParse } from 'react-papaparse';
import loadIcon from './loading.gif'

// Completes the process of accepting a user's CSV file, parsing through
// the file, and beginning the process of handing off the information to the postgreSQL
function UploadCSV() {
  const [file, setFile] = useState();
  const [dataToDB, setdataToDB] = useState();
  const fileReader = new FileReader();

  const [uploadLoading, setUploadLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(false)
  const [uploadErrorRows, updateUploadErrorRows] = useState([])

  console.log(uploadErrorRows)

  // handles the display name next to the "seclect file" button
  const handleOnChange = (e) => {
    console.log(e.target.files)
    setFile(e.target.files[0]);
  };

  // reads throuh the file submission and changes state setdataToDB to raw csv text
  const handleOnSubmit = (e) => {
    setUploadLoading(true);

    e.preventDefault();
    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        setdataToDB(csvOutput);
      };
      fileReader.readAsText(file);
      handleReadString();
    setUploadLoading(false);
    }
  };

  // const [fileText, setText ] = useState('');
  const [fileContentJSON, setFileContent] = useState([]);
  const {readString} = usePapaParse();

  // Communicate with database server
  // debrisData stores the result of a GET call from the data table
  // setDebrisData sets the value of debrisData
  const [debrisData, setDebrisData] = useState(false);
  useEffect(() => { getDebrisData(); }, []);

  // handleReadString() -> parses through CSV text content and converts it to JSON format vis Papaparse
  // reference found at https://github.com/Bunlong/react-papaparse/blob/v4.0.0/examples/readString.tsx
  async function handleReadString() {
    const content = dataToDB
    // console.log(content)
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
  
  // GET call to display updated version of data table
  function getDebrisData() {
    let beach = "Waddell";
    fetch(`http://localhost:3001/`)
      .then(response => response.json())
      .then(data => { setDebrisData(data);});
  }

  // Calls createDesbrisData() until every row of the CSV file is POSTed
  async function postDebrisData() {
    setFetchLoading(true)
    ClearDebrisDataTable();
    // loop for future use of adding in every row into the database, do be filtered by checking for new entries
    let i = 1;
    while(fileContentJSON.data[i] !== undefined){
      await createDesbrisData(i);
      i++;
    }
    getDebrisData();
    setFetchLoading(false)
  }

  // Reads through the array created via CSV file, and POSTS specified row to the data table
  async function createDesbrisData(i){
    // Beach	type	Date	Season	
    let beach = fileContentJSON.data[i][0];                   // beach collected  
    let type = fileContentJSON.data[i][1];                    // urban or rural
    let mmddyy = fileContentJSON.data[i][2];                  // date collected
    let season = fileContentJSON.data[i][3];                  // season collected
    let totalFragPlastic = fileContentJSON.data[i][4];        // Total Fragmented Plastic	
    let totalPlasticProducts = fileContentJSON.data[i][5];    // Total Plastic Products
    let totalFoodWrap = fileContentJSON.data[i][6];           // Total Food Wrappers
    let totalStyro = fileContentJSON.data[i][7];              // Total Styrofoam
    let totalCigButts = fileContentJSON.data[i][8];           // Total Cigarette Butts
    let totalPaper = fileContentJSON.data[i][9];              // Total Paper/ Treated Wood
    let totalMetal = fileContentJSON.data[i][10];             // Total Metal	
    let totalGlass = fileContentJSON.data[i][11];             // Total Glass
    let totalFabric = fileContentJSON.data[i][12];            // Total Fabric
    let totalRubber = fileContentJSON.data[i][13];            // Total Rubber
    let totalOther = fileContentJSON.data[i][14];             // Total Other	
    let totalDebris = fileContentJSON.data[i][15];            // TOTAL DEBRIS	
    let totalDebrisDivMsq = fileContentJSON.data[i][16];      // Total Debris per M2
    let notes = fileContentJSON.data[i][17];                  // Notes

    let respStatus;
    //console.log("loop in func "+ i);
    await fetch('http://localhost:3001/lml_debris_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        beach, type, season, mmddyy, 
        totalFragPlastic, 
        totalPlasticProducts,
        totalFoodWrap,
        totalStyro,
        totalCigButts,
        totalPaper,
        totalMetal,
        totalGlass,
        totalFabric,
        totalRubber, 
        totalOther,
        totalDebris,
        totalDebrisDivMsq,
        notes
      }),
    })
      .then(response => {
        if(!response.ok){
          response.text().then(function (text) {
            console.log(text);
            // uploadErrorRows.push(i)
            // updateUploadErrorRows(uploadErrorRows)
            // TODO NOT SURE WHICH ABOVE WORKS, OR COMBINATION OF ABOVE
          });
        }
      })
  }
 
  // DELETE call and remove the row specified by id via user input
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

  // DELETE call with no parameters, removing every row from the datatable
  function ClearDebrisDataTable() {
    fetch(`http://localhost:3001/lml_debris_data`, {
      method: 'DELETE'
    })
    .then(response => {
      return response.text();
    })
    .then(data => {
      // alert(data);
      setDebrisData(undefined);
      getDebrisData();
    });
  }

  function dataToArray(){
    let debrisDataArray = []
    if(debrisData){
      for(var i=0; i < debrisData.length; i++){
        debrisDataArray[i] = [
          debrisData[i].entry_id, 
          debrisData[i].beach, 
          debrisData[i].type, 
          debrisData[i].season,
          debrisData[i].date, 
          debrisData[i].total_fragmented_plastic, 
          debrisData[i].total_plastic_products, 
          debrisData[i].total_food_wrappers,
          debrisData[i].total_styrofoam, 
          debrisData[i].total_cigarette_butts, 
          debrisData[i].total_paper_and_treated_wood, 
          debrisData[i].total_metal,
          debrisData[i].total_glass, 
          debrisData[i].total_fabric, 
          debrisData[i].total_rubber, 
          debrisData[i].total_other,
          debrisData[i].total_debris,
          debrisData[i].total_debris_divby_m_sq, 
          debrisData[i].notes
        ]
        debrisDataArray[i] = debrisDataArray[i].map((row) => 
          row = row + " "
        );
      }
      debrisDataArray = debrisDataArray.map((row) => 
        <li>{row}</li>
      );
      return debrisDataArray;
    }
  }
  
  return (
    <div>
        <div>
        <ol> {uploadErrorRows} </ol>
        {fetchLoading === true ? 
          <div>
            Uploading your file! <br/>
            <img Style="hieght:10%; width:10%;" src={loadIcon} alt="loading..." /> 
          </div> 
          :
          <div>
            <div class="uploadCSVtoCache">
              <h1>Upload CSV Data</h1>
              <form>
                <input type={"file"} id={"csvFileInput"} accept={".csv"} onChange={handleOnChange} />
                <button onClick={(e) => {handleOnSubmit(e);}} >SUBMIT</button>
                {uploadLoading === true ? <p>LOADING</p> : <p> NOT LOADING</p>}
              </form>
            </div>
            <br/>

            <button type="button" className="btn btn-outline-primary" onClick={postDebrisData}>Add Debris Data Entry</button>
            <br/>
          
            {!debrisData ? 'There is no debrisData available' : <ol> {dataToArray()} </ol>}
        </div>
        }
      </div>
    </div>
  );
}

export default UploadCSV
