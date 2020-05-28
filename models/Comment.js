var mongoose = require( "mongoose" );

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var CommentSchema = new Schema( {
    // `user` is a type of string
    user: String,
    // `title` is of type String
    title: String,
    // `body` is of type String
    body: String,

    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `Article`
    }

} );

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model( "Comment", CommentSchema );

// Export the Note model
module.exports = Comment