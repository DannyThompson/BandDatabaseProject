var express = require('express');
var router = express.Router();
var band_dal = require('../model/band_dal');
var guitarist_dal = require('../model/guitarist_dal');


// View All Bands
router.get('/all', function(req, res) {
    band_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('band/bandViewAll', { 'result':result });
        }
    });

});

// View the band for the given name
router.get('/', function(req, res){
    if(req.query.band_name == null) {
        res.send('band_name is null');
    }
    else {
        band_dal.getById(req.query.band_name, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                singers = [result.singer];
                bassists = [result.bassist];
                drummers = [result.drummer];
                guitaristsz = [result.guitarist];
                tours = [result.tour_name];

                console.log(result);
                for (var i = 0; i < 1; i++) {
                    singers[i] = result[i].singer;
                }

                for (var i = 0; i < result.length; i++) {
                    bassists[i] = result[i].bassist;
                }

                for (var i = 0; i < result.length; i++) {
                    drummers[i] = result[i].drummer;
                }

                for (var i = 0; i < result.length; i++) {
                    guitaristsz[i] = result[i].guitarist;
                }

                for (var i = 0; i < result.length; i++) {
                    tours[i] = result[i].tour_name;
                }

                singers = singers.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                });

                bassists = bassists.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                });

                drummers = drummers.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                });

                tours = tours.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                });

                guitaristsz = guitaristsz.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                });

                res.render('band/bandViewById', {'result': result,
                "singer": singers,
                "bassist": bassists,
                "drummer": drummers,
                "tours": tours,
                "guitarist": guitaristsz});
            }
        });
    }
});

// Return the add a new band form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    band_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('band/bandAdd', {'band': result});
        }
    });
});

router.get('/insert', function(req, res){
    // simple validation
    if(req.query.band_name == null) {
        res.send('A bandName must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        band_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                res.redirect(302, '/band/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.band_name == null) {
        res.send('A band name is required');
    }
    else {
        band_dal.edit(req.query.band_name, function(err, result){
                console.log(result[3]);
            res.render('band/bandUpdate', {band: result[0][0], guitarist: result[1]});
        });
    }
});

/*
router.get('/edit', function(req, res){
    if(req.query.band_name == null) {
        res.send('A band is required');
    }
    else {
        band_dal.getById(req.query.band_name, function(err, company){
            guitarist_dal.getAll(function(err, address) {
                res.render('band/bandUpdate', {band_name: band[0], address: address});
            });
        });
    }

});*/

router.get('/update', function(req, res) {
    band_dal.update(req.query, function(err, result){
        res.redirect(302, '/band/all');
    });
});

// Delete a band
router.get('/delete', function(req, res){
    if(req.query.band_name == null) {
        res.send('band_name is null');
    }
    else {
        band_dal.delete(req.query.band_name, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/band/all');
            }
        });
    }
});



module.exports = router;

/*
 Guitarists <br />
 <select id="guitarist" name="guitarist" multiple="multiple">
 <% /*for(var i=0; band_guitarists.length > i; i++ ) {
 var selected = "";
 if(band_guitarists[i].guitarist != null) {
 selected = "selected";
 }
 %>
 <option value="<%= band_guitarsts[i].guitarist %>" <%= selected %> ><%= band_guitarists[i].guitarist %></option>
 <% } %>
 </select>
 </br>
 </br>
 */