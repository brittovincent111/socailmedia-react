let  express = require('express');
const router = express.Router()
const { createGroup,  Groupe, groupDetails, joinGroup, addPost, viewGroupPost, likePost, commentPost, viewComments, groupUpdate, removeMember, groupMembers, reportPost, deletePost, viewGroups, leaveGroup, deleteGroup } = require('../../Controller/group/groupController');
const verifyJwtUser = require('../../MiddleWare/VerifyUser')




router.post('/create',  createGroup )
router.get('/suggestions',verifyJwtUser , Groupe)
router.get('/viewAll/:userId' ,verifyJwtUser , viewGroups)       
router.get('/:groupId',verifyJwtUser , groupDetails )
router.post('/join/:userId',verifyJwtUser , joinGroup )     
router.post('/update' ,verifyJwtUser , groupUpdate)
router.get('/members/:groupId' ,verifyJwtUser , groupMembers )
router.post('/remove/:id' ,verifyJwtUser , removeMember)
router.post('/post' ,verifyJwtUser , addPost)
router.put('/like/post/:id' ,verifyJwtUser , likePost )
router.put('/comment/post/:id' ,verifyJwtUser , commentPost )
router.get('/post/:groupId' ,verifyJwtUser , viewGroupPost)
router.get('/viewcomment/post/:id' ,verifyJwtUser , viewComments )
router.post('/post/report/:postId' ,verifyJwtUser , reportPost)
router.post('/post/delete/:id' ,verifyJwtUser , deletePost )
router.put('/leave/:groupId' ,verifyJwtUser , leaveGroup)
router.post('/delete/:groupId' ,verifyJwtUser , deleteGroup )





module.exports = router