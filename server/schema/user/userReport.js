const mongoose = require ('mongoose')
const {Schema} = mongoose;


const userReportSchema = new Schema({

    reporterId : {
        type : mongoose.Schema.Types.ObjectId , 
      
            ref:"user",
            require : true
    },

    userId : {
        type : mongoose.Schema.Types.ObjectId , 
      
            ref:"user",
            require : true
    },

    reason :{
        type : String ,
        require : true

    }

},{timestamps :true})
const userReportModel = mongoose.model("userReport" , userReportSchema)
module.exports = userReportModel 