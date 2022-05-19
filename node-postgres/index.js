const { response } = require('express');
const path = require('path');
const express = require('express')
const app = express()
const port = process.env.PORT || 3001; // Load from .env file

// ---------------------------- 
// Test code to manually parse through the csv file 
// that is given to us via Sponsor Sprint 2

// const merchant_model = require('./merchant_model');
const lml_data_model = require('./lml_data_model.js');
const lml_admin_model = require('./lml_admin_model.js');
const lml_upload_model = require('./lml_upload_model.js')

app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../lml-project/build')));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});


app.get('/', (req, res) => {
  lml_admin_model.getAdmin(req)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// -------------------------------------------------------- Upload Data table calls

// get all upload data from lml_upload
app.get('/lml_uploads/getUploads', (req, res) => {
  lml_upload_model.getUploads(req)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// update upload (currently only one file exists in database)
app.post('/lml_uploads/updateUpload/:file_name/:uploader', (req, res) => {
  lml_upload_model.updateUpload(req.params.file_name, req.params.uploader, req.params.date_uploaded)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// -------------------------------------------------------- Admin data table calls

// get all debris data from lml_admin_data
app.get('/lml_admins/getAdmins/:userID', (req, res) => {
  lml_admin_model.getAdmin(req.params.userID)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// Get specific info of one admin
app.get('/lml_admins/getAdminInfo/:userID', (req, res) => {
  lml_admin_model.getAdminInfo(req.params.userID)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// Check if userID and password exists in lml_admins
app.get('/lml_admins/checkAdmins/:userID/:password', (req, res) => {
  lml_admin_model.checkAdmin(req.params.userID, req.params.password)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// Check if userID and password exists in lml_admins
app.get('/lml_admins/checkUserID/:userID', (req, res) => {
  lml_admin_model.checkUserID(req.params.userID)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// Delete a specified row out the lml_admin_data table
// take in a string userID and find that user
app.delete('/lml_admins/:userID', (req, res) => {
  lml_admin_model.deleteAdmin(req.params.userID)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// Enter a new row into lml_debris_data
app.post('/lml_admins/newAdmin', (req, res) => {
  lml_admin_model.createAdmin(req.body)

  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// change the isssuper status of userid to true
app.post('/lml_admins/giveSuper/:userID', (req, res) => {
  lml_admin_model.giveSuperStatus(req.params.userID)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// change the isssuper status of userid to false
app.post('/lml_admins/loseSuper/:userID', (req, res) => {
  lml_admin_model.loseSuperStatus(req.params.userID)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// -------------------------------------------------------- Debris data table calls 

// get all debris data from lml_debris_data
app.get('/data', (req, res) => {
  lml_data_model.getDebrisData(req.params.beach)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// get a single beach debris data from lml_debris_data
app.get('/beach/:beach', (req, res) => {
  lml_data_model.getBeachDebrisData(req.params.beach)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// get a single beach debris data by season from lml_debris_data
app.get('/beach/:beach/season/:season', (req, res) => {
  lml_data_model.getBeachDebrisDataBySeason(req.params.beach, req.params.season)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// get all beach debris data by season from lml_debris_data
app.get('/season/:season', (req, res) => {
  lml_data_model.getAllBeachDebrisDataBySeason(req.params.season)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// get all urban beach debris data from lml_debris_data
app.get('/urban', (req, res) => {
  lml_data_model.getUrbanBeachDebrisData()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// get all rural beach debris data from lml_debris_data
app.get('/rural', (req, res) => {
  lml_data_model.getRuralBeachDebrisData()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// get list of all urban beaches (to display on drop-down)
app.get('/urban_list', (req, res) => {
  lml_data_model.getUrbanBeach()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// get list of all rural beaches (to display on drop-down)
app.get('/rural_list', (req, res) => {
  lml_data_model.getRuralBeach()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// Enter a new row into lml_debris_data
app.post('/lml_debris_data', (req, res) => {
  lml_data_model.createDebrisData(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// Delete a specified row out the lml_debris_data table
app.delete('/lml_debris_data/:entry_id', (req, res) => {
  lml_data_model.deleteDebrisData(req.params.entry_id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// Empty out the entire lml_debris_data table
app.delete('/lml_debris_data', (req, res) => {
  lml_data_model.clearDebrisData(req.params)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})