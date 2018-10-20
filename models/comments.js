
var mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 


const CommentSchema = new Schema({
    //get comment's title
    title: String,
    // comments 
    body:String,
    //get the created date
    dateCreated: Date,
    //get the updated date
    dateUpdated: Date
});

const Comment = mongoose.model("Comment",CommentSchema);

module.exports = Comment; 