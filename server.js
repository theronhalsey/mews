const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mews_db");
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