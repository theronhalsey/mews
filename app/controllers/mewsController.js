const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const router = express.Router();

// A GET route for scraping the lifewithcats website
router.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    axios.get("http://www.lifewithcats.tv/category/news/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      const $ = cheerio.load(response.data);
  
      // get every h2 within an article tag, and then get title and link
      $("article h2").each(function(i, element) {
        let result = {};
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
  
        // Create a new Story using the `result` object built from scraping
        db.Story.create(result)
          .then(function(dbStory) {
            console.log(dbStory);
          })
          .catch(function(err) {
            return res.json(err);
          });
      });
  
      res.send("Scrape Complete");
    });
  });

  module.exports = router;