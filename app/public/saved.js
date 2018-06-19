$(document).ready(function () {

    $(document).on("click", ".btn-danger", deleteStory);
    $(document).on("click", ".btn-primary", makeComment);

    function getStories() {
        $.get("/stories", (results) => {
        }).then((results) => {
            results.forEach(function (currentValue, key) {
                console.log(currentValue)
                let newTr = $(`<tr id="${currentValue._id}">`);
                newTr.append(`<td id="title${key}">${currentValue.title}</td>`);
                newTr.append(`<td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#commentsModal">Comments</button>`)
                newTr.append(`<td><button class="btn btn-danger" id="${key}">Delete Article</button>`)
                $("#stories").prepend(newTr)
            })
        })
    };

    function makeComment() {
        let id = $(this).parent("td").parent("tr").attr("id");
        $('#commentsModal').modal('toggle')
        $(`#commentsModalLabel`).text(`${id}`)
        $(`#saveComment`).on('click', () => {
            let comment = $('#commentText').val()
            console.log(comment)
            $.post("/stories/" + id, comment)
        })
    }

    
    function deleteStory() {
        let id = $(this).parent("td").parent("tr").attr("id");
        console.log(id)
        $.ajax({
            method: "DELETE",
            url: "api/stories/" + id
        }).then($(`#${id}`).remove())
    };

    getStories();


});