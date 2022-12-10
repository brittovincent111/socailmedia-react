const express = require('express')
const router = express.Router()
const {userSignUp, userLogin,resendOtp , userFeed, userDetails, followUsers, AdduserPost, timeLinePosts, postDetails, likePost, commentPost, viewComments, viewProfile, friendRequest, acceptRequest,  declineRequest,  unfollow, cancelRequest, viewProfilePosts, savePost, savedPost, findUser, reportPost, deletePost, editProfile, editPost, searchUsers, notificationShow, notificationRead, reportUser, userOtpLogin, verifyOtp} = require("../../Controller/user/userController")
const verifyJwtUser = require('../../MiddleWare/VerifyUser')
const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './public/images');
    },
    filename(req, file, callback) {
        callback(null,file.originalname);
    },
});

const upload = multer({ storage:storage});


/* ------------------------------ IMAGE UPLOAD ------------------------------ */


router.post('/upload', upload.single('file'), (req, res) => {
    console.log("hey reached");
    try {
        res.json("success")
    } catch (error) {
        res.json(error)
    }
})

/* ---------------------------------- USER ---------------------------------- */

router.post('/signup'  , userSignUp)
router.post('/login'  , userLogin)
router.post('/login/otp/:email'  , userOtpLogin)
router.post('/verify/otp'  , verifyOtp)
router.post('/resend/otp/:email' , resendOtp)


router.get('/' ,verifyJwtUser,  userFeed )
router.get('/suggest/:id' ,verifyJwtUser, userDetails) 
router.get('/:id' ,verifyJwtUser,findUser )
router.get('/find/user/:val' ,verifyJwtUser, searchUsers)
router.get('/notification/:userId' ,verifyJwtUser, notificationShow)
router.put('/notification/viewed/:userId' ,verifyJwtUser, notificationRead)



/* ------------------------------ USER FRIENDS ------------------------------ */

router.get('/friendRequest/:id',verifyJwtUser ,friendRequest  )
router.put('/follow/:id',verifyJwtUser , followUsers)
router.put('/acceptRequest/:id',verifyJwtUser , acceptRequest  )
router.put('/declineRequest/:id',verifyJwtUser , declineRequest  )
router.put('/cancelRequest/:id',verifyJwtUser ,cancelRequest  )
router.put('/unfollow/:id',verifyJwtUser , unfollow  )
router.get('/userprofile/:id',verifyJwtUser , viewProfile )
router.post('/update/:userId',verifyJwtUser , editProfile)
router.post('/report/:userId',verifyJwtUser , reportUser)

/* ---------------------------------- POSTS --------------------------------- */

router.post('/post' ,AdduserPost) 
router.get('/post/timeline/:id',verifyJwtUser , timeLinePosts)
router.get('/postdetails/:id',verifyJwtUser , postDetails )
router.put('/like/post/:id',verifyJwtUser , likePost )
router.put('/comment/post/:id' ,verifyJwtUser, commentPost )
router.get('/viewcomment/post/:id' ,verifyJwtUser, viewComments )
router.get('/viewProfilePosts/:id',verifyJwtUser , viewProfilePosts )
router.put('/savepost/:id' ,verifyJwtUser, savePost  )
router.get('/savedpost/:id' , verifyJwtUser , savedPost  )
router.put('/post/report/:id',verifyJwtUser ,reportPost)
router.put('/post/delete/:id',verifyJwtUser , deletePost )
router.put('/post/edit', editPost)














module.exports = router;