var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);



exports.getAll = function(callback) {
    var query = 'SELECT * FROM band;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(band_name, callback) {
    var query = 'SELECT * FROM band_view where band_name = ?';
    //Check if the band has any tours. If there's no tours inserted yet, reset the var so we don't return missing info.
    //if(query.tour_name == null)
      //  query = 'SELECT * FROM band where band_name = ?';

    var queryData = [band_name];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    var query = 'INSERT INTO band (band_name, singer, drummer, bassist) VALUES (?, ?, ?, ?)';

    var queryData = [params.band_name, params.singer, params.drummer, params.bassist];

    console.log(params.singer);
    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });

};

exports.delete = function(band_name, callback) {
    var query = 'DELETE FROM band WHERE band_name = ?';
    var queryData = [band_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

//declare the function so it can be used locally
var bandGuitaristInsert = function(band_name, guitaristArray, callback){
    // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
    var query = 'INSERT INTO band_guitarists (band_name, guitarist) VALUES ?';

    // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES

    var guitaristData = [];
if(guitaristArray instanceof Array) {
    for (var i = 0; i < guitaristArray.length; i++) {
        guitaristData.push([band_name, guitaristArray[i]]);
    }
}
    connection.query(query, [guitaristData], function(err, result){
        callback(err, result);
    });
};
//export the same function so it can be used by external callers
module.exports.bandGuitaristInsert = bandGuitaristInsert;

//declare the function so it can be used locally
var bandGuitaristDeleteAll = function(band_name, callback){
    var query = 'DELETE FROM band_guitarists WHERE band_name = ?';
    var queryData = [band_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
//export the same function so it can be used by external callers
module.exports.bandGuitaristDeleteAll = bandGuitaristDeleteAll;

exports.update = function(params, callback) {
    var query = 'UPDATE band SET band_name = band_name, singer = ?, bassist = ?, drummer = ? WHERE band_name = ?';
    var queryData = [params.singer, params.bassist, params.drummer, params.band_name];

    connection.query(query, queryData, function(err, result) {
        //delete band guitarist entries
        bandGuitaristDeleteAll(params.band_name, function(err, result){

            if(params.guitarist != null) {
                //insert guitarist
                bandGuitaristInsert(params.band_name, params.guitarist, function(err, result){
                    callback(err, result);
                });}
            else {
                callback(err, result);
            }
        });

    });
};


exports.edit = function(band_name, callback) {
    var query = 'CALL band_getinfo(?)';
    var queryData = [band_name];

    connection.query(query, queryData, function(err, result) {
         callback(err, result);
    });
};
