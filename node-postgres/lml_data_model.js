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
    pool.query('SELECT * FROM lml_debris_data', (error, results) => {
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
    const { name, email } = body
    pool.query('INSERT INTO lml_debris_data (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
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
    const id = parseInt(DebrisDataId)
    pool.query('DELETE FROM lml_debris_data WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Debris Data deleted with ID: ${id}`)
    })
  })
}

module.exports = {
     getDebrisData,
  createDebrisData,
  deleteDebrisData,
}