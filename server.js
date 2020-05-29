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

//if deployed, use the deployed database. Otherwise use the local mogoHeadlines database 
var MONGODB_URI ="mongodb://user1:password1@ds111598.mlab.com:11598/heroku_f43prgkr"  || "mongodb://localhost/mongoHeadlines"
// Connect ot the Mongo DB
mongoose.connect(MONGODB_URI)


// Listen on port 3000
app.listen( 3000, function ()
{
    console.log( "App running on port 3000!" );
} );

module.exports = app;