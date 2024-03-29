var http = require("http");
const express = require("express");
const app = express();
const server = http.Server(app);
const bodyParser = require("body-parser");
var mongo= require('mongodb')
var db,uri="mongodb+srv://Sabah97:sabah@97@cluster0-ozffx.mongodb.net/test?retryWrites=true&w=majority"
mongo.MongoClient.connect(uri,{useNewUrlParser:true ,useUnifiedTopology:true},function(err,client){
if(err){
console.log('Could not connect to MongoDB')
} else{
db=client.db('node-cw9')
}
})
var save=function(form_data){
  db.createCollection('articles',function(err,collection){
    var collection=db.collection('articles')
    collection.save(form_data)

  })
}
app.use(bodyParser.urlencoded({ extended: true }));

let articles = [];

app.post("/new_article", (request, response) => {
  save(request.body)
  articles.push(request.body);
  console.log(articles);
  // console.log(request.body.title);
  // console.log(request.body.content);

  response.json({ msg: "successfully received" });
});

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/second", function(request, response) {
  response.sendFile(__dirname + "/views/second.html");
});

app.get("/new", function(request, response) {
  response.sendFile(__dirname + "/views/form.html");
});

app.get("/article/:index", (req, res) => {
  if (articles[req.params.index]) {
    res.render("article.ejs", {
      article: articles[req.params.index]
    });
  } else {
    res.json({ msg: "Article not found" });
  }
});

// const fs = require("fs");

// var server = http.createServer(function(req, res) {
//   fs.readFile("index.html", (err, data) => {
//     if (err) {
//       res.statusCode = 404;
//       res.setHeader("Content-Type", "text/plain");
//       res.end("File not found");
//     }
//     res.setHeader("Content-Type", "text/html");
//     res.statusCode = 200;
//     res.end(data);
//   });

//   // res.statusCode = 200;
//   // res.setHeader("Content-Type", "text/plain");

//   // res.end("Hello World\n");
// });

server.listen(3000, "localhost", function() {
  console.log("Server running");
});
