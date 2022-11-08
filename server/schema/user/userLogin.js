const mongoose = require('mongoose')

const LoginForm = new mongoose.Schema({

    username :{
        type:String,
        required:true

    },

    password : {
        type: String , 
        required : true
    }

})