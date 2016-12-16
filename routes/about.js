/**
 * Created by danny on 12/10/16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'BANDS UNLIMITED',
        subtitle: 'A COMPANY DEDICATED TO KEEPING TRACK OF BANDS AND THEIR TOURS' });
});

module.exports = router;
