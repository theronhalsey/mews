const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mews_db";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static directory to be served
app.use(express.static("app/public"));

// ROUTER
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// LISTENER
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});