var http=require('http');
var fs = require("fs");
var timer = null;
var server=http.createServer(function(req,res){
    if(req.url=='/time'){
        timer = setInterval(function(){
            sendData(res);
        },2000);
    };
    if(req.url=='/'){
        fs.readFile("./long-polling.html", "binary", function(err, file) {
            if (!err) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(file, "binary");
                res.end();
            }
        });
    }
}).listen(8088,'localhost');
//用随机数模拟数据是否变化
function sendData(res){
    var randomNum=Math.floor(10*Math.random());
    console.log(randomNum);
    if(randomNum<=5){
        res.end("有新消息"+new Date().toLocaleString());
    }
    // else{
    //     res.write("没有新消息..."+new Date().toLocaleString())
    // }
}
