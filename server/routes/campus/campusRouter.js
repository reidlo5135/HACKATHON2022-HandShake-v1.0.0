const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbinfo = require('../../env/dbEnv');
const connection = mysql.createConnection(dbinfo);

router.post('/api/campus/gates', (req, res) => {
   connection.query('SELECT * FROM tbl_gateway', (error, result) => {
      if(error) throw error;
      console.log('CampusRouter DB INFO gates rows : ' + JSON.stringify(result));
      res.send(result);
   })
});

router.post('/api/campus/gates/details/:name', (req, res) => {
   const name = req.params.name;
   connection.query(`SELECT * FROM tbl_gateway_${name}`, (error, result) => {
      if(error) throw error;
      console.log('CampusRouter DB INFO gates details name : ' + name);
      console.log('CampusRouter DB INFO gates details result : ' + JSON.stringify(result));
      res.send(result);
   });
});

module.exports = router;