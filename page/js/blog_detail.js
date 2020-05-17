var blogDetail = new Vue({
    el: "#blog_detail",
    data: {
        title: "",
        content: "",
        ctime: "",
        tags: "",
        views: ""
    },
    computed: {
        
    },
    created: function () {
        var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        console.log(searcheUrlParams)
        if (searcheUrlParams == "") {
            return;
        }
        var bid = -1;

        for (var i = 0; i < searcheUrlParams.length; i++) {
            if (searcheUrlParams[i].split("=")[0] == "bid") {
                try {
                    bid = parseInt(searcheUrlParams[i].split("=")[1]);
                } catch (e) {
                    console.log(e);
                }
            }
        }
        axios({
            method: "get",
            url: "/queryBlogById?bid=" + bid
        }).then(function (resp) {
            var result = resp.data.data[0];
            blogDetail.title = result.title;
            blogDetail.content = result.content;
            blogDetail.ctime = result.ctime;
            blogDetail.tags = result.tags;
            blogDetail.views = result.views;
        }).catch(function (resp) {
            console.log("请求失败");
        });
    }
});

var sendComment = new Vue({
    el: "#send_comment",
    data: {
        vcode: "",
        right: ""
    },
    // methods:{

    // },
    computed: {
        
        changeCode: function () {
            return function () {
                axios({
                    method: "get",
                    url: '/queryRandomCode',
                }).then((result) => {
                    this.vcode = result.data.data.data;
                    this.right = result.data.data.text;
                })
            }
        },
        sendComment1: function () {
            return function () {
                var code = document.getElementById("comment_code").value;
                if (code != this.right) {
                    alert("验证码有误")
                    return;
                }
 
                var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                if (searcheUrlParams == "") {
                    return;
                }
                var bid = -1;

                for (var i = 0; i < searcheUrlParams.length; i++) {
                    if (searcheUrlParams[i].split("=")[0] == "bid") {
                        try {
                            bid = parseInt(searcheUrlParams[i].split("=")[1]);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }

                var reply = document.getElementById("comment_reply").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;
                var parentName = document.getElementById("comment_reply_name").value;


                axios({
                    method: "get",
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content + "&parentName="+ parentName,
                }).then(function (resp) {
                    // alert(resp.data.msg);
                    const isTure = window.confirm(resp.data.msg);
                    if(isTure){
                        location.reload();
                    }
                });


            }
        }
    },
    created: function () {
        this.changeCode();
    }
})

var blogComments = new Vue({
    el: "#blog_comments",
    data: {
        cs:"",
        total:'',

    },
    computed: {
        reply:function (){
            return function (commentId, userName){
                // this.element = e.target
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                location.href = "#send_comment";

            }
        },
    },
    created: function () {
        var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if (searcheUrlParams == "") {
            return;
        }
        var bid = -10;

        for (var i = 0; i < searcheUrlParams.length; i++) {
            if (searcheUrlParams[i].split("=")[0] == "bid") {
                try {
                    bid = parseInt(searcheUrlParams[i].split("=")[1]);
                } catch (e) {
                    console.log(e);
                }
            }
        }
        axios({
            method: "get",
            url: "/queryCommentsByBlogId?bid=" + bid
        }).then(res => {
            this.cs = res.data.data
            this.total = res.data.data.length;
            // this.cs.forEach(ele => {
            //     if(ele.parent>-1){
            //         ele.parent_name = this.element;
            //         console.log(this.element)
            //         ele.options = "@回复:"+ele.parent_name;
            //     }
            // });

            for (var i = 0 ; i < this.cs.length ; i ++) {
                if (this.cs[i].parent > -1) {
                    this.cs[i].options = "回复@" + this.cs[i].parent_name;
                }
            }
        })

    }
})