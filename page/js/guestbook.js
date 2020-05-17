var blogComments = new Vue({
    el: "#blog_comments",
    data: {
        cs: "",
        total: '',

    },
    computed: {
        reply: function () {
            return function (commentId, userName) {
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                location.href = "#send_comment";
            }
        },
    },
    created: function () {
        
        //-11代表留言界面的留言

        var bid = -11;

        axios({
            method: "get",
            url: "/queryCommentsByBlogId?bid=" + bid
        }).then(res => {
            this.cs = res.data.data
            this.total = res.data.data.length;

            for (var i = 0; i < this.cs.length; i++) {
                if (this.cs[i].parent > -1) {
                    this.cs[i].options = "回复@" + this.cs[i].parent_name;
                }
            }
        })

    }
})


var sendComment = new Vue({
    el: "#send_comment",
    data: {
        vcode: "",
        right: ""
    },
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

                // var code = document.getElementById("comment_code").value;
                // if (code != this.right) {
                //     alert("验证码有误")
                //     return;
                // }


                var bid = -11;


                var reply = document.getElementById("comment_reply").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;
                var parentName = document.getElementById("comment_reply_name").value;


                axios({
                    method: "get",
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content + "&parentName=" + parentName,
                }).then(function (resp) {
                    // alert(resp.data.msg);
                    const isTure = window.confirm(resp.data.msg);
                    if (isTure) {
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