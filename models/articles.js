
//require mangoose
var mongoose = require("mongoose"); 

//create the mangoose schema       
const Schema = mongoose.Schema; 

const ArticleSchema = new Schema({

    title: {
        type: String, 
        require: true,
    },
    image: {
        type: String,
    },

    link: {
        type: String, 
        
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    dateCreated: Date,
    
})

const Articles = mongoose.model("Articles",ArticleSchema); 

module.exports = Articles; 