const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   res.send('HI!!!!!!');
});

router.post('/hello', (req, res) => {
   const serverid = req.body.id;
    console.log(serverid);
});

module.exports = router;