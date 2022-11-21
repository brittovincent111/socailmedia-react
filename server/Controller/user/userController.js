const userSchemaa = require('../../schema/user/signUp')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const postSchemma = require('../../schema/user/posts')
const commentScheema = require('../../schema/user/commentSchemma')
const userSchemma = require('../../schema/user/signUp')







const controller = {

  userSignUp: async (req, res) => {

    try {

      let userName = await userSchemaa.findOne({ username: req.body.username })

      console.log(userName, "dfsssssssss")

      if (userName) {
        const error = "UserName Already exists"
        res.status(401).send({ error })
        // console.log("email error")

      } else {

        let userEmail = await userSchemaa.findOne({ email: req.body.email })

        if (userEmail) {

          res.status(401).json({ error: "Email Already exists" })
          console.log("email error")

        } else {
          let password = await bcrypt.hash(req.body.password, 10)

          await userSchemaa.create({
            userfullname : req.body.userfullname,
            username: req.body.username,
            email: req.body.email,
            password: password
          }).then((response) => {
            console.log(response)
            res.json({ success: "success" })
            console.log("signup success")
          })
        }

      }

    } catch (error) {

      console.log(error)

    }
  },

  userLogin: async (req, res) => {
    console.log(req.body.email)
    const { email, password } = req.body

    try {



      let user = await userSchemaa.findOne({ email })
      console.log(user, "userrrrrrrrrrrrr")

      if (user && user.status == "Active") {

        const checkPassword = await bcrypt.compare(password, user.password)

        console.log("calllsssssssss")
        if (checkPassword) {
          const id = user._id
          const token = jwt.sign({ id }, process.env.JWT_KEY_USER, {
            expiresIn: "365d",


          })

          console.log("calll")
          res.json({ user: user, userToken: token })

        }

        else {

          res.status(401).json({ error: "Wrong password" })

        }



      } else {
        res.status(401).json({ error: "User Not Found" })
        console.log("email error")

      }

    } catch (e) {
      console.log(e)
      res.status(500).json({ error: "server error" })

    }
  },

  // add post details 
  AdduserPost: async (req, res) => {

    console.log(req.body, "hiiiiiiiiiiiii");
    const newPost = new postSchemma(req.body)
    try {

      const savedPost = await newPost.save();
      res.status(200).json(savedPost)
    } catch (err) {
      res.status(500).json(err)

    }
  },


  // suggested 
  userDetails: async (req, res) => {

    try {
          console.log(req.params.id , "param idddddddddddd")
      await userSchemaa.find({_id :{ $nin:[req.params.id]}}).limit(3).then((response) => {

        res.status(200).json(response)

        console.log(response , "llllllllllll")
      }).catch((error) => {

        console.log(error)

      })

    } catch (error) {

    }


  },



  // add follow request 

  followUsers: async (req, res) => {

    try{

    


    console.log(req.params.id)
    console.log(req.body, "bodyyyyyyy")

    let user = await userSchemaa.findOne({_id : req.body.userId, requestFrom:{$elemMatch : { list : req.params.id }} })
    let requeseter = await userSchemaa.findOne({_id : req.params.id , requestFrom:{$elemMatch : { list : req.body.userId }} })

    console.log(requeseter , "llllllllllllllffffffffffff")
    
  if(user == null && requeseter == null){

    console.log(user , "kkkkkkkkkkk")
    let userpush =  await userSchemaa.updateOne({_id: req.body.userId},{ $push: { requestTo:{ list : req.params.id }} })
    let requeseterPush = await userSchemaa.updateOne({_id: req.params.id},{ $push: { requestFrom:{ list : req.body.userId }} })

     res.status(200).json("updated")
     

  }else {

    res.status(200).json("alread requested")

    console.log(user , "hhhhhhhhhhhhhhhhhhhhhhhhhh")

    


  }
}catch(error){


  console.log(error.message , "mmmmmmmmm")
}

    


  },
  userFeed: (req, res) => {


  },
  // timeline posts 

  timeLinePosts: async (req, res) => {

    console.log(req.params.id, "params id   ")

    try {

           

      let currentUser = await userSchemaa.findById(req.params.id)
      let userPosts = await postSchemma.find({ userId: currentUser._id }).sort({ createdAt: -1 })
      const friendsPost = await Promise.all(
        currentUser.following.map((friends) => {

          return postSchemma.find({ userId: friends.list }).sort({ createdAt: -1 })
        })

      )

      console.log(friendsPost , "KKKKKKKDSSDASDASD")
    //   currentUser.requestTo.map((friends) => {

    //     return postSchemma.find({ userId: friends }).sort({ createdAt: -1 })
    //   })

    // )

      res.json((userPosts.concat(...friendsPost)))
      console.log(userPosts.concat(...friendsPost), "friendspostssssssss")




    } catch (error) {

      console.log(error)

    }
  },

  // postDetalis  

  postDetails: async (req, res) => {

    console.log('user detaisl')
    let userId = req.query.userId

    try {

      const user = await userSchemaa.findById(userId)


      console.log(user, " userdetalissssssssss")
      const { password, requestFrom, requestTo, date, status, ...others } = user._doc

      res.status(200).json(others)



    } catch (error) {

      console.log(error)


    }


  },

  likePost: async (req, res) => {
    console.log(req.body.userId, req.params.id, "kkkkkkkkkkkkk")

    try {

      console.log("jjjjjjjjjjjjjjjjjj")
      const post = await postSchemma.findById(req.params.id)

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

  // comment post 

  commentPost: async (req, res) => {

    try {

      console.log(req.params.id, "idddddddd")
      console.log(req.body.userId)

      const postId = req.params.id
      const { userId, comment } = req.body


      let response = await commentScheema.create({
        userId,
        comment,
        postId: postId
      })

      res.status(200).json("updated")



    } catch (error) {

      console.log(error.message)



    }
  },

  viewComments: async(req, res) => {
    console.log(req.params.id, "hiiiiiiiiiiiiiiiii")

    const postID = req.params.id

    await commentScheema.find({postId : postID}).populate('userId').then((response) => {

      console.log(response, "commentdetailssssssssssss")
      res.status(200).json(response)
    }).catch((error) => {
     
      console.log(error.message)
      res.status(401).json(error)
    })


  
  },

  // view profile posts 

  viewProfile : async(req,res)=>{

    try{

      console.log(req.params.id,"gggggggggggg")

      const userId = req.params.id

      await postSchemma.find({userId : userId}).then((response)=>{

        console.log(response)

        res.status(200).json(response)
      }).catch((error)=>{

        console.log("sdfffffffffffffffff")

        res.status(401).json(error)
      })

    }catch(error){

      console.log(error.message , "ggggggggggg")
      res.status(500).json(error)



    }
  },

  // friendRequests  

  friendRequest :(req,res)=>{

    try{

      console.log(req.params.id)
      const userId = req.params.id

      userSchemaa.findOne({_id:userId}).populate('requestFrom.list').then((response)=>{

       console.log(response.requestFrom , "responsemmmmmmm")
       res.status(200).json(response.requestFrom)
      })

      

    }catch(error){

      console.log(error.message)

    }
  },

  // accept request 

  acceptRequest: async(req,res)=>{

    try{
       

      console.log(req.params.id ,"oooooooooo")
      console.log(req.body.userID,"kkkkkkkkkk")

      let userId = req.body.userID
      let requestId = req.params.id
      


     let user =  await userSchemaa.updateOne({_id: userId},{ $pull: { requestFrom:{ list : req.params.id }} })
     let requeseter = await userSchemaa.updateOne({_id:  requestId},{ $pull: { requestFrom:{ list : userId }} })
     let userUpdate =  await userSchemaa.updateOne({_id: userId},{ $push: { following:{ list : req.params.id }} })

     let reqUpdate = await userSchemaa.updateOne({_id:  requestId},{ $push: { following:{ list : userId }} })

       





    }catch(error){
      console.log(error , " messdfsdfsdfsdsageeeeeeeeeeeeeeeee")


    }
  }


}




module.exports = controller