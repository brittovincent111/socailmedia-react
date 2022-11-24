const mongoose = require ('mongoose')
const {Schema} = mongoose;

const MessageScheema = new Schema({

    chatId:{

        type : String
    },
    senderId : {

        type:String
    },
    text : {
        type: String
    }
},{timestamps:true})

const MessageModel = mongoose.model("Message" , MessageScheema)
module.exports = MessageModel