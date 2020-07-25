const mysql = require('mysql');
const config = require('./config.json');

const pool = mysql.createPool({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpass,
    database: config.dbname
});

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    let sqlString;
    if (event.params.querystring.type == "search") {
        sqlString = "SELECT * FROM vertices WHERE vertex_hidden = 0 AND vertex_name LIKE '%"
            + event.params.querystring.key + "%';";
    } else if (event.params.querystring.type == "retrieve") {
        sqlString = "SELECT * FROM vertices WHERE vertex_id = " + event.params.querystring.key + ";";
    } else if (event.params.querystring.type == "list"){
        sqlString = "SELECT vertex_id, vertex_name FROM vertices WHERE vertex_hidden = 0";
    } else {
        callback(null, "Bad Request: Type should be \"search\" or \"retrieve\".");
    }
    pool.getConnection((err, connection) => {
        if (err) {
            callback(null, "Error getting connection: \n" + err);
        }else{
            connection.query(sqlString, (err, results, fields) => {
                if (err) {
                    callback(null, "Error making query: \n" + err);
                } else {
                    callback(null, results);
                }
            });
        }
    });
};