const mongoose = require('mongoose')
const {Schema} = mongoose;

const ChatModalScheema = new Schema({

    members :{
        type:Array
    }


},{timestamps:true})


const ChatModel = mongoose.model("Chat", ChatModalScheema)
module.exports =  ChatModel

