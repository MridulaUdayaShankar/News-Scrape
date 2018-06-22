$(function () {

    $('#scrapeButton').on('click', function (event) {
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
                                                    </div>`);
                }
            });

        });
    });


    // Whenever someone clicks a p tag
    $('p').on("click", function () {
        // Empty the notes from the note section
        $("#notes").empty();
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
                $("#notes").append("<h2>" + data.title + "</h2>");
                // An input to enter a new title
                $("#notes").append("<input id='titleinput' name='title' >");
                // A textarea to add a new note body
                $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
                // A button to submit a new note, with the id of the article saved to it
                $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

                // If there's a note in the article
                if (data.note) {
                    // Place the title of the note in the title input
                    $("#titleinput").val(data.note.title);
                    // Place the body of the note in the body textarea
                    $("#bodyinput").val(data.note.body);
                }
            });
    });

    // When you click the savenote button
    $("#savenote").on("click", function () {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");

        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from title input
                title: $("#titleinput").val(),
                // Value taken from note textarea
                body: $("#bodyinput").val()
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
        $("#titleinput").val("");
        $("#bodyinput").val("");
    });
    // })
    $("#scrapeButton").on("click", function (event) {
        event.preventDefault();

        $.ajax("/scrape", {
            type: 'GET',
        }).then(function (data) {
            console.log('data received', data);
        });
    });
});