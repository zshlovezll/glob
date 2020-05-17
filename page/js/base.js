var randomTags = new Vue({
    el:"#random_tags",
    data:{
        // tags:[
        //     "mac","摄像头","seocpanel","博客外链","gitdedecms","数据结构","C++","wordpressvagrant","E6","独立博客","DCS黑鲨博客","优化laravel","灯泡姑娘","selenium","php","模拟飞行拉登游戏","pythonphp","分页C语言","nginx个人博客","session","SpaceShuttleMissionSunshine", "Girl树莓派蛋疼伤不起","mysqlcss"+"divtelnet指针音乐","win7","搞笑","五笔","Rewrite","模拟航天飞机分区"
        // ]
        tags:"",
    },
    computed:{
        randomSize:function (min,max){
            return function (min,max){
                return Math.random()*(max-min)+min + "px"

            }
        },
        randomColor:function (){
            return function (){
                var red = Math.random()*255;
                var green = Math.random()*255;
                var blue = Math.random()*255;
                return "rgb("+red+","+green+","+blue+")";
            }
        }
    },
    created:function (){
        axios({
            method: "get",
            url: "/queryRandomTags"
        }).then((resp) =>{
            var result = [];
            for (var i = 0 ; i < resp.data.data.length ; i ++) {
                result.push({text:resp.data.data[i].tag, link:"/?tag=" + resp.data.data[i].tag});
            }
            this.tags = result;
            
        })
    }
})

var newHot = new Vue({
    el:"#new_hot",
    data:{
        titleList:[]
    },
    created:function (){
        axios({
            method:"get",
            url:"./queryHotViews"
        }).then((resp) =>{
            // console.log(resp)
            var result = []
            for(var i = 0 ;i<resp.data.data.length;i++){
                var temp = {};
                temp.title = resp.data.data[i].title;
                temp.link = "/blog_detail.html?bid="+resp.data.data[i].id;
                result.push(temp);
            }
            this.titleList = result

        })
    }
})

var newComments = new Vue({
    el:"#new_comments",
    data:{
        commentList:[]
    },
    created:function (){
        axios({
            method:"get",
            url:"/queryNewComments"
        }).then((resp) =>{
            console.log(resp)
            var result = []
            for(var i = 0 ;i<resp.data.data.length;i++){
                var temp = {};
                // var id= resp.data.data[i].blog_id > 0?resp.data.data[i].blog_id: 
                temp.name = resp.data.data[i].user_name;
                temp.date = resp.data.data[i].utime;
                temp.comment = resp.data.data[i].comments;
                if(resp.data.data[i].blog_id > 0){
                    temp.link = "/blog_detail.html?bid="+resp.data.data[i].blog_id;
                }else if(resp.data.data[i].blog_id === -1){
                    temp.link = "/about.html";
                }else if(resp.data.data[i].blog_id === -11){
                    temp.link = "/guestbook.html";
                }
                result.push(temp);
            }
            this.commentList = result
            console.log(this.commentList)
        })
    }
})