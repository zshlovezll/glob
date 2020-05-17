var dbutil = require("./DButil");

function insertTag(tag,ctime,utime,callback){
    var insertSql = "insert into tags (`tag`,`ctime`,`utime`) values(?,?,?);";

    var params = [tag,ctime,utime];

    var con = dbutil.createConnection();
    con.connect();

    con.query(insertSql,params,function (error,result){
        if(error === null){
            callback(result);
        }else{
            console.log(error);
        }
    });

    con.end()
}

function queryTag(tag,callback){
    var querySql = "select * from tags where tag = ? ;";

    var params = [tag];

    var con = dbutil.createConnection();
    con.connect();

    con.query(querySql,params,function (error,result){
        if(error === null){
            callback(result);
        }else{
            console.log(error);
        }
    });

    con.end()
}
function queryAllTag(callback){
    var querySql = "select * from tags;";

    var params = [];

    var con = dbutil.createConnection();
    con.connect();

    con.query(querySql,params,function (error,result){
        if(error === null){
            callback(result);
        }else{
            console.log(error);
        }
    });

    con.end()
}


module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryAllTag = queryAllTag;
