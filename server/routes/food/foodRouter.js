const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbinfo = require('../../env/dbEnv');
const connection = mysql.createConnection(dbinfo);

router.post('/ap1/food/all', (req, res) => {
   connection.query('SELECT * FROM tbl_food', (error, rows, fields) => {
      if(error) throw error;
       console.log('FoodRouter DB INFO all Food rows : ' + JSON.stringify(rows));
       res.send(rows);
   });
});

module.exports = router;