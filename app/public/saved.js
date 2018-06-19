$(document).ready(function () {

    $(document).on("click", ".btn-danger", deleteStory);

    function getStories() {
        $.get("/stories", (results) => {
        }).then((results) => {
            results.forEach(function (currentValue, key) {
                let newTr = $(`<tr id="${currentValue._id}">`);
                newTr.append(`<td id="title${key}">${currentValue.title}</td>`);
                newTr.append(`<td><a id="link${key}" class="btn btn-primary" href=${currentValue.link} target="_blank"</a>Write Comment`)
                newTr.append(`<td><button class="btn btn-danger" id="${key}">Delete Article</button>`)
                $("#stories").prepend(newTr)
            })
        })
    };

    
    function deleteStory() {
        let id = $(this).parent("td").parent("tr").attr("id");
        console.log(id)
        $.ajax({
            method: "DELETE",
            url: "api/stories/" + id
        }).then(getStories)
    };

    getStories();


});