let ChatModel = require('../../schema/user/ChatModal')
const controller = {

    /* ------------------------------- create chat ------------------------------ */

    createChat: async (req, res) => {

        const { senderId, receivedId } = req.body.users
        const newChat = new ChatModel({
            members: [senderId, receivedId]

        })

        try {
            const chat = await ChatModel.findOne({
                members: { $all: [senderId, receivedId] }
            })


            if (!chat) {
                const result = await newChat.save();
                res.status(200).json(result)

            } else {
                res.status(200).json(chat)
            }


        } catch (error) {

            res.status(500).json(error)
        }
    },

    /* -------------------------------- user chat ------------------------------- */
    
    userChats: async (req, res) => {

        try {
            const chat = await ChatModel.find({
                members: { $in: [req.params.userId] }
            })
            res.status(200).json(chat)

        } catch (error) {

            res.status(500).json(error)


        }


    },

    /* -------------------------------- find chat ------------------------------- */

    findChat: async (req, res) => {

        try {

            const chat = await ChatModel.findOne({
                members: { $all: [req.params.firstId, req.params.secondId] }
            })

            res.status(200).json(chat)

        } catch (error) {
            res.status(500).json(error)
        }


    }


}

module.exports = controller