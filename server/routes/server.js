const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbinfo = require('../env/dbEnv');
const connection = mysql.createConnection(dbinfo);

router.get('/api/db/test', (req, res) => {
   connection.query('SELECT * FROM testTable', (error, rows, fields) => {
      if(error) throw error;
      console.log('TEST DB INFO rows : ' + JSON.stringify(rows));
      console.log('TEST DB INFO fields : ' + JSON.stringify(fields));
      res.send(rows);
   });
});

module.exports = router;