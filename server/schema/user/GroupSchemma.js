const mongoose = require('mongoose')
const { Schema } = mongoose;

const groupSchemma = new Schema({

    groupName: {

        type: String
    },

    groupProfile: {

        type: String
    },
    admin: {

        type : mongoose.Schema.Types.ObjectId , 
      
            ref:"user",
            require : true
    },
    about : {

        type : String ,       
          
    },

    groupMembers:
        [{

            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "user"



        }],
    postId:
        [{

            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "groupPost"



        }],

    admin: {
        type: String,
    }

})

const GroupSchemma = mongoose.model('group', groupSchemma)

module.exports= GroupSchemma