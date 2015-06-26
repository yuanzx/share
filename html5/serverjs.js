var http = require('http');
http.createServer(function(req, res) {
    setTimeout(function() {
        res.end('alert(2)');
    }, 3000);

}).listen(9001, '127.0.0.1');
console.log('HttpServer running at http://127.0.0.1:9001/');
