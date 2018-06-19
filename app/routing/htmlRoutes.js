// DEPENDENCIES
const path = require("path");

// ROUTING
module.exports = function (app) {

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get("/saved", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/saved.html"));
    });
};