var http = require('http');
var server = http.createServer(function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end("Hello World\n");
});
server.listen(3000, 'localhost', function(){
  console.log('Server running');
});
