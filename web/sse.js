var http = require("http");
var fs = require("fs");
http.createServer(function (req, res) {
	if (req.url == '/') {
		fs.readFile("sse.html", "binary", function (err, file) {
			if (!err) {
				res.writeHead(200, {
					'Content-Type': 'text/html'
				});
				res.write(file, "binary");
				res.end();
			}
		});
	}
     else if (req.url == "/sse") {
		res.writeHead(200, {  //服务器向浏览器发送的 SSE 数据，必须是 UTF-8 编码的文本，具有如下的 HTTP 头信息
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			"Connection": "keep-alive",
			// "Access-Control-Allow-Origin": '*',
		});
        // res.setHeader('Content-Type', 'text/html');
        // res.setHeader('X-Foo', 'bar');
        //outHeadersKey Symbol
        // res.write(":begin\n");
        // var start = Date.now();
        /*
        发送格式：
            每一次发送的信息，由若干个message组成，每个message之间用\n\n分隔。
            每个message内部由若干行组成，每一行都是如下格式
            [field]:value\n [field可为空，表示发送的是注释，一般用于心跳,类型为空白，会在处理时被忽略]
        field取值
            id:  数据编号，int string都行 浏览器用lastEventId属性读取这个值。
                一旦连接断线，浏览器会发送一个 HTTP 头，里面包含一个特殊的Last-Event-ID头信息，
                将这个值发送回来，用来帮助服务器端重建连接。因此，这个头信息可以被视为一种同步机制
            data: string 发送的数据
            retry: number 毫秒数
                   指定浏览器重新发起连接的时间间隔  webkit默认3s 火狐5s
                   两种情况会导致浏览器重新发起连接：一种是时间间隔到期，二是由于网络错误等原因，导致连接出错
                   https://chromium.googlesource.com/chromium/blink/+/5fcd859a37832978e0e504e7218fd910b7d20675/Source/core/page/EventSource.cpp
            event: 事件名称 默认为message
        */
        var count = 0;
        var timer = setInterval(()=>{
            // console.log(Date.now() - start);
            console.log(res.socket.writable);
            // if (!res.socket.writable) {
            //     return
            // }
            count++;
            console.log(count);
            if(count==1){
                res.write("data: 我没有id\n");
                res.write("data: 没有结束标志");
                res.write("data: 能发\\n送吗\n");
                res.write("data: 结束标记后面的数据能发送吗\n别的数据"); //不要整古怪的数据格式，RFC没明确说明，依据浏览器实现
                res.write("data: 新一行\n");
                res.write("data: {name:'aaa',test: \n\n");
            }
            else if (count==2) {
                res.write("id:2\n");
                res.write("data: 我的id是2\n\n");
            }
            else if (count==3) {
                res.write("id:2\n");
                res.write("data: 我的id是也是2\n\n");
            }
            else if (count==4) {
                res.write("id:不是int\n");
                res.write("data: 我的id不是int\n\n");
            }
            else if (count==5) {
                // res.write("retry: 10000\n");
                res.write("event: test\n");
                res.write("id:" + count + '\n');
                res.write("data: hello\n");
                res.write("data: word\n");
                res.write("data: {name:'aaa',test: \n\n");
            }
            else if (count==6) {
                clearTimeout(timer);
                res.write("data: please close\n");
                res.write("event: close\n\n");
                res.end();

            }
            else if (count == 7) {
                throw "error"
            }



        },2000);
        res.socket.on('close', function () {
            clearTimeout(timer);
            console.log("关闭本次请求");
            res.end();
        });
	}
    else {
        console.log(req.url);
        fs.readFile(req.url.replace('/',''), "binary", function (err, file) {
            if (!err) {
                res.writeHead(200, {
                    'Content-Type': 'image/gif'
                });
                res.write(file, "binary");
                res.end();
            }
        });
    }
}).listen(8088, "localhost");
