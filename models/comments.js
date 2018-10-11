
const mongoose = reqiure('mongoose'); 
const Schema = mongoose.schema; 


const CommentsSchema = new Schema({
    //get comment's title
    title: String,
    // comments 
    body:String,
    //get the created date
    dateCreated: date.now,
    //get the updated date
    dateUpdated: date.now
});

const Comments = mongoose.model("Comments",CommentsSchema);

module.exports = Comments; 
