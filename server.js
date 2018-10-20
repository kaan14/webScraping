var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path"); 

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));


// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/webscraping", { useNewUrlParser: true });

// Routes
app.get("/scrape",function(req, res){

    var url = 'https://www.npr.org/sections/news/';

    axios.get(url).then(function(response){
        //console.log(response.data);
        var $ = cheerio.load(response.data);
 
        $("article").each(function(result){
           
            result = {};  

            result.image = $(this).children("div").find("img").attr("src"); 
            console.log(result.image);

            result.link = $(this).children("div").find("a").attr("href"); 
            console.log(result.link);

            result.title = $(this).children("div").find("a").text().trim(); 
            console.log(result.title);

            //console.log(result);
            db.Article.create(result).then(function(ArticleResult){
                console.log(ArticleResult);
            })
            .catch(function(err){
                return res.json(err);
            }); // end of create
        }); // end of each aricle
        res.send("Scrape Complete");
    }); // end of axios
}); // endof scraper route

app.get("/articles",function(req, res){
    res.sendFile(path.join(__dirname, './public', 'index.html'));
}); 

app.get("/api/articles",function(req, res){
    db.Article.find({}).then(function(response){
        res.json(response); 
    })
}); 

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    //_id is the condition like WHERE in SQL
    db.Article.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      //populating all the note associated with the article object
      .populate("comment")
      .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
  
  // Route for saving/updating an Article's associated Note
  app.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Comment.create(req.body)
      .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  }); 
