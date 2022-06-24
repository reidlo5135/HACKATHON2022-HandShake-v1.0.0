const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbinfo = require('../../env/dbEnv');
const connection = mysql.createConnection(dbinfo);

router.post('/api/campus/gates', (req, res) => {
   connection.query('SELECT * FROM tbl_gateway', (error, rows, fields) => {
      if(error) throw error;
      console.log('CampusRouter DB INFO gates rows : ' + JSON.stringify(rows));
      res.send(rows);
   })
});

module.exports = router;