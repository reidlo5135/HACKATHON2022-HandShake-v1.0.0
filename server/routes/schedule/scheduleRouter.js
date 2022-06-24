const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbinfo = require('../../env/dbEnv');
const connection = mysql.createConnection(dbinfo);

router.post('/api/schedule/all', (req, res) => {
   try {
        connection.query('SELECT * FROM tbl_schedule', (error, result) => {
            if(error) throw error;
            console.log('ScheduleRouter DB INFO all Schedule rows : ' + JSON.stringify(result));
            res.send(result);
        })
   } catch (error) {
       console.error(error);
   }
});

module.exports = router;