const mongoose = require ('mongoose')
const {Schema} = mongoose;

const groupCommentSchema = new Schema({

    postId : {
        type : String,
        require : true
    },
    groupId : {
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


const groupCommentSchemma = mongoose.model('groupcomment', groupCommentSchema)

module.exports= groupCommentSchemma