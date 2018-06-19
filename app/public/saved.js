$(document).ready(function () {

    $(document).on("click", ".btn-danger", deleteStory);
    $(document).on("click", ".btn-primary", makeComment);

    function getStories() {
        $.get("/stories", (results) => {
        }).then((results) => {
            results.forEach((currentValue, key) => {
                console.log(currentValue)
                let newTr = $(`<tr id="${currentValue._id}">`);
                newTr.append(`<td id="title${key}">${currentValue.title}</td>`);
                newTr.append(`<td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#commentsModal">Comments</button>`)
                newTr.append(`<td><button class="btn btn-danger" id="${key}">Delete Article</button>`)
                $("#stories").prepend(newTr)
                /* if (currentValue.note) {
                    currentValue.note.forEach((currentValue, key) => {
                        $.get("/notes/" + currentValue, (results) => {
                        }).then((result) => {
                            let newTr = $(`<tr>`);
                            newTr.append(`<td>${result.text}`)
                        })
                    })
                } */
            })
        })
    };

    function makeComment() {
        let id = $(this).parent("td").parent("tr").attr("id");
        $('#commentsModal').modal('toggle')
        $(`#commentsModalLabel`).text(`${id}`)
        $(`#saveComment`).on('click', () => {
            let note = {};
            note.text = $('#commentText').val()
            console.log(note)
            $.post("/stories/" + id, note)
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