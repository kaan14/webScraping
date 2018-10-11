
//require mangoose
const mongoose = reqiure('mangoose'); 

//create the mangoose schema       
const Schema = mongoose.Schema; 

const ArticleSchema = new Schema({

    title: {
        type: String, 
        require: true,
    },

    link: {
        type: String, 
        require: true,
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: "Comments"
    },
    dateCreated: date.now,
    
})

const Articles = mongoose.model("Articles",ArticleSchema); 

module.exports = Articles; 