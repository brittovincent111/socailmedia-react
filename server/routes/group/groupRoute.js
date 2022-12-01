let  express = require('express');
const router = express.Router()
const { createGroup,  Groupe, groupDetails, joinGroup, addPost, viewGroupPost, likePost, commentPost, viewComments, groupUpdate, removeMember, groupMembers } = require('../../Controller/group/groupController');



router.post('/create' , createGroup )
router.get('/suggestions', Groupe)
router.get('/:groupId', groupDetails )
router.post('/join/:userId', joinGroup )
router.post('/post' , addPost)
router.get('/post/:groupId' , viewGroupPost)
router.put('/like/post/:id' , likePost )
router.put('/comment/post/:id' , commentPost )
router.get('/viewcomment/post/:id' , viewComments )
router.post('/update' , groupUpdate)
router.get('/members/:groupId' , groupMembers )
router.post('/remove/:id' , removeMember)




module.exports = router