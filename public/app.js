// Click function for save comment
$( document ).on( "click", ".addcomment", function ()
{
    // Grab the id associated with the article from the submit button
    var thisId = $( this ).attr( "id" );

    // Run a POST request retrive the Add Comment page and pass the article id
    $.ajax( {
        method: "POST",
        url: "/add" + thisId,
        data: {
            
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




} );


