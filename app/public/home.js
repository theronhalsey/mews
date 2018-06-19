$(document).ready(function () {

    $(document).on("click", ".btn-secondary", saveStory);

    $("#scrapeButton").on("click", () => {
        $.get("/scrape", (results) => {
        }).then((results) => {
            results.forEach((currentValue, key) => {
                let newTr = $("<tr>");
                newTr.append(`<td id="title${key}">${currentValue.title}</td>`);
                newTr.append(`<td><a id="link${key}" class="btn btn-primary" href=${currentValue.link} target="_blank"</a>Visit Page`)
                newTr.append(`<td><button class="btn btn-secondary" value="${key}" id="save${key}">Save Article</button>`)
                $("#stories").append(newTr)
            })

        })
    })

    function saveStory() { 
        let num = $(this).val()
        let story = {};    
            story.title = $(`#title${num}`).text();
            console.log(story.title);
            story.link =  $(`#link${num}`).attr("href");
            console.log(story.link);
        $.post("/api/stories", story)
    };

});