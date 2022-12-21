const mongoose = require('mongoose')
const mongoURL = "mongodb://localhost:27017/socialmedia"
// const mongoURL = "mongodb+srv://brittovincent111:br2287476@dressup.y5evuyx.mongodb.net/wemeet?retryWrites=true&w=majority"

const connectedToMongo =()=>{
    mongoose.connect(mongoURL,()=>{
        console.log('connected to database')
    })
}

module.exports = connectedToMongo;
