let  express = require('express');
const router = express.Router()
const { createGroup,  Groupe, groupDetails, joinGroup, addPost, viewGroupPost, likePost, commentPost, viewComments, groupUpdate, removeMember, groupMembers, reportPost, deletePost, viewGroups, leaveGroup, deleteGroup } = require('../../Controller/group/groupController');




router.post('/create' , createGroup )
router.get('/suggestions', Groupe)
router.get('/viewAll/:userId' , viewGroups)
router.get('/:groupId', groupDetails )
router.post('/join/:userId', joinGroup )
router.post('/update' , groupUpdate)
router.get('/members/:groupId' , groupMembers )
router.post('/remove/:id' , removeMember)
router.post('/post' , addPost)
router.put('/like/post/:id' , likePost )
router.put('/comment/post/:id' , commentPost )
router.get('/post/:groupId' , viewGroupPost)
router.get('/viewcomment/post/:id' , viewComments )
router.post('/post/report/:postId' , reportPost)
router.post('/post/delete/:id' , deletePost )
router.put('/leave/:groupId' , leaveGroup)
router.post('/delete/:groupId' , deleteGroup )





module.exports = router