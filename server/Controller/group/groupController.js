
const groupCommentSchemma = require("../../schema/user/GroupComment")
const postGroupSchemma = require("../../schema/user/groupPostSchemma")
const groupPostReportModel = require("../../schema/user/groupReportPost")
const GroupSchemma = require("../../schema/user/GroupSchemma")
const userSchemma = require("../../schema/user/signUp")



const controller = {

  createGroup: async (req, res) => {


    try {


      console.log(req.body, "req.body")

      await GroupSchemma.create(req.body).then((response) => {

        console.log(response, "response")

        res.status(200).json(response)
      })

    } catch (error) {

      console.log(error)
    }

  },


  Groupe: async (req, res) => {

    try {
      console.log("hiiiiiiiiii")
      console.log("drftgh8uht7idscjsfdc");

      await GroupSchemma.find().then((response) => {

        res.status(200).json(response)
      })



    } catch (error) {


      res.status(500).json(error)
    }
  },

  groupDetails: async (req, res) => {

    console.log(req.params.groupId, "paramassssssssssssssssssssssssidddddddddddddddddddddd")

    try {

      let groupDet = await GroupSchemma.findOne({ _id: req.params.groupId })

      res.status(200).json(groupDet)

      console.log(groupDet, "group detailsssssssssssssssssssss");



    } catch (error) {



      res.status(500).json(error)



    }
  },

  joinGroup: async (req, res) => {

    console.log("call reached")


    try {

      let join = await GroupSchemma.updateOne({ _id: req.body.groupId }, { $addToSet: { groupMembers: req.params.userId } })

      console.log(join, "joinnnnnnnnnn")

      res.status(200).json("updated")
    } catch (error) {

      res.status(500).json(error)
      console.log(error.message)


    }
  },

  addPost: async (req, res) => {

    try {
      console.log(req.body, "postbody")
      let postUpload = await postGroupSchemma.create(req.body)

      res.status(200).json("postUpload")
    } catch (error) {

      res.status(500).json(error)
    }

  },

  viewGroupPost: async (req, res) => {

    console.log(req.params.groupId, "hiiiiiiiiiiiiiiii");

    try {

      let response = await postGroupSchemma.find({ groupId: req.params.groupId }).populate('userId')

      console.log(response, "groupPosts")
      res.status(200).json(response)


    } catch (error) {

      console.log(error.message);
      res.status(500).json(error)


    }


  },
  likePost: async (req, res) => {
    console.log(req.body.userId, req.params.id, "kkkkkkkkkkkkk")

    try {

      console.log("jjjjjjjjjjjjjjjjjj")
      const post = await postGroupSchemma.findById(req.params.id)

      console.log(post)

      if (post.likes.includes(req.body.userId)) {

        await post.updateOne({ $pull: { likes: req.body.userId } })

        res.status(200).json("unliked")
      } else {


        await post.updateOne({ $push: { likes: req.body.userId } })
        res.status(200).json("liked ")


      }



    } catch (error) {


      console.log(error.message)


    }


  },
  commentPost: async (req, res) => {

    try {

      // console.log(req.params.id, "idddddddd")
      console.log(req.body, "hiiiiiihelooooooo")

      const postId = req.params.id
      const { userId, comment, groupId } = req.body


      let response = await groupCommentSchemma.create({
        groupId,
        userId,
        comment,
        postId: postId
      })

      res.status(200).json("updated")



    } catch (error) {

      console.log(error.message)



    }
  },
  viewComments: async (req, res) => {
    console.log(req.params.id, "hiiiiiiiiiiiiiiiii")

    const postID = req.params.id

    await groupCommentSchemma.find({ postId: postID }).populate('userId').then((response) => {

      console.log(response, "commentdetailssssssssssss")
      res.status(200).json(response)
    }).catch((error) => {

      console.log(error.message)
      res.status(401).json(error)
    })



  },
  groupUpdate: async (req, res) => {

    try {

      console.log(req.body, "update bodyyyyy")
      const { groupId } = req.body

      let updateGroup = await GroupSchemma.updateOne({ _id: groupId }, {
        $set: req.body
      })

      res.status(200).json("updated")

    } catch (error) {


      console.log(error.message)
    }



  },

  removeMember : async(req,res)=>{

    console.log(req.params.id , req.body ,"ifrerwefwsdsfd")


   try{

    
    let data = await GroupSchemma.updateOne({_id : req.body.groupId},{$pull : {groupMembers : req.params.id}})
       

    res.status(200).json(data)
   }catch(error){

    console.log(error ,"errrorrrrr")

    res.status(200).json(error)




   }
    
  },

  groupMembers : async(req,res)=>{
      
    console.log(req.params.groupId , "groupppppppppppppidddddddddddddddd")
    try{

         
      let groupDet = await GroupSchemma.findOne({ _id: req.params.groupId }).populate('groupMembers')
      

      console.log(groupDet , "grooupmemberssssssssssssssssssssssssidddddddddddddddddddddddddddddd")
      res.status(200).json(groupDet.groupMembers)

    }catch(error){

      res.status(500).json(error)

    }


  },

  /* ------------------------------ report group ------------------------------ */



  reportPost : async(req,res)=>{


    console.log(req.body)
    let postId = req.params.postId
    let {userId  ,groupId , reportValue} = req.body


    try{
      let response = await postGroupSchemma.updateOne({_id: postId},{$addToSet :{ reports : userId }})

      let data = await groupPostReportModel.create({
        userId : userId,
        postId : postId,
        groupId : groupId,
        reason : reportValue
      }) 

      console.log(response , data )
      res.json(200).status("updated")
}catch(error){
 

  console.log(error.message)
  res.status(500).json(error)


}
  },

  deletePost :async(req,res)=>{
     

    try{
      console.log(req.params.id)
      const postId = req.params.id
      let deletePost = await postGroupSchemma.deleteOne({_id : postId})
      let comment = await groupCommentSchemma.deleteMany({postId : postId})
      let saved = await userSchemma.updateMany({ $pull :{savedPost : postId}})
  
      console.log(deletePost , "saved");
      console.log(comment , "saved");
  
      console.log(saved , "saved");
      res.status(200).json("deleted")
    }catch(error){
      res.status(500).json("Notdeleted")

      console.log(error.message , "delete error message")
    }
   
  },

  viewGroups :async(req,res)=>{

    console.log(req.params.userId ,"myname is sdafasdfsadfasdf")
    try{

      let data = await GroupSchemma.find({ $or: [ { admin: req.params.userId }, { groupMembers : {$in:[req.params.userId]} } ] })
       

      console.log(data , "dataaaaaaaaaaaa")
      res.status(200).json(data)
    }catch(error){
      
      res.status(500).json(error.message)
      console.log(error.message ,"messsssssssssssssssageeeeeeeeeeeeeeee")


    }
  }





}


module.exports = controller