var mysql = require("mysql");

function createConnection (){
    var connection = mysql.createConnection({
        host:"101.132.136.167",
        port:"3306",
        user:'root',
        password:"bamboo",
        database:"my_blog"
    });
    return connection;
}
module.exports.createConnection = createConnection;