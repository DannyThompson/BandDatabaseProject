var express = require('express');
var router = express.Router();
var guitarist_dal = require('../model/guitarist_dal');


// View All Guitarists
router.get('/all', function(req, res) {
    guitarist_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('guitarist/guitaristViewAll', { 'result':result });
        }
    });

});

// View the guitarist for the given name
router.get('/', function(req, res){
    if(req.query.guitarist == null) {
        res.send('guitarist is null');
    }
    else {
        guitarist_dal.getById(req.query.guitarist, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('guitarist/guitaristViewById', {'result':result});
            }
        });
    }
});

// Return the add a new guitarist form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    guitarist_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('guitarist/guitaristAdd', {'guitarist': result});
        }
    });
});

router.get('/insert', function(req, res){
    // simple validation
    if(req.query.guitarist_name == null) {
        res.send('A guitarist\'s Name must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        guitarist_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                res.redirect(302, '/guitarist/all');
            }
        });
    }
});

// Delete a guitarist
router.get('/delete', function(req, res){
    if(req.query.guitarist == null) {
        res.send('guitarist_name is null');
    }
    else {
        guitarist_dal.delete(req.query.guitarist_name, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/guitarist/all');
            }
        });
    }
});



module.exports = router;

/*
 Guitarists <br />
 <select id="guitarist" name="guitarist" multiple="multiple">
 <% /*for(var i=0; guitarist_guitarists.length > i; i++ ) {
 var selected = "";
 if(guitarist_guitarists[i].guitarist != null) {
 selected = "selected";
 }
 %>
 <option value="<%= guitarist_guitarsts[i].guitarist %>" <%= selected %> ><%= guitarist_guitarists[i].guitarist %></option>
 <% } %>
 </select>
 </br>
 </br>
 */