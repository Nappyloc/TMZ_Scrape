// Dependencies
var express = require( "express" );
var exphbs = require( "express-handlebars" );
// var mongojs = require( "mongojs" );
var logger = require( "morgan" );
var mongoose = require( "mongoose" );

// Require all models
var db = require( "./models" );


// Initialize Express
var app = express();
var PORT = process.env.PORT || 3000

// Use morgan logger for logging requests
app.use( logger( "dev" ) );
// Parse request body as JSON
app.use( express.urlencoded( { extended: false } ) );
app.use( express.json() );
// Make public a static folder
app.use( express.static( "public" ) );


// Make handlebars view default
app.engine(
    "handlebars",
    exphbs( {
        defaultLayout: "main"
    } )
);
app.set( "view engine", "handlebars" );


// Add Routes Here
require( "./routes/routes" )( app );

// Connect to the Mongo DB
mongoose.connect( "mongodb://localhost/tmz", { useNewUrlParser: true, useUnifiedTopology: true } );


// // Database configuration
// var databaseUrl = "tmz";
// var collections = [ "scraper" ];

// // Hook mongojs configuration to the db variable
// var db = mongojs( databaseUrl, collections );
// db.on( "error", function ( error )
// {
//     console.log( "Database Error:", error );
// } );



// Listen on port 3000
app.listen( 3000, function ()
{
    console.log( "App running on port 3000!" );
} );

module.exports = app;