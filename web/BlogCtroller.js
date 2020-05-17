var blogDao = require("../dao/BlogDao");
var TimeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var tagsDao = require('../dao/tagsDao');
var tagBlogMapping = require("../dao/TagBlogMappingDao")
var url = require("url");
var path = new Map();


function queryHotViews(req,res){
    blogDao.queryAllblog(function (result){
        res.writeHead(200);
        res.write(respUtil.writeResult("success","查询成功",result));
        res.end();
    })
}

path.set("/queryHotViews",queryHotViews)

function queryAllblog(req,res){
    blogDao.queryAllblog(function (result){
        res.writeHead(200);
        res.write(respUtil.writeResult("success","查询成功",result));
        res.end();
    })
}

path.set("/queryAllblog",queryAllblog)

function queryBlogById(req,res){
    var params = url.parse(req.url,true).query;
    blogDao.queryBlogById(parseInt(params.bid),function (result){
        res.writeHead(200);
        res.write(respUtil.writeResult("success","查询成功",result));
        res.end();
        blogDao.addViews(parseInt(params.bid),function (result){})
    })
}

path.set("/queryBlogById",queryBlogById)

function queryBlogCount(rep,res){
    blogDao.queryBlogCount(function (result){
        res.writeHead(200);
        res.write(respUtil.writeResult("success","查询成功",result));
        res.end();
    })
}
path.set("/queryBlogCount",queryBlogCount)

function queryBlogByPage(req, res) {
    var params = url.parse(req.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
        for (var i = 0 ; i < result.length ; i ++) {
            result[i].content = result[i].content.replace(/<img[\w\W]*">/, "");
            result[i].content = result[i].content.replace(/<[\w\W]{1,6}>/g, "");
            result[i].content = result[i].content.substring(0, 300);
        }
        res.writeHead(200);
        res.write(respUtil.writeResult("success", "查询成功", result));
        res.end();
    });
}
path.set("/queryBlogByPage", queryBlogByPage);


function editBlog(req,res){
    var params = url.parse(req.url, true).query;
    var tags = params.tags.replace(/ /g, "").replace("，", ",");
    req.on("data",function (data){
        blogDao.insertEditBlog(params.title,data.toString(),0,tags,TimeUtil.getNow(),TimeUtil.getNow(),function (result){

            res.writeHead(200);
            res.write(respUtil.writeResult("success","添加成功",null))
            res.end();
            var blogId = result.insertId;
            // console.log(result,blogId)
            var tagsList = tags.split(",");
            for(var i = 0 ;i < tagsList.length;i++){
                if(tagsList[i] === " "){
                    continue;
                }
                queryTag(tagsList[i],blogId)
            }
        })
    })

}
function queryTag(tag,blogId){
    tagsDao.queryTag(tag,function (result){
        console.log(result);
        if(result == null || result.length == 0){
            insertTag(tag,blogId)
        }else{
            console.log(result[0].id)
            tagBlogMapping.insertTagBlogMapping(result[0].id,blogId,TimeUtil.getNow(),TimeUtil.getNow(),function (result){});
        }
    })
}
function insertTag(tag,blogId){
    tagsDao.insertTag(tag,TimeUtil.getNow(),TimeUtil.getNow(),function (result){
        insertTagBlogMapping(result.insertId,blogId)
    })
}

function insertTagBlogMapping(tagId,blogId){
    tagBlogMapping.insertTagBlogMapping(tagId,blogId,TimeUtil.getNow(),TimeUtil.getNow(),function (result){})
}

path.set("/editBlog",editBlog);

module.exports.path = path;

