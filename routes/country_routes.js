var express = require('express');
var router = express.Router();
var country_dal = require('../model/country_dal');



router.get('/all', function(req, res) {
    country_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('country/countViewAll', { 'result':result });
        }
    });

});

router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    country_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('country/countryAdd', {'country': result});
        }
    });
});

router.get('/insert', function(req, res){
    // simple validation
    if(req.query.country_name == null) {
        res.send('A country must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        country_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                res.redirect(302, '/country/all');
            }
        });
    }
});



router.get('/delete', function(req, res){
    if(req.query.country_name == null) {
        res.send('country_name is null');
    }
    else {
        country_dal.delete(req.query.country_name, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/country/all');
            }
        });
    }
});



module.exports = router;
