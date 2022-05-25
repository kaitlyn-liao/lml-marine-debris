// A file used to test the implimentation of uploading a csv file into the PostgreSQL Database

import React, {useState,useEffect} from 'react';

function UploadAdmin() {

  // reads throuh the file submission and changes state setdataToDB to raw csv text
  const handleOnSubmit = (e) => {
    
  };

  // Communicate with database server
  // debrisData stores the result of a GET call from the data table
  // setDebrisData sets the value of debrisData
  const [adminData, setAdminData] = useState(false);
  useEffect(() => { getAdminData(); }, []);

  
  // GET call to display updated version of data table
  function getAdminData() {
    fetch(`/`)
      .then(response => response.json())
      .then(data => { setAdminData(data);});
  }

  // Calls createDesbrisData() until every row of the CSV file is POSTed
  async function postAdminData() {
    // loop for future use of adding in every row into the database, do be filtered by checking for new entries
    await fetch('/lml_admins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({}),
    })
      .then(response => {
        if(!response.ok){
          response.text().then(function (text) {
            console.log(text);
          });
        }
      })
    getAdminData();
  }
 
  // DELETE call and remove the row specified by id via user input
  function deleteAdminData() {
    let admin_id = prompt('Enter debris entry_id');
    fetch(`/lml_admins/${admin_id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        // alert(data);
        getAdminData();
      });
  }

  // DELETE call with no parameters, removing every row from the datatable
  function ClearAdminDataTable() {
    fetch(`/lml_admins`, {
      method: 'DELETE'
    })
    .then(response => {
      return response.text();
    })
    .then(data => {
      alert(data);
      setAdminData(undefined);
      getAdminData();
    });
  }

  function dataToArray(){
    let adminDataArray = []
    if(adminData){
      for(var i=0; i < adminData.length; i++){
        adminDataArray[i] = [
          adminData[i].notes
        ]
        adminDataArray[i] = adminDataArray[i].map((row) => 
          row = row + " "
        );
      }
      adminDataArray = adminDataArray.map((row) => 
        <li>{row}</li>
      );
      return adminDataArray;
    }
  }
  
  return (
    <div>
      <div class="uploadCSVtoCache">
        <h1>ADMIN DATABASE</h1>
        <form>
          {/* <input type="file" id="csvFileInput" accept=".csv" onChange={handleOnChange} /> */}
          {/* <button onClick={(e) => { handleOnSubmit(e); }} >SUBMIT</button> */}
        </form>
      </div>
      <br/>

      {/* <button onClick={handleReadString}>Upload CSV Data</button> */}
      <button type="button" className="btn btn-outline-primary" onClick={postAdminData}>Add Debris Data Entry</button>
      <button type="button" className="btn btn-outline-warning" onClick={deleteAdminData}>Delete Debris Data Entry</button>
      <button type="button" className="btn btn-outline-warning" onClick={ClearAdminDataTable}>EMPTY Debris Data Entry</button>
      <br/>
      {/* {!debrisData ? 'There is no debrisData available' : 
        <ol>
          {dataToArray()}
        </ol>
      } */}
      {/* {beachRows == [] ? 'beachRows[0].beach' : 'There is no debrisData available'} */}
      <p/>    
    </div>
  );
}

export default UploadAdmin