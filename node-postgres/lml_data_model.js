require('dotenv').config()

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.REACT_APP_DBUSER, //'lml_user',
  host: process.env.REACT_APP_HOST, //'localhost',
  database: process.env.REACT_APP_DBNAME, //'lml_database',
  password: process.env.REACT_APP_DBPASSWORD, //'wave',
  port: 5432,
});

// TODO: 
const getDebrisData = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM lml_debris_data ORDER BY entry_id ASC', (error, results) => {
      if (error) {
        console.log("cannot get debris data");
        reject(error)
      }
      if(results){
        resolve(results.rows);
      }
    })
  }) 
}

const getBeachDebrisData = (beach) => {
  // console.log(beach)
  return new Promise(function(resolve, reject) {
    const text = "SELECT * FROM lml_debris_data WHERE beach = $1 ORDER BY entry_id ASC";
    const values = [beach];
    pool.query(text, values, (error, results) => {
      if (error) {
        console.log("cannot get debris data");
        reject(error)
      }
      if(results){
        resolve(results.rows);
      }
    })
  }) 
}

// Query a specific beach's debris data by season
const getBeachDebrisDataBySeason = (beach, season) => {
  // console.log(beach + season)
  return new Promise(function(resolve, reject) {
    const text = "SELECT * FROM lml_debris_data WHERE beach = $1 AND season = $2 ORDER BY entry_id ASC";
    const values = [beach, season];
    pool.query(text, values, (error, results) => {
      if (error) {
        console.log("cannot get debris data");
        reject(error)
      }
      if(results){
        resolve(results.rows);
      }
    })
  }) 
}

// Query all beach's debris data by season
const getAllBeachDebrisDataBySeason = (season) => {
  console.log(season)
  return new Promise(function(resolve, reject) {
    const text = "SELECT * FROM lml_debris_data WHERE season = $1 ORDER BY entry_id ASC";
    const values = [season];
    pool.query(text, values, (error, results) => {
      if (error) {
        console.log("cannot get debris data");
        reject(error)
      }
      if(results){
        resolve(results.rows);
      }
    })
  }) 
}

// Query all urban beach's debris data
const getUrbanBeachDebrisData = () => {
  return new Promise(function(resolve, reject) {
    const text = "SELECT * FROM lml_debris_data WHERE type = 'U' ORDER BY entry_id ASC";
    pool.query(text, (error, results) => {
      if (error) {
        console.log("cannot get debris data");
        reject(error)
      }
      if(results){
        resolve(results.rows);
      }
    })
  }) 
}

// Query all rural beach's debris data
const getRuralBeachDebrisData = () => {
  return new Promise(function(resolve, reject) {
    const text = "SELECT * FROM lml_debris_data WHERE type = 'R' ORDER BY entry_id ASC";
    pool.query(text, (error, results) => {
      if (error) {
        console.log("cannot get debris data");
        reject(error)
      }
      if(results){
        resolve(results.rows);
      }
    })
  }) 
}

// Query all urban beach names
const getUrbanBeach = () => {
  return new Promise(function(resolve, reject) {
    const text = "SELECT DISTINCT beach FROM lml_debris_data WHERE type = 'U' ORDER BY beach ASC";
    pool.query(text, (error, results) => {
      if (error) {
        console.log("cannot get debris data");
        reject(error)
      }
      if(results){
        resolve(results.rows);
      }
    })
  }) 
}

// Query all rural beach names
const getRuralBeach = () => {
  return new Promise(function(resolve, reject) {
    const text = "SELECT DISTINCT beach FROM lml_debris_data WHERE type = 'R' ORDER BY beach ASC";
    pool.query(text, (error, results) => {
      if (error) {
        console.log("cannot get debris data");
        reject(error)
      }
      if(results){
        resolve(results.rows);
      }
    })
  }) 
}

// TODO: change pool.query to fit correct headers
const createDebrisData = (body) => {
  return new Promise(function(resolve, reject) {
    const {
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
    } = body

    pool.query('INSERT INTO lml_debris_data'+
                ' ('+
                ' beach,'+
                ' type,'+
                ' season,'+
                ' date,'+
                ' total_fragmented_plastic,'+
                ' total_plastic_products,'+
                ' total_food_wrappers,'+
                ' total_styrofoam,'+
                ' total_cigarette_butts,'+
                ' total_paper_and_treated_wood,'+
                ' total_metal,'+
                ' total_glass,'+

                ' total_fabric,'+
                ' total_rubber,'+
                ' total_other,'+
                ' total_debris,'+

                ' total_debris_divby_m_sq,'+
                ' notes'+
                ')' +

                ' VALUES ('+ 
                ' $1, $2, $3, $4,'+
                ' $5, $6, $7, $8, '+
                ' $9, $10, $11, $12, '+
                ' $13, $14, $15, $16, '+
                ' $17, $18' +
                ' ) RETURNING * ', 
                
                [ beach, type, season, mmddyy,
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
                ], (error, results) => {
      if (error) {
        reject(error)
      }
      if(results){
        resolve(`A new lml entry has been added added: ${JSON.stringify(results.rows[0])}`)
      }
    })
  })
}

// TODO: 
const deleteDebrisData = (DebrisDataId) => {
  return new Promise(function(resolve, reject) {
    const entry_id = parseInt(DebrisDataId)
    pool.query('DELETE FROM lml_debris_data WHERE entry_id = $1', [entry_id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Debris Data deleted with ID: ${entry_id}`)
    })
  })
}

const clearDebrisData = () => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM lml_debris_data', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Debris Data emptied`);
    })
  })
}

module.exports = {
     getDebrisData,
     getBeachDebrisData,
     getBeachDebrisDataBySeason,
     getAllBeachDebrisDataBySeason,
     getUrbanBeachDebrisData,
     getRuralBeachDebrisData,
     getUrbanBeach,
     getRuralBeach,
  createDebrisData,
  deleteDebrisData,
  clearDebrisData,
}