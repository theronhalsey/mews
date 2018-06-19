const cheerio = require("cheerio");
const axios = require("axios");

const db = require("../models");

module.exports = function (app) {

    let results = [];

    // A GET route for scraping the lifewithcats website
    app.get("/scrape", function (req, res) {
        // First, we grab the body of the html with request
        axios.get("http://www.lifewithcats.tv/category/news/").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            const $ = cheerio.load(response.data);
            $("Article h2").each(function (i, element) {

                let result = {};
                result.title = $(this)
                    .children("a")
                    .text();
                result.link = $(this)
                    .children("a")
                    .attr("href");
                results.push(result)


                // Create a new Story using the `result` object built from scraping


               
            });

            console.log(results)

            res.send(results);
        });
    });

    // Route for getting all stories from the db
    app.get("/stories", function (req, res) {
        db.Story.find({})
            .then(function (dbStory) {
                res.json(dbStory);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // Route for grabbing a specific Story by id, populate it with it's note
    app.get("/stories/:id", function (req, res) {
        db.Story.findOne({ _id: req.params.id })
            .populate("note")
            .then(function (dbStory) {
                res.json(dbStory);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // Route for saving/updating an Story's associated Note
    app.post("/stories/:id", function (req, res) {
        db.Note.create(req.body)
            .then(function (dbNote) {
                return db.Story.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            })
            .then(function (dbStory) {
                res.json(dbStory);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

};