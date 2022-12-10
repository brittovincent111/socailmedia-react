const mongoose = require ('mongoose')
const {Schema} = mongoose;


const otpSchemmas  = new Schema({
      

    user : {
      type : String ,
      required : true
   },
   otp : {
    type : String ,
    required : true

   },
   created : {

    type : Date ,
    require : true
},
Expiry :{
    type : Date ,
    require: true


}
})

const otpSchemma = mongoose.model('otp', otpSchemmas)

module.exports= otpSchemma
