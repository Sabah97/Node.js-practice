var http = require('http');
var fs=require ('fs')
var server = http.createServer(function(req, res){
  
  fs.readFile('index.html', function(err,data){
      if(err){

          res.statusCode =404;
          res.setHeader('Content-Type', 'text/plain');
            res.end('File not found')
      }
      
      res.setHeader('Content-Type', 'text/html');
      res.statusCode= 200;
      res.end(data);
  })
//   res.end("Hello World\n");
});
server.listen(3000, 'localhost', function(){
  console.log('Server running');
});
