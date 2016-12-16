var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
    Country is pretty bare in terms of functionality since there isn't a whole lot of crucial info.
    It's simply used for other purposes.
 */

exports.getAll = function(callback) {
    var query = 'SELECT country_name FROM country;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};


exports.insert = function(params, callback) {

    var query = 'INSERT INTO country (country_name, continent) VALUES (?, ?)';

    var queryData = [params.country_name, params.continent];

    connection.query(query, queryData, function(err, result) {
            callback(err, result);
    });
};

exports.delete = function(tour_name, callback) {
    var query = 'DELETE FROM country WHERE country_name = ?';
    var queryData = [country_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
