let ChatModel = require('../../schema/user/ChatModal')
const controller = {

    createChat : async(req,res)=>{

        const newChat = new ChatModel({
            members :[req.body.senderId , req.body.receviedId]

        })

        try{
            const result = await newChat.save();
            res.status(200).json(result)

        }catch(error){

            res.status(500).json(error)
        }
    },

    userChats : async(req,res)=>{

        try{

            console.log(req.params.id , "iddddddddddd")

            const chat = await ChatModel.find({
                members : {$in : [req.params.userId]}
        })

        console.log(chat ,"chat")

        res.status(200).json(chat)

        }catch(error){

            console.log(error.message)
             
        }


    },

    findChat: async(req,res)=>{

        try{
             

            console.log(req.params.firstId , "iddddddddddd")

            const chat = await ChatModel.findOne({
                  members:{$all:[req.params.firstId , req.params.secondId]} 
            })
          
             console.log(chat , dddddddd);
            res.status(200).json(chat)

        }catch(error){
            res.status(500).json(error)
        }


    }


}

module.exports =controller