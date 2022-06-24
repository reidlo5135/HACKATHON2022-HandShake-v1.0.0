const express = require('express');
const router = express.Router();

router.get('/api/test', (req, res) => {
   res.send({'data':'HI!!!!!!'});
});

module.exports = router;