
    $(document).on('click','#scrapeButton', function (event) {
        $.ajax({
            method: "GET",
            url: "/scrape"
        }).then(function (data) {
            console.log("Scrapped!!!!!!!!!!!!!!!!!!");
            $.getJSON("/articles", function (data) {
                // For each one
                console.log("Articles found!!!!!!!!!!!!!!!!!!");
                for (var i = 0; i < data.length; i++) {
                    // Display the information on the page using bootstrap cards 
                    //and create a save article button for each card
                    $("#article-display").append(`<div class="card text-center">
                                                    <div class="card-body">
                                                    <h5 id='article-title' class="card-title">${data[i].title}</h5>
                                                    <p id='article-text' class="card-text">${data[i].link}</p></div>
                                                    </div>
                                                    <button type='button' class='btn btn-secondary save-article' id='save-article${i}'>Save Article
                                                    </button>
                                                    <button type='button' class='btn btn-primary add-note' id='add-note${i}'>Add Note
                                                    </button>`);
                }
            });

        });
    });
    $(document).on('click','.save-article',function(){

    });
    $(document).on('click','#saved-articles', function () {
      
    });
    // Whenever someone clicks a p tag
    $(document).on("click",'.add-note', function () {
        // Empty the notes from the note section
        $("#note-display").empty();
        // Save the id from the p tag
        var thisId = $(this).attr("data-id");

        // Now make an ajax call for the Article
        $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
            // With that done, add the note information to the page
            .then(function (data) {
                console.log(data);
                // The title of the article
                $("#note-display").modal('toggle');
                $("#note-display").append(` <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                            <div class="modal-header">
                                            <input type="text" class="form-control" id="note-title" aria-describedby="emailHelp" placeholder="Note title"></div>
                                            <div class="modal-body">
                                            <input type="text" class="form-control" id="note-body" aria-describedby="emailHelp" placeholder="text">
                                            </div>
                                            <div class="modal-footer">
                                            <button type="button" id='delete-note' class="btn btn-secondary">Delete</button>
                                            <button type="button" id='save-note' class="btn btn-primary">Save</button>
                                            </div></div></div>`);
                // If there's a note in the article
                if (data.note) {
                    // Place the title of the note in the title input
                    $("#note-title").val(data.note.title);
                    // Place the body of the note in the body textarea
                    $("#note-body").val(data.note.body);
                }
            });
    });
    // When you click the savenote button
    $(document).on("click","#save-note", function () {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");

        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from title input
                title: $("#note-title").val(),
                // Value taken from note textarea
                body: $("#note-body").val()
            }
        })
            // With that done
            .then(function (data) {
                // Log the response
                console.log(data);
                // Empty the notes section
                $("#note-display").empty();
                $("#note-display").modal('toggle');
            });

        // Also, remove the values entered in the input and textarea for note entry
        $("#note-title").val("");
        $("#note-body").val("");
    });
    
    // When you click the savenote button
    $(document).on("click","#delete-note", function () {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");

        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
            method: "DELETE",
            url: '/notes/:id' + thisId,
            data: {
                // Value taken from title input
                title: $("#note-title").val(),
                // Value taken from note textarea
                body: $("#note-body").val()
            }
        })
            // With that done
            .then(function (data) {
                // Log the response
                console.log(data);
                // Empty the notes section
                $("#note-display").empty();
                $("#note-display").modal('toggle');
            });

        // Also, remove the values entered in the input and textarea for note entry
        $("#note-title").val("");
        $("#note-body").val("");
    });
    

    