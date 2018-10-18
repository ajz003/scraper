// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    let para = $("<p data-id='" + data[i]._id + "'>")
    para.append("<h2>" + data[i].title + "</h2>" + "<a href='" + data[i].link + "'>Link to</a>" + "<br />" + data[i].summary + "</p>")
    $("#articles").append(para)
    
  
  }
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function () {
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

      $("#notes").append("<h2>" + data.title + "</h2>");

      let n = data.note.length

      for (let i = 0; i < n; i++) {

      $("#notes").append("<div id='comment-holder'></div>");

        $("#comment-holder").append(`<p class="comment">${data.note[i].body}</p>`);
    

    }
      $("#notes").append("<label for='bodyinput'>Leave a comment:</label><textarea class='form-control' rows='5' id='bodyinput'></textarea><br>");
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Submit</button>");


      // If there's a note in the article

    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
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
  $("#bodyinput").val("");
});

$(document).on("click", "#scrape", function () {

  $.ajax({
    method: "GET",
    url: "/scrape/"
  }).then(function () {
    location.reload();
  })

})