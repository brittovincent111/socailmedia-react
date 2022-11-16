const express = require('express')
const { verify } = require('jsonwebtoken')
const router = express.Router()
const {AdminLogin, userManagment, BlockUser, UnBlockUser, dashboard} = require("../../Controller/admin/adminController")
const verifyJWT = require('../../MiddleWare/Verify')


router.post('/login' , AdminLogin )

router.get('/dashboard', verifyJWT ,dashboard )

router.get('/usermanagment' ,userManagment )

router.put('/block/:id' , BlockUser)

router.put('/unblock/:id' , UnBlockUser)

module.exports = router;