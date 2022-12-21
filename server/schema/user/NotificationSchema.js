const mongoose = require ('mongoose')
const {Schema} = mongoose;

const NotificationModel = new Schema({


    userId : {
        type : String
    },
    notification:[{
        user : {

            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "user"

        },
        desc : {
            type:String
        },
        time:{
            type:Date,
        },
        status:{
            type:String,
            default: "true"
        }
        
},{timeStamps:true}]

})

const notificationSchemma = mongoose.model('notification', NotificationModel)

module.exports= notificationSchemma