const mongoose = require('mongoose')
const { Schema } = mongoose;


const postGroupSchemmaS = new Schema({


   userId: {
      type : mongoose.Schema.Types.ObjectId , 
      
            ref:"user",
            require : true
   },
   groupId: {
      type: String,
      required: true
   },
   desc: {
      type: String,
      required: true

   },
   img: {

      type: String,


   },
   reports: {
      type: Array,
      default: []
   },


   likes: {
      type: Array,
      default: []
   },

   status: {
      type: String,
      default: "Active"
   },

},
   { timestamps: true })

const postGroupSchemma = mongoose.model('grouppost', postGroupSchemmaS)

module.exports = postGroupSchemma