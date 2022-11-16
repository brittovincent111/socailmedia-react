const mongoose = require('mongoose')
const {Schema} = mongoose;


const UserSchema = new Schema({

    username :{
        type : String,
        required : true 

    },

    email : {
        type : String ,
        required : true
    },

    password : {
        type : String ,
        required : true
    },

    date : {
        type : Date , 
        default : Date.now
    },

    status : {
        type  :  String ,
        default : "Active"
    },

    requestTo : {
        type : Array,
        default : []
       
    },
    requestFrom : {
        type : Array,
        default : []
       
    }
    ,
    following : {
       type : Array,
       default : []
    }
})

const userSchemma = mongoose.model('user', UserSchema)

module.exports=userSchemma