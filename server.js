var http = require('http');
var express=require('express');
var app= express();
var server =http.Server(app);
var bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}))
app.post('/new_article', function(request,response){
  console.log(request.body)
  response.json({msg:"Successfully received"})
})

app.get('/', function(request,response){
  response.sendFile(__dirname + '/index.html')
})
app.get('/second', function(request,response){
  response.sendFile(__dirname + '/node.html')
})

app.get('/new', function(request,response){
  response.sendFile(__dirname + '/form.html')
})
// var fs=require ('fs')
// var server = http.createServer(function(req, res){
  
//   fs.readFile('index.html', function(err,data){
//       if(err){

//           res.statusCode =404;
//           res.setHeader('Content-Type', 'text/plain');
//             res.end('File not found')
//       }
      
//       res.setHeader('Content-Type', 'text/html');
//       res.statusCode= 200;
//       res.end(data);
//   })
// //   res.end("Hello World\n");
// });
server.listen(3000, 'localhost', function(){
  console.log('Server running');
});
