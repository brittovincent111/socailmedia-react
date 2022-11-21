const mongoose = require('mongoose')
const {Schema} = mongoose;


const UserSchema = new Schema({
    userfullname :{
        type : String,
        required : true 

    },

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

    requestTo : 
        [{
            list: {
                type: mongoose.Schema.Types.ObjectId,
                require: true,
                ref: "user"
            }
      
       
    }]
      
       
    ,
    requestFrom : 
        [{
            list: {
                type: mongoose.Schema.Types.ObjectId,
                require: true,
                ref: "user"
            }
      
       
    }]
    
    ,
    following : 
    [{
     
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "user"
     
  
   
}]
})

const userSchemma = mongoose.model('user', UserSchema)

module.exports=userSchemma