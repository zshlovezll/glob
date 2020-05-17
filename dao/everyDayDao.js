var dbutil = require("./DButil");

function insertEveryDay(content,ctime,callback){
    var insertSql = "insert into every_day (`content`,`ctime`) values(?,?);";

    var params = [content,ctime];

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

function querytEveryDay(callback){
    var qerySql = "select * from every_day order by id desc limit 1;";
    var params = [];

    var con = dbutil.createConnection();
    con.connect();

    con.query(qerySql,params,function (error,result){
        if(error === null){
            callback(result);
        }else{
            console.log(error);
        }
    });

    con.end()
}

module.exports.insertEveryDay = insertEveryDay;
module.exports.querytEveryDay = querytEveryDay;