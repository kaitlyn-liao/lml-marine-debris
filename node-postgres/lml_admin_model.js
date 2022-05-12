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
    pool.query('SELECT * FROM lml_admins ORDER BY admin_id ASC', (error, results) => {
      if (error) {
        console.log(error);
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
  console.log("in lml_admin_model")
  return new Promise(function(resolve, reject) {
    const {name, email, pword} = body
    const isSuper = false
    const date = '3/3/2022'

    pool.query('INSERT INTO lml_admins (email, password, name, issuper, created_on) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
      [email, pword, name, isSuper, date], 
      (error, results) => {
      if (error) {
        console.log("failed attempt")
        console.log(error)
        reject(error)
      }
      if(results){
        resolve(`A new lml admin has been added added: ${JSON.stringify(results.rows[0])}`)
      }
    })
  })
}

const deleteAdmin = (DebrisDataId) => {
  return new Promise(function(resolve, reject) {
    const entry_id = parseInt(DebrisDataId)
    pool.query('DELETE FROM lml_admins WHERE entry_id = $1', [entry_id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Admin removed with email: ${entry_id}`)
    })
  })
}

module.exports = {
    getAdmin,
    createAdmin,
    deleteAdmin,
}