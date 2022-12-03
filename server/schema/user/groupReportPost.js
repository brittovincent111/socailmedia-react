const mongoose = require ('mongoose')
const {Schema} = mongoose;


const groupPostReportSchema = new Schema({

    postId : {
        type: String ,
        require : true
    },
    groupId:{

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
const groupPostReportModel = mongoose.model("groupPostReport" , groupPostReportSchema)
module.exports = groupPostReportModel 