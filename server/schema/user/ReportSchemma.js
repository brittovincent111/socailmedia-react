const mongoose = require ('mongoose')
const {Schema} = mongoose;


const reportSchema = new Schema({

    postId : {
        type: String ,
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
const ReportModel = mongoose.model("Report" , reportSchema)
module.exports = ReportModel 