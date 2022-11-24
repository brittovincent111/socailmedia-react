const express = require('express')
const router = express.Router()
const {userSignUp, userLogin, userFeed, userDetails, followUsers, AdduserPost, timeLinePosts, postDetails, likePost, commentPost, viewComments, viewProfile, friendRequest, acceptRequest,  declineRequest,  unfollow, cancelRequest, viewProfilePosts, savePost, savedPost, findUser} = require("../../Controller/user/userController")
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


router.post('/upload', upload.single('file'), (req, res) => {
    console.log("hey reached");
    try {
        res.json("success")
    } catch (error) {
        res.json(error)
    }
})


router.post('/signup' , userSignUp)
router.post('/login' , userLogin)
router.get('/' ,  userFeed )
router.post('/post' ,AdduserPost) 
router.get('/users/:id' , userDetails) 


router.put('/follow/:id' , followUsers)
router.get('/post/timeline/:id' , timeLinePosts)
router.get('/postdetails/:id' , postDetails )
router.put('/like/post/:id' , likePost )
router.put('/comment/post/:id' , commentPost )
router.get('/viewcomment/post/:id' , viewComments )
router.get('/userprofile/:id' , viewProfile )
router.get('/viewProfilePosts/:id' , viewProfilePosts )


router.get('/friendRequest/:id' ,friendRequest  )
router.post('/acceptRequest/:id' , acceptRequest  )
router.post('/declineRequest/:id' , declineRequest  )
router.post('/cancelRequest/:id' ,cancelRequest  )
router.put('/savepost/:id' , savePost  )
router.get('/savedpost/:id' , savedPost  )



router.post('/unfollow/:id' , unfollow  )


router.get('/:id' ,findUser )











module.exports = router;