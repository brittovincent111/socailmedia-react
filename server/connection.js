const mongoose = require('mongoose')
const mongoURL = "mongodb://localhost:27017/socialmedia"

const connectedToMongo =()=>{
    mongoose.connect(mongoURL,()=>{
        console.log('connected to database')
    })
}

module.exports = connectedToMongo;
