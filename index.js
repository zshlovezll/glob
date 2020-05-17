var express = require("express");
var loader = require("./loader");
var globalConfig = require("./config")

var app = new express()

app.use(express.static("./page/"));

app.post("/editEveryDay", loader.get("/editEveryDay"));
app.get("/queryEveryDay",loader.get("/queryEveryDay"));

app.post("/editBlog",loader.get("/editBlog"));
app.get("/queryBlogByPage",loader.get("/queryBlogByPage"));

app.get("/queryBlogCount",loader.get("/queryBlogCount"));
app.get("/queryBlogById",loader.get("/queryBlogById"));

app.get("/addComment",loader.get("/addComment"))

app.get("/queryRandomCode",loader.get("/queryRandomCode"));

app.get("/queryCommentsByBlogId",loader.get("/queryCommentsByBlogId"));

app.get("/queryRandomTags",loader.get("/queryRandomTags"));
app.get("/queryAllBlog",loader.get("/queryAllblog"));
app.get("/queryHotViews",loader.get("/queryHotViews"));
app.get("/queryNewComments",loader.get("/queryNewComments"));

app.get("/queryByTag",loader.get("/queryByTag"));

app.get("/queryByTagCount",loader.get("/queryByTagCount"));


app.listen(globalConfig.port,function (){
    console.log("服务器启动")
})