var db = require( "../models" );

// Require axios and cheerio. This makes the scraping possible
var axios = require( "axios" );
var cheerio = require( "cheerio" );

module.exports = function ( app )
{


    // Main route (simple Hello World Message)** update with correct view from handlebars
    app.get( "/", function ( req, res )
    {
        res.render( "articles" );
    } );


    //  Function to get all data from the database
    app.get( "/all", function ( req, res )
    {
        // Grab every document in the Articles collection
        db.Article.find( {} )
            .then( function ( dbArticle )
            {
                // If we were able to successfully find Articles, send them back to the client
                res.json( dbArticle );
            } )
            .catch( function ( err )
            {
                // If an error occurred, send it to the client
                res.json( err );
            } );


    } )


    // @ts-ignore
    // Function to scrape the TMZ site for new articles
    app.get( "/scrape", function ( req, res )
    {
        // @ts-ignore
        axios.get( "https://www.tmz.com" ).then( function ( response )
        {

            // Load the HTML into cheerio and save it to a variable
            // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
            var $ = cheerio.load( response.data );
            console.log( response.data )



            // With cheerio, find each article with the "article tag"

            $( ".article" ).each( function ( i, element )
            {

                // An empty array to save the data that we'll scrape
                var result = {};

                // Save the text of the element in a "title" variable
                result.title = $( this ).find( "h2" ).find( "span" ).text()

                // In the currently selected element, look at its child elements (i.e., its a-tags),
                // then save the values for any "href" attributes that the child elements may have
                result.link = $( this ).find( "a" ).attr( "href" )

                result.img = $( this ).find( "img" ).attr( "src" )

                result.sum = $( this ).find( "p" ).text()


                db.Article.create( result ).then( function ( dbArticle )
                {
                    // view the results in the console
                    console.log( dbArticle )
                } ).catch( function ( err )
                {
                    console.log( err )
                } );





                // Send a message to the client **update with redirect to correct handlebars view
                res.send( "Scrape Complete" );


            } )
        } )




    } );




    // function to add a comment to a specific article
    app.get( "/article/:id", function ( req, res )
    {
        db.scraper.findOne( { _id: req.params.id } )
    } )


    // Route for saving the comment to the specific article


}