const express = require('express')
const { verify } = require('jsonwebtoken')
const router = express.Router()
const {AdminLogin, UnBlockGroupPost,blockGroupPost  , userManagment, BlockUser, UnBlockUser, dashboard, viewReportedPost, blockPost, UnBlockPost, viewSingleReport, viewGroupReportedPost, viewGroupSingleReport, viewUserSingleReport} = require("../../Controller/admin/adminController")
const verifyJWT = require('../../MiddleWare/Verify')


router.post('/login' , AdminLogin )
router.get('/dashboard', verifyJWT ,dashboard )
router.get('/usermanagment' , verifyJWT,userManagment )
router.get('/usermanagment/:userId' , viewUserSingleReport  )
router.put('/block/:id' , BlockUser)
router.put('/unblock/:id' , UnBlockUser)
router.put('/post/block/:id' , blockPost)
router.put('/post/unblock/:id' , UnBlockPost)
router.put('/group/post/block/:id' , blockGroupPost)
router.put('/group/post/unblock/:id' , UnBlockGroupPost)
router.get('/report/postmanagment', viewReportedPost )
router.get('/viewreport/postmanagment/:postId' , viewSingleReport  )
router.get('/group/report/postmanagment' , viewGroupReportedPost )
router.get('/group/viewreport/postmanagment/:postId' , viewGroupSingleReport  )



module.exports = router;