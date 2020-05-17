var dbutil = require("./DButil");

function insertEditBlog(title,content,views,tags,ctime,utime,callback){
    var insertSql = "insert into blog (`title`,`content`,`views`,`tags`,`ctime`,`utime`) values(?,?,?,?,?,?);";

    var params = [title,content,views,tags,ctime,utime];

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


function queryBlogCount(success) {
    var querySql = "select count(1) as count from blog;";
    var params = [];

    var con = dbutil.createConnection();
    con.connect();
    con.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    con.end();
}

function queryBlogByPage(page, pageSize, success) {
    var insertSql = "select * from blog order by id desc limit ?, ?;";
    var params = [page * pageSize, pageSize];

    var con = dbutil.createConnection();
    con.connect();
    con.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    con.end();
}

function queryBlogById(id,success){
    var querySql = "select * from blog where id = ?;";
    var params = [id];

    var con = dbutil.createConnection();
    con.connect();
    con.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    con.end();
}

function queryAllblog(success){
    var querySql = "select * from blog;";
    var params = [];

    var con = dbutil.createConnection();
    con.connect();
    con.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    con.end();
}

function addViews( id,success){
    var querySql = "update blog set views = views +1 where id = ?;";
    var params = [id];

    var con = dbutil.createConnection();
    con.connect();
    con.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    con.end();
}

function queryHotViews( views,success){
    var querySql = "select * from blog order by views desc limit ?;";
    var params = [views];

    var con = dbutil.createConnection();
    con.connect();
    con.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    con.end();
}

module.exports.insertEditBlog = insertEditBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllblog = queryAllblog;
module.exports.addViews = addViews;
module.exports.queryHotViews = queryHotViews;






