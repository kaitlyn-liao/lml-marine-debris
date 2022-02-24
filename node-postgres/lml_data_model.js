const Pool = require('pg').Pool
const pool = new Pool({
  user: 'lml_user',
  host: 'localhost',
  database: 'lml_database',
  password: 'wave',
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

// TODO: change pool.query to fit correct headers
const createDebrisData = (body) => {
  return new Promise(function(resolve, reject) {
    const {Beach, Mentor, Type, Season, MMDDYY, MesoFragmentedPlastic } = body
    pool.query('INSERT INTO lml_debris_data' +
                '(beach, mentor, type, season, date, meso_fragmented_plastic)' +
                ' VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
                [Beach, Mentor, Type, Season, MMDDYY, MesoFragmentedPlastic], (error, results) => {
      if (error) {
        reject(error)
      }
      if(results){
        resolve(`A new lml entry has been added added: ${results.rows[0]}`)
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

module.exports = {
     getDebrisData,
  createDebrisData,
  deleteDebrisData,
}