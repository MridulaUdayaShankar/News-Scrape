var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");

// Initialize Express
var app = express();

var axios = require("axios");
var cheerio = require("cheerio");

var PORT = 3000;

//require Routes
var routes = require("./controller/api-routes");   
app.use(routes);

//require connection to database
require('./config/connection');

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
