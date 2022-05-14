const pool = require('./dbConnect.js');
const crypto = require('crypto');

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

// Query specific admin 
const checkAdmin = (username, password) => {
  return new Promise(function(resolve, reject) {
    const text = "SELECT EXISTS( SELECT * FROM lml_admins WHERE userid = $1 AND password = $2)"
    const values = [username, password]
    pool.query(text, values, (error, results) => {
      if (error) {
        console.log(error);
        reject(error)
      }
      if(results){
        resolve(results.rows[0]);
      }
    })
  }) 
}


// TODO: 
const createAdmin = (body) => {
  console.log("in lml_admin_model")
  const {name, userid, pword} = body
  const isSuper = false
  const date = '3/3/2022'
  // console.log(crypt.crypt(pword))

  return new Promise(function(resolve, reject) {
    pool.query('INSERT INTO lml_admins (userid, password, name, issuper, created_on) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
      [userid, pword, name, isSuper, date], 
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

const deleteAdmin = (AdminID) => {
  return new Promise(function(resolve, reject) {
    const admin_id = AdminID
    console.log(admin_id)
    pool.query('DELETE FROM lml_admins WHERE userid = $1', [admin_id], (error, results) => {
      if (error) {
        console.log("failed attempt")
        console.log(error)
        reject(error)
      }
      resolve(`Admin removed with userID: ${admin_id}`)
    })
  })
}

module.exports = {
    getAdmin,
    checkAdmin,
    createAdmin,
    deleteAdmin,
}