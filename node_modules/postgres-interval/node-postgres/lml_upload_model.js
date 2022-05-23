const pool = require('./dbConnect.js');

// Query file uploads
const getUploads = () => {
  return new Promise(function(resolve, reject) {
    const text = "SELECT * FROM lml_uploads ORDER BY date_uploaded DESC "
    pool.query(text, (error, results) => {
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

//Update file upload info (currently only one file exists)
const updateUpload = (file_name, uploader) => {
    return new Promise(function(resolve, reject) {
      const text = "UPDATE lml_uploads SET file_name = $1, uploader = $2, date_uploaded = CURRENT_TIMESTAMP"
      const values = [file_name, uploader];
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


//Insert file upload info (currently only one file exists)
const insertUpload = (file_name, uploader) => {
  return new Promise(function(resolve, reject) {
    const text = "INSERT INTO lml_uploads (file_name, uploader) SELECT $1, $2 WHERE NOT EXISTS (SELECT * FROM lml_uploads)"
    const values = [file_name, uploader];
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


module.exports = {
    getUploads,
    updateUpload,
    insertUpload
}