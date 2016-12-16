var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);



exports.getAll = function(callback) {
    var query = 'SELECT * FROM tour;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(tour_name, callback) {
    var query = 'SELECT * FROM tour_view where tour_name = ?';
    var queryData = [tour_name];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    var query = 'INSERT INTO tour (start_month, end_month, tour_name, start_year, ' +
    'end_year, headliner) VALUES (?, ?, ?, ?, ?, ?)';

    var queryData = [params.start_month, params.end_month, params.tour_name, params.start_year, params.end_year, params.headliner];

    connection.query(query, queryData, function(err, result) {


        var tour_name = result.insertId;

        // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
        var query1 = 'INSERT INTO tour_country (country_name, tour_name) VALUES ?';

        var countryData = [];
        if (connection instanceof Array){
            for (var i = 0; i < params.country_name.length; i++) {
                countryData.push([params.country_name[i], tour_name]);
            }
    }
        connection.query(query1, [countryData], function(err, result){
            callback(err, result);
        });
    });

};

exports.delete = function(tour_name, callback) {
    var query = 'DELETE FROM tour WHERE tour_name = ?';
    var queryData = [tour_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

//declare the function so it can be used locally
var tourCountryInsert = function(tour_name, countryArray, callback){
    // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
    var query = 'INSERT INTO tour_country (country_name, tour_name) VALUES ?';

    // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES

    var countryData = [];
    if(countryArray instanceof Array) {
        for (var i = 0; i < countryArray.length; i++) {
           countryData.push([tour_name, countryArray[i]]);
        }
    }
    connection.query(query, [countryData], function(err, result){
        callback(err, result);
    });
};
//export the same function so it can be used by external callers
module.exports.tourCountryInsert = tourCountryInsert;

//declare the function so it can be used locally
var tourCountryDeleteAll = function(tour_name, callback){
    var query = 'DELETE FROM tour_country WHERE tour_name = ?';
    var queryData = [tour_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
//export the same function so it can be used by external callers
module.exports.tourCountryDeleteAll = tourCountryDeleteAll;

//No update here because it wouldn't make sense to update a tour. The planned start and end dates almost always stay the same and countries aren't avoided altogether after planned.

exports.edit = function(tour_name, callback) {
    var query = 'CALL tour_getinfo(?)';
    var queryData = [tour_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
