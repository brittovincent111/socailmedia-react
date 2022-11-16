const mongoose = require ('mongoose')
const {Schema} = mongoose;


const postSchemmas  = new Schema({
      

   userId : {
      type : String ,
      required : true
   },
     desc : {
        type : String , 
        required : true

     },
     img:{

        type : String , 
       

     },

    
    likes:{
      type: Array ,
      default :[]
    },

    status : {
        type  :  String ,
        default : "Active"
    },
    
},
{timestamps:true})

const postSchemma = mongoose.model('post', postSchemmas)

module.exports= postSchemma