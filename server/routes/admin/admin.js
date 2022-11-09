const express = require('express')
const router = express.Router()
const {AdminLogin, userManagment, BlockUser, UnBlockUser} = require("../../Controller/admin/adminController")


router.post('/login' , AdminLogin )

router.get('/usermanagment' ,userManagment )

router.put('/block/:id' , BlockUser)

router.put('/unblock/:id' , UnBlockUser)

module.exports = router;