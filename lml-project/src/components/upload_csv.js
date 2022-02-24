// A file used to test the implimentation of uploading a csv file into the PostgreSQL Database

import React from 'react';

function Upload_CSV() {
  const [uploadFile, setUploadFile] = React.useState();
  
  const accept_file = (event) => {
    event.preventDefault();
    console.log("uploadFile", uploadFile);
  };

  return (
    <div>
      <form onSubmit={accept_file}>
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
    </div>
  );
}

// old attempt
{
//  class Upload_CSV extends React.Component {
//   constructor(props) {
//     super(props)
//     this.uploadFile = this.uploadFile.bind(this);
//   }

//   uploadFile(event) {
//     let file = event.target.files[0];
//     console.log(file);
    
//     if (file) {
//       let data = new FormData();
//       data.append('file', file);
//       // axios.post('/files', data)...
//     }
//   }

//   render(){
//     return(
//       <span>
//         <input className="csv-input" type="file" id="react-csv-reader-input" accept=".csv, text/csv" name="myFile" onChange={this.uploadFile} ></input>
        
//       </span>
//     );
//   }

// }
}

export default Upload_CSV


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
