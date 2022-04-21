const Pool = require('pg').Pool
const pool = new Pool({
  user: 'lml_user',
  host: 'localhost',
  database: 'lml_database',
  password: 'wave',
  port: 5432,
});

const createAdmin = (body) => {
    return new Promise(function(resolve, reject) {
      const {email, password, name, isSuper, dateCreated} = body
  
      pool.query('INSERT INTO lml_admin (email, password, name, isSuper, created_on) VALUES ($1, $2, $3, $4, $5) RETURNING * ',
        [email, password, name, isSuper, dateCreated], (error, results) => {

        if (error) {
          reject(error)
        }
        if(results){
          resolve(`A new lml entry has been added added: ${JSON.stringify(results.rows[0])}`)
        }
      })
    })
}

const getAdmin = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM lml_admins ORDER BY admin_id ASC', (error, results) => {
      if (error) {
        console.log("cannot get admin data");
        reject(error)
      }
      if(results){
        resolve(results.rows);
      }
    })
  }) 
}

const deleteAdmin = (AdminID) => {
  return new Promise(function(resolve, reject) {
    const admin_id = parseInt(AdminID)
    pool.query('DELETE FROM lml_admins WHERE admin_id = $1', [admin_id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Admin removed with ID: ${admin_id}`)
    })
  })
}

const clearAdmin = () => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM lml_admins', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`All Admins Deleted`);
    })
  })
}

module.exports = {
    getAdmin,
    createAdmin,
    deleteAdmin,
    clearAdmin
}