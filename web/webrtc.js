var http = require("http");
var fs = require("fs");
http.createServer(function (req, res) {

	if (req.url == '/') {
		fs.readFile("webrtc.html", "binary", function (err, file) {
			if (!err) {
				res.writeHead(200, {
					'Content-Type': 'text/html'
				});
				res.write(file, "binary");
				res.end();
			}
		});
	}
	else if (req.url == '/client.html') {
		fs.readFile("client.html", "binary", function (err, file) {
			if (!err) {
				res.writeHead(200, {
					'Content-Type': 'text/html'
				});
				res.write(file, "binary");
				res.end();
			}
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
