// Dependencies
var express = require( "express" );
var mongojs = require( "mongojs" );
// Require axios and cheerio. This makes the scraping possible
var axios = require( "axios" );
var cheerio = require( "cheerio" );

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "tmz";
var collections = [ "scraper" ];

// Hook mongojs configuration to the db variable
var db = mongojs( databaseUrl, collections );
db.on( "error", function ( error )
{
    console.log( "Database Error:", error );
} );

// Main route (simple Hello World Message)
app.get( "/", function ( req, res )
{
    res.send( "Hello world" );
} );

// TODO: make two more routes

// Route 1
// =======

app.get( "/all", function ( req, res )
{
    // Query: In our database, go to the animals collection, then "find" everything
    db.scraper.find( {}, function ( err, data )
    {
        console.log( "Connected to DB" )
        // Log any errors if the server encounters one
        if ( err )
        {
            console.log( err );
        }
        else
        {
            // Otherwise, send the result of this query to the browser
            res.json( data );
        }
    } );
} );
// This route will retrieve all of the data
// from the scrapedData collection as a json (this will be populated
// by the data you scrape using the next route)

// Route 2
// @ts-ignore

app.get( "/scrape", function ( req, res )
{
    // @ts-ignore
    axios.get( "https://www.tmz.com" ).then( function ( response )
    {

        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load( response.data );

        // An empty array to save the data that we'll scrape
        var results = [];

        // With cheerio, find each p-tag with the "title" class
        // (i: iterator. element: the current element)
        $( "article" ).each( function ( i, element )
        {

            // Save the text of the element in a "title" variable
            var title = $( element ).find( "h2" ).find( "span" ).text()

            // In the currently selected element, look at its child elements (i.e., its a-tags),
            // then save the values for any "href" attributes that the child elements may have
            var link = $( element ).find( "a" ).attr( "href" )

            var img = $( element ).find( "img" ).attr( "src" )

            var sum = $( element ).find( "p" ).text()

            if ( title && link && img && sum )
            {
                db.scraper.insert( { title: title, link: link, img: img, sum: sum }, function ( err, inserted )
                {
                    if ( err )
                    {
                        console.log( err )
                    } else
                    {
                        console.log( inserted )
                    }
                } )
            }



        } );

        // Log the results once you've looped through each of the elements found with cheerio
        console.log( results );
    } )
} )



// Listen on port 3000
app.listen( 3000, function ()
{
    console.log( "App running on port 3000!" );
} );