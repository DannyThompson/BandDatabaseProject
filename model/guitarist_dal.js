var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);


exports.getAll = function(callback) {
    var query = 'SELECT * FROM guitarist;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(guitarist, callback) {
    var query = 'SELECT * FROM guitarist_view WHERE guitarist = ?';
    var queryData = [guitarist];
    console.log(query);

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    var query = 'INSERT INTO band_guitarists (guitarist, band_name) VALUES (?, ?)';

    var queryData = [params.guitarist, params.band_name];

    connection.query(query, queryData, function(err, result) {

        connection.query(query, queryData, function(err, result){
            callback(err, result);
        });
    });

};

exports.delete = function(band_name, callback) {
    var query = 'DELETE FROM band_guitarists WHERE guitarist = ?';
    var queryData = [guitarist];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

