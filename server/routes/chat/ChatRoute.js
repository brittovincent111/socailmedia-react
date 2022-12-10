let  express = require('express');
const router = express.Router()


const { createChat, findChat, userChats } = require('../../Controller/Chat/ChatController')

router.post("/", createChat )
router.get("/:userId" , userChats)
router.get("/find/:firstId/:secondId" , findChat)    

module.exports = router;