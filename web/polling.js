var http = require('http');
var fs = require("fs");
var server = http.createServer(function (req, res) {
	if (req.url == '/time') {
		//res.writeHead(200, {'Content-Type': 'text/plain','Access-Control-Allow-Origin':'http://localhost'});
		res.end(new Date().toLocaleString());
	}
	else if (req.url == '/') {
		fs.readFile("./polling.html", "binary", function (err, file) {
			if (!err) {
				res.writeHead(200, {
					'Content-Type': 'text/html'
				});
				res.write(file, "binary");
				res.end();
			}
		});
	} else {
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
}).listen(8088, 'localhost');
console.log("localhost:8088");
