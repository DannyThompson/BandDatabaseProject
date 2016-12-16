var express = require('express');
var router = express.Router();
router.get('/all', function(req, res) {
            res.render('about/aboutView')
});



module.exports = router;