const express = require('express')
const app = express()
const port = 3001

// ---------------------------- 
// Test code to manually parse through the csv file 
// that is given to us via Sponsor Sprint 2

// const merchant_model = require('./merchant_model');
const lml_data_model = require('./lml_data_model.js');

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  lml_data_model.getDebrisData()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/lml_debris_data', (req, res) => {
  lml_data_model.createDebrisData(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/lml_debris_data/:id', (req, res) => {
  lml_data_model.deleteDebrisData(req.params.id)
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