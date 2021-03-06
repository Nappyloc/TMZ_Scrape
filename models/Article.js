var mongoose = require( "mongoose" );

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Article Schema Model
var ArticleSchema = new Schema( {
  // `title` is required and of type String
  title: {
    type: String,
    unique: true,
    required: true
  },
  // `link` is required and of type Strin
  link: {
    type: String,
    required: true
  },
  // `sum` is required and a type of String   
  sum: {
    type: String,
    required: true
  },

  // `img` is required and a type of String  
  img: {
    type: String,
    required: true
  },
  comment: {
    // `comment` is an object that stores a Comment id
    // The ref property links the ObjectId to the Comment model
    // This allows us to populate the Article with an associated Comment
    type: mongoose.Schema.Types.ObjectId,
    ref: `Comments`
  }



} );

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model( "Article", ArticleSchema );

// Export the Article model
module.exports = Article;
