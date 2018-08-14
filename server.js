// pull dependencies 
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// set up express
var app = express();
var PORT = process.env.PORT || 8080;
//var PORT = 3306;

//static?????
//app.use(express.static(path.join(__dirname, './app/public')));

// Add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add the application routes
require(path.join(__dirname, "./app/routing/apiRoutes"))(app);
require(path.join(__dirname, "./app/routing/htmlRoutes"))(app);

// Start listening on PORT
app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});
