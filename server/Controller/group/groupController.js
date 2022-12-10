
const groupCommentSchemma = require("../../schema/user/GroupComment")
const postGroupSchemma = require("../../schema/user/groupPostSchemma")
const groupPostReportModel = require("../../schema/user/groupReportPost")
const GroupSchemma = require("../../schema/user/GroupSchemma")
const userSchemma = require("../../schema/user/signUp")



const controller = {


  /* ------------------------------ Create Group ------------------------------ */

  createGroup: async (req, res) => {
    try {

      let response = await GroupSchemma
        .create(req.body)
      res.status(200).json(response)


    } catch (error) {

      res.status(500).json(error)
    }

  },

  /* ------------------------------- find group ------------------------------- */


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

  /* ------------------------------ group details ----------------------------- */

  groupDetails: async (req, res) => {


    try {

      let groupDet = await GroupSchemma.
        findOne({ _id: req.params.groupId })
      res.status(200).json(groupDet)

    } catch (error) {

      res.status(500).json(error)
    }
  },

  /* ------------------------------- join group ------------------------------- */


  joinGroup: async (req, res) => {


   console.log("dfsdfsdfsd");
    try {

      let join = await GroupSchemma.
        updateOne({ _id: req.body.groupId }, { $addToSet: { groupMembers: req.params.userId } })
      res.status(200).json("updated")

    } catch (error) {

      res.status(500).json(error)

    }
  },


  /* ------------------------------- leave group ------------------------------ */

  leaveGroup: async (req, res) => {

    try {


      await GroupSchemma
        .updateOne({ _id: req.params.groupId },
          { $pull: { groupMembers: req.body.userId } })
      res.status(200).json("updated")

    } catch (error) {

      res.status(500).json('some error occured')
    }
  },


  /* ------------------------------ delete group ------------------------------ */

  deleteGroup: async (req, res) => {
    try {


      await GroupSchemma
        .deleteOne({ _id: req.params.groupId, admin: req.body.userId })
      await postGroupSchemma
        .deleteMany({ groupId: req.params.groupId })
      await groupCommentSchemma
        .deleteMany({ groupId: req.params.groupId })
      await groupPostReportModel
        .deleteMany({ groupId: req.params.groupId })
      res.status(200).json("deleted")

    } catch (error) {

      res.status(500).json('some error occured')

    }

  },

  /* -------------------------------- add post -------------------------------- */

  addPost: async (req, res) => {

    try {
      await postGroupSchemma
        .create(req.body)
      res.status(200).json("postUpload")

    } catch (error) {

      res.status(500).json(error)
    }

  },

  /* ---------------------------- view group posts ---------------------------- */

  viewGroupPost: async (req, res) => {

    try {

      let response = await postGroupSchemma.
        find({ groupId: req.params.groupId }).
        populate('userId')
      res.status(200).json(response)


    } catch (error) {

      res.status(500).json(error)

    }
  },

  /* ------------------------------- liked posts ------------------------------ */

  likePost: async (req, res) => {

    try {

      const post = await postGroupSchemma.findById(req.params.id)

      if (post.likes.includes(req.body.userId)) {

        await post.updateOne({ $pull: { likes: req.body.userId } })
        res.status(200).json("unliked")

      } else {

        await post.updateOne({ $push: { likes: req.body.userId } })
        res.status(200).json("liked ")

      }
    } catch (error) {

      res.status(500).json(error)

    }
  },

  /* ------------------------------ comment posts ----------------------------- */


  commentPost: async (req, res) => {

    try {

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

      res.status(500).json(error)
    }
  },

  /* ------------------------------ view comments ----------------------------- */

  viewComments: async (req, res) => {

    try {

      const postID = req.params.id
      let response = await groupCommentSchemma.
        find({ postId: postID }).
        populate('userId')
      res.status(200).json(response)

    } catch (error) {

      res.status(401).json(error)

    }
  },


  /* -------------------------- update group details -------------------------- */


  groupUpdate: async (req, res) => {

    try {

      const { groupId } = req.body
      let updateGroup = await GroupSchemma
        .updateOne({ _id: groupId }, {
          $set: req.body
        })
      res.status(200).json("updated")

    } catch (error) {

      res.status(401).json(error)

    }



  },

  /* ----------------------- remove group members admin ----------------------- */

  removeMember: async (req, res) => {

    try {

      let data = await GroupSchemma.
        updateOne({ _id: req.body.groupId },
          { $pull: { groupMembers: req.params.id } })
      res.status(200).json(data)

    } catch (error) {

      res.status(200).json(error)
    }

  },
  /* --------------------------- view group members --------------------------- */

  groupMembers: async (req, res) => {

    try {

      let groupDet = await GroupSchemma.
        findOne({ _id: req.params.groupId }).
        populate('groupMembers')
      res.status(200).json(groupDet.groupMembers)

    } catch (error) {

      res.status(500).json(error)

    }


  },

  /* ---------------------------- report group post --------------------------- */


  reportPost: async (req, res) => {


    let postId = req.params.postId
    let { userId, groupId, reportValue } = req.body


    try {
      await postGroupSchemma.
        updateOne({ _id: postId },
          { $addToSet: { reports: userId } })

      await groupPostReportModel.create({
        userId: userId,
        postId: postId,
        groupId: groupId,
        reason: reportValue
      })
      res.json(200).status("updated")

    } catch (error) {

      res.status(500).json(error)

    }
  },


  /* ------------------------------- delete post ------------------------------ */

  deletePost: async (req, res) => {


    try {

      const postId = req.params.id
      await postGroupSchemma.
        deleteOne({ _id: postId })
      await groupCommentSchemma.
        deleteMany({ postId: postId })
      await userSchemma.
        updateMany({ $pull: { savedPost: postId } })
      res.status(200).json("deleted")


    } catch (error) {

      res.status(500).json("Notdeleted")

    }

  },

  /* -------------------------- view groups in users -------------------------- */


  viewGroups: async (req, res) => {

    try {

      let data = await GroupSchemma.
        find({
          $or: [{ admin: req.params.userId },
          { groupMembers: { $in: [req.params.userId] } }]
        })
      res.status(200).json(data)

    } catch (error) {

      res.status(500).json(error.message)

    }
  }

}


module.exports = controller