const mongoose = require ('mongoose')
const {Schema} = mongoose;

const CommentSchema = new Schema({

    postId : {
        type : String,
        require : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId , 
      
            ref:"user",
            require : true
        
    },
    comment : {
        type: String , 
        reuired : true
    },

},{timestamps:true})


const commentSchemma = mongoose.model('comment', CommentSchema)

module.exports= commentSchemma