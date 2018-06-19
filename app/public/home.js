$(document).ready(function () {

    $("#scrapeButton").on("click", () => {
        $.get("/scrape", (results) => {
        }).then((results) => {
            console.log("The Data I have is: " + results[0].title)
            results.forEach(function (currentValue) {
                let newTr = $("<tr>");
                newTr.append(`<td>${currentValue.title}</td>`);
                newTr.append(`<td><a class="btn btn-primary" href=${currentValue.link} target="_blank"</a>Visit Page`)
                newTr.append(`<td><button class="btn btn-secondary" id="saveStory">Save Article</button>`)
                $("#stories").append(newTr)
            })

        })
    })

    $(document).on("click", "#saveStory", () => {
        $.post("/stories", (story) => {
            console.log("Added to DB: " + story)

        })
    })


});