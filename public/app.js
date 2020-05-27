// Click function for save comment
$( document ).on( "click", "#savecomment", function ()
{
    // Grab the id associated with the article from the submit button
    var thisId = $( this ).attr( "data-id" );

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax( {
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            // Value taken from the user input
            user: $( '#userinput' ).val(),
            // Value taken from title input
            title: $( "#titleinput" ).val(),
            // Value taken from note textarea
            body: $( "#bodyinput" ).val()
        }
    } )
        // With that done
        .then( function ( data )
        {
            // Log the response
            console.log( data );
            // Empty the notes section
            $( "#comments" ).empty();
        } );

    // Also, remove the values entered in the input and textarea for note entry
    $( "#userinput" ).val( "" );
    $( "#titleinput" ).val( "" );
    $( "#bodyinput" ).val( "" );


} );


$(document).on("click", #)