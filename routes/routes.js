var db = require( "../models" );

// Require axios and cheerio. This makes the scraping possible
var axios = require( "axios" );
var cheerio = require( "cheerio" );

module.exports = function ( app )
{


    // main route to display all current articles
    app.get( "/", function ( req, res )
    {
        res.redirect( "/all" )

    } )


    //  Function to get all data from the database
    app.get( "/all", function ( req, res )
    {
        // Grab every document in the Articles collection
        db.Article.find( {} ).sort( { _id: -1 } )
            .then( async function ( dbArticle )
            {
                // console.log( dbArticle )
                Promise.all( dbArticle.map( async function ( article )
                {
                    return {


                        id: article._id,
                        title: article.title,
                        link: article.link,
                        img: article.img,
                        sum: article.sum,
                        comments: ( await db.Comment.find( { articleId: article._id } ) ).map( function ( comment )
                        {
                            return {


                                user: comment.user,
                                title: comment.title,
                                body: comment.body
                            }

                        } )




                    }

                } ) ).then( function ( object )
                {

                    console.log( object )
                    res.render( "articles", { article: object } );

                } )





                // If we were able to successfully find Articles, send them back to the client

            } )
            .catch( function ( err )
            {
                // If an error occurred, send it to the client
                res.json( err );
                res.render( "404" );
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
                    // res.render( "404" );
                } );

                // Send a message to the client **update with redirect to correct handlebars view



            } )
            res.redirect( "/all" );
        } )




    } );


    // load add comment page
    app.get( "/add/:id", function ( req, res )
    {
        var id = {
            id: req.params.id
        }
        res.render( "comment", id )
    } )




    // Route for saving a comment
    app.post( "/create/", function ( req, res )
    {
        db.Comment.create( req.body ).then( function ( dbComment )
        {
            // return db.Article.findOneAndUpdate( { _id: req.params.articleId }, { comment: dbComment._id }, { new: true } )
            console.log( dbComment )
        } ).catch( function ( err )
        {
            console.log( err )
            res.render( "404" )

        } )
        res.redirect( "/all" );

    } )







    // Render 404 page for any unmatched routes
    app.get( "*", function ( req, res )
    {
        res.render( "404" );
    } );













}