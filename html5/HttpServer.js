var http = require('http');
http.createServer(function(req, res) {
	setTimeout(function() {
		res.setHeader("Cache-Control", "max-age=40000");
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});

		res.end('Hello World\n' + Math.random() * 1000);
	}, 10000);

}).listen(9000, '127.0.0.1');
console.log('HttpServer running at http://127.0.0.1:9000/');