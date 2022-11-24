
let MessageModel = require('../../schema/user/Message')

const controller = {

    addMessage: async (req, res) => {


        const { chatId, senderId, text } = req.body
        const message = new MessageModel ({
            chatId,
            senderId,
            text

        })

        try {
            
            console.log("hiiiiiiiiiii")
            const result = await message.save()
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getMessages: async (req, res) => {

       

        try {
            const result = await MessageModel.find({ chatId : req.params.chatId })
            res.status(200).json(result)
            console.log(result , "where are you")
        } catch (error) {


            res.status(500).json(error)

        }
    }

}
module.exports = controller