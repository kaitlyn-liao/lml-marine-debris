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

// -------------------------------------------------------- Admin data table calls

// get all debris data from lml_admin_data
app.get('/lml_admins/getAdmins', (req, res) => {
  lml_admin_model.getAdmin(req)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// Delete a specified row out the lml_admin_data table
// take in a string email and find that user
app.delete('/lml_admins/removeAdmin/:admin_id', (req, res) => {
  lml_admin_model.deleteAdmin(req.params.admin_id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// Enter a new row into lml_debris_data
app.post('/lml_admins/newAdmin', (req, res) => {
  console.log("in index.js")
  console.log(req.body)
  lml_admin_model.createAdmin(req.body)

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
  //console.log(req.params.beach + req.params.season);
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