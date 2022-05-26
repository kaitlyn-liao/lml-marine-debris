const pool = require('./dbConnect.js');
// var CryptoJS = require("crypto-js");

// Query specific admin info based on username
const getAdminInfo = (username) => {
  return new Promise(function(resolve, reject) {
    const text = "SELECT * FROM lml_admins WHERE userid = $1"
    const values = [username]
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
const getAllAdmin = () => {
  return new Promise(function(resolve, reject) {
    const text = "SELECT * FROM lml_admins;"
    const values = []
    pool.query(text, values, (error, results) => {
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

// returns all info of a user based on username
const getAdmin = (username) => {
  return new Promise(function(resolve, reject) {
    const text = "SELECT * FROM lml_admins WHERE userid NOT IN (SELECT userid FROM lml_admins WHERE userid = $1);"
    const values = [username]
    pool.query(text, values, (error, results) => {
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

// returns true if attempt is username's password
const checkAdmin = (username, attempt) => {
  return new Promise(function(resolve, reject) {
    const text = "SELECT password FROM lml_admins WHERE userid = $1;"
    const values = [username]
    pool.query(text, values, (error, results) => {
      if (error) {
        console.log(error);
        reject(error)
      }
      else if(results){
        resolve(results.rows);
      }
    })
  }) 
}

// Query the existence of a specific admin 
const checkUserID = (userid) => {
  return new Promise(function(resolve, reject) {
    const text = "SELECT EXISTS( SELECT * FROM lml_admins WHERE userid = $1)"
    const values = [userid]
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

// Add a new admin user to the datatable
const createAdmin = (body) => {
  const {name, userid, pword} = body
  const isSuper = false
  // TODO

  return new Promise(function(resolve, reject) {
    pool.query('INSERT INTO lml_admins (userid, password, name, issuper) VALUES ($1, $2, $3, $4) RETURNING *', 
      [userid, pword, name, isSuper], 
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

// remove admin from data table
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

// Set userID's issuper status to true
const giveSuperStatus = (userID) => {
  // console.log("in giveSuperStatus")
  const userid = userID
  return new Promise(function(resolve, reject) {
    pool.query('UPDATE lml_admins SET issuper = TRUE WHERE userid = $1;', [userid], 
      (error, results) => {
      if (error) {
        console.log(error)
        reject(error)
      }
      if(results){
        resolve(`Toggled user's super status to super: ${JSON.stringify(results.rows[0])}`)
      }
    })
  })
}

// Add a new admin user to the datatable
const loseSuperStatus = (userID) => {
  console.log("in giveSuperStatus")
  const userid = userID
  return new Promise(function(resolve, reject) {
    pool.query('UPDATE lml_admins SET issuper = FALSE WHERE userid = $1;', [userid], 
      (error, results) => {
      if (error) {
        console.log(error)
        reject(error)
      }
      if(results){
        resolve(`Toggled user's super status to super: ${JSON.stringify(results.rows[0])}`)
      }
    })
  })
}

module.exports = {
    getAdmin,
    getAllAdmin,
    getAdminInfo,
    checkAdmin,
    checkUserID,
    createAdmin,
    deleteAdmin,
    giveSuperStatus,
    loseSuperStatus
}