/**
 * Created by danny on 12/10/16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Band and Tours Database', subtitle: 'By Daniel Thompson' });
});

module.exports = router;
