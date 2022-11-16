const express = require('express')
const router = express.Router()
const {userSignUp, userLogin, userFeed, userDetails, followUsers, AdduserPost, timeLinePosts, postDetails, likePost} = require("../../Controller/user/userController")
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
router.get('/users' , userDetails) 
router.put('/follow/:id' , followUsers)
router.get('/post/timeline/:id' , timeLinePosts)
router.get('/postdetails/:id' , postDetails )
router.put('/like/post/:id' , likePost )


module.exports = router;