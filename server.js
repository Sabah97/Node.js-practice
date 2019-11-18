var http = require("http");
const express = require("express");
const app = express();
const server = http.Server(app);
const bodyParser = require("body-parser");
//var mongo= require('mongodb')
var mongoose=require('mongoose')
var db,uri="mongodb+srv://Sabah97:sabah@97@cluster0-ozffx.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
mongoose.connection.on('error',function(err){
  console.log('Could not connect to MongoDB')
})


// mongo.MongoClient.connect(uri,{useNewUrlParser:true ,useUnifiedTopology:true},function(err,client){
// if(err){
// console.log('Could not connect to MongoDB')
// } else{
// db=client.db('node-cw9')
// }
// })
// var save=function(form_data){
//   db.createCollection('articles',function(err,collection){
//     var collection=db.collection('articles')
//     collection.save(form_data)

//   })
// }

var Schema=mongoose.Schema
var articleSchema=new Schema(
  {
    title:{
      type:String,
      required:"Title is required"
    },
    content:{
      type:String,
      required:"Content is required"
    }
  }
)
var Article=mongoose.model('Artcle', articleSchema) 
app.use(bodyParser.urlencoded({ extended: true }));

let articles = [];

app.post("/new_article", function(request, response) {
  let article=new Article(request.body)
  article.save(function(err,data){
    if(err){
      return response.status(400).json({msg:"All fields are required"})
    }
    return response.status(200).json({article:data})
  })
  // save(request.body)
  articles.push(request.body);
  console.log(articles);
  // console.log(request.body.title);
  // console.log(request.body.content);

  //response.json({ msg: "successfully received" });
});
app.get('/article/:id', function(request,response){
  if(request.params.id){
    Article.find({'_id':request.params.id},
    function(err,data){
      if(err){
        return response.status(400),json({msg:'Could not query the db'})

      }
      return response.render('article.ejs',{
        article:data[0]
      });
    });
  }
  else{
    response.json({msg:"Article not found"})
  }
})

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
///9b