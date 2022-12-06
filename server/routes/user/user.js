const express = require('express')
const router = express.Router()
const {userSignUp, userLogin, userFeed, userDetails, followUsers, AdduserPost, timeLinePosts, postDetails, likePost, commentPost, viewComments, viewProfile, friendRequest, acceptRequest,  declineRequest,  unfollow, cancelRequest, viewProfilePosts, savePost, savedPost, findUser, reportPost, deletePost, editProfile, editPost, searchUsers, notificationShow, notificationRead} = require("../../Controller/user/userController")
const verifyJwtUser = require('../../MiddleWare/VerifyUser')
const { imageUpload } = require('../../Controller/imageuplod/imageupload');



/* ------------------------------ IMAGE UPLOAD ------------------------------ */


router.post('/upload', imageUpload)

/* ---------------------------------- USER ---------------------------------- */

router.post('/signup' , userSignUp)
router.post('/login' , userLogin)
router.get('/' ,  userFeed )
router.get('/suggest/:id' , userDetails) 
router.get('/:id' ,findUser )
router.get('/find/user/:val' , searchUsers)
router.get('/notification/:userId' , notificationShow)
router.put('/notification/viewed/:userId' , notificationRead)



/* ------------------------------ USER FRIENDS ------------------------------ */

router.put('/follow/:id' , followUsers)
router.get('/friendRequest/:id' ,friendRequest  )
router.put('/acceptRequest/:id' , acceptRequest  )
router.put('/declineRequest/:id' , declineRequest  )
router.put('/cancelRequest/:id' ,cancelRequest  )
router.put('/unfollow/:id' , unfollow  )
router.get('/userprofile/:id' , viewProfile )
router.post('/update/:userId' , editProfile)

/* ---------------------------------- POSTS --------------------------------- */

router.post('/post' ,AdduserPost) 
router.get('/post/timeline/:id' , timeLinePosts)
router.get('/postdetails/:id' , postDetails )
router.put('/like/post/:id' , likePost )
router.put('/comment/post/:id' , commentPost )
router.get('/viewcomment/post/:id' , viewComments )
router.get('/viewProfilePosts/:id' , viewProfilePosts )
router.put('/savepost/:id' , savePost  )
router.get('/savedpost/:id' , savedPost  )
router.put('/post/report/:id' ,reportPost)
router.put('/post/delete/:id' , deletePost )
router.put('/post/edit' , editPost)














module.exports = router;