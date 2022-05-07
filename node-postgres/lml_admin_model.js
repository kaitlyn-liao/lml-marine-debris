const Pool = require('pg').Pool
const pool = new Pool({
  user: 'lml_user',
  host: 'localhost',
  database: 'lml_database',
  password: 'wave',
  port: 5432,
});

// TODO: 
const getAdmin = () => {
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

// TODO: 
const createAdmin = (body) => {
  return new Promise(function(resolve, reject) {
    const {} = body

    pool.query('', [ ], (error, results) => {
      if (error) {
        reject(error)
      }
      if(results){
        resolve(`A new lml entry has been added added: ${JSON.stringify(results.rows[0])}`)
      }
    })
  })
}

const deleteAdmin = (DebrisDataId) => {
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
    getAdmin,
    createAdmin,
    deleteAdmin,
}