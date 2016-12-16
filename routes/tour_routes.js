var express = require('express');
var router = express.Router();
var tour_dal = require('../model/tour_dal');
var country_dal = require('../model/country_dal');


// View All Bands
router.get('/all', function(req, res) {
    tour_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('tour/tourViewAll', { 'result':result });
        }
    });

});

// View the tour for the given name
router.get('/', function(req, res){
    if(req.query.tour_name == null) {
        res.send('tour_name is null');
    }
    else {
        tour_dal.getById(req.query.tour_name, function(err,result) {
            if (err) {
                res.send(err);

            }

            else {

                //Everything below is to avoid duplicates
                countrys = [result.length];
                headliners = [result.length];
                start_years = [result.length];
                end_years = [result.length];
                start_months = [result.length];
                end_months = [result.length];
                tour_names = [result.length];

                for (var i = 0; i < result.length; i++) {
                        headliners[i] = result[i].headliner;
                    }

                    for (var i = 0; i < result.length; i++) {
                        start_years[i] = result[i].start_year;
                    }

                    for (var i = 0; i < result.length; i++) {
                        end_years[i] = result[i].end_year;
                        }

                    headliners = headliners.filter(function (elem, index, self) {
                        return index == self.indexOf(elem);
                    });

                    start_years = start_years.filter(function (elem, index, self) {
                        return index == self.indexOf(elem);
                    });

                    end_years = end_years.filter(function (elem, index, self) {
                        return index == self.indexOf(elem);
                    });

                    for (var i = 0; i < result.length; i++) {
                            start_months[i] = result[i].start_month;
                    }

                    for (var i = 0; i < result.length; i++) {
                        end_months[i] = result[i].end_month;
                    }

                    for (var i = 0; i < result.length; i++) {
                        tour_names[i] = result[i].tour_name;
                    }

                    start_months = start_months.filter(function (elem, index, self) {
                        return index == self.indexOf(elem);
                    });

                    end_months = end_months.filter(function (elem, index, self) {
                        return index == self.indexOf(elem);
                    });

                    var tour_names = tour_names.filter(function (elem, index, self) {
                        return index == self.indexOf(elem);
                    });

                    for (var i = 0; i < result.length; i++) {
                        countrys[i] = result[i].country_name;
                    }

                    countrys = countrys.filter(function (elem, index, self) {
                        return index == self.indexOf(elem);
                    });


                res.render('tour/tourViewById', {
                    'result': result,
                    "headliner": headliners,
                    "start_year": start_years,
                    "start_month": start_months,
                    "end_year": end_years,
                    "end_month": end_months,
                     "tour_name": tour_names,
                    "country_name": countrys

                });
            }
        });
    }
});

// Return the add a new tour form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    country_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            country_dal.getAll(function (err, result1) {
                if (err) {
                    res.send(err)
                }
                else {
                    res.render('tour/tourAdd', {'tour': result, 'countrya': result1 });
                }
            });
        }
    });
});

router.get('/insert', function(req, res){
    // simple validation
    if(req.query.tour_name == null) {
        res.send('A tourName must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        tour_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/tour/all');
            }
        });
    }
});


/*
 router.get('/edit', function(req, res){
 if(req.query.tour_name == null) {
 res.send('A tour is required');
 }
 else {
 tour_dal.getById(req.query.tour_name, function(err, company){
 guitarist_dal.getAll(function(err, address) {
 res.render('tour/tourUpdate', {tour_name: tour[0], address: address});
 });
 });
 }

 });*/

// Delete a tour
router.get('/delete', function(req, res){
    if(req.query.tour_name == null) {
        res.send('tour_name is null');
    }
    else {
        tour_dal.delete(req.query.tour_name, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/tour/all');
            }
        });
    }
});



module.exports = router;
