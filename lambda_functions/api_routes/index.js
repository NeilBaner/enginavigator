const mysql = require('mysql');
const config = require('./config.json');
const Graph = require('node-dijkstra');

const pool = mysql.createPool({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpass,
    database: config.dbname
});

function createResponse(body) {
    let response = {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": {},
        "multiValueHeaders": {},
        "body": body
    };
    return response;
}

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    let start, end;
    start = event.params.querystring.start;
    end = event.params.querystring.end;
    let nodes = [];
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err);
        }
        let sqlString = "SELECT * FROM vertices";
        let map = new Map();
        connection.query(sqlString, (err, results, fields) => {
            if (err) {
                callback(err);
            }
            else {
                results.forEach(node => {
                    nodes.push(node.vertex_id);
                });
                console.log(nodes);
                nodes.forEach(node => {
                    sqlString = "SELECT * FROM edges WHERE edge_start = " + node + ";";
                    console.log(sqlString);
                    connection.query(sqlString, (err, results, fields) => {
                        if (err) {
                            callback(err);
                        }
                        let nodeToAdd = new Map();
                        let startNode;
                        results.forEach(edge => {
                            startNode = edge.edge_start.toString();
                            nodeToAdd.set(edge.edge_end.toString(), edge.edge_weight);
                        });
                        map.set(startNode, nodeToAdd);
                    });
                });
                setTimeout(function() {
                    console.log(start);
                    console.log(end);
                    console.log(map);
                    let graph = new Graph(map);
                    console.log(graph);
                    let path = graph.path(start.toString(), end.toString());
                    console.log(path);
                    sqlString = "";
                    for(let i = 0; i < path.length - 1; i++){
                        sqlString += "SELECT edge_description FROM edges WHERE edge_start = " + path[i] + " AND edge_end = " + path[i + 1];
                        if(i == path.length - 2) {
                            sqlString += ";"
                        } else {
                            sqlString += " UNION "   
                        }
                    }
                    connection.query(sqlString, (err, results, fields) => {
                        if(err){
                            callback(err);
                        }else{
                            callback(null, results);
                        }
                    });
                }, 2000);

            }
        });
    });
};
