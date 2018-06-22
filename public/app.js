
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
                                                    </button>`);
                }
            });

        });
    });

    // Whenever someone clicks a p tag
    $(document).on("click",'.save-article', function () {
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
                                            <div class="modal-header"></div>
                                            <div class="modal-body"></div>
                                            <div class="modal-footer">
                                            <button type="button" id='delete-note' class="btn btn-secondary">Delete</button>
                                            <button type="button" id='save-note' class="btn btn-primary">Save</button>
                                            </div></div></div>`);
                // If there's a note in the article
                if (data.note) {
                    // Place the title of the note in the title input
                    $(".modal-header").val(data.note.title);
                    // Place the body of the note in the body textarea
                    $(".modal-body").val(data.note.body);
                }
            });
    });

    $(document).on('click','#saved-articles', function () {
      
    });

    // When you click the savenote button
    $("#save-note").on("click", function () {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");

        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from title input
                title: $(".modal-header").val(),
                // Value taken from note textarea
                body: $(".modal-body").val()
            }
        })
            // With that done
            .then(function (data) {
                // Log the response
                console.log(data);
                // Empty the notes section
                $("#notes").empty();
            });

        // Also, remove the values entered in the input and textarea for note entry
        $(".modal-header").val("");
        $(".modal-body").val("");
    });