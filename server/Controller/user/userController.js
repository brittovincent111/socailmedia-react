const userSchemaa = require('../../schema/user/signUp')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const postSchemma = require('../../schema/user/posts')
const commentScheema = require('../../schema/user/commentSchemma')
const userSchemma = require('../../schema/user/signUp')
const ReportModel = require('../../schema/user/ReportSchemma')






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
            userfullname: req.body.userfullname,
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
      // console.log(user, "userrrrrrrrrrrrr")

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
      console.log(req.params.id, "param idddddddddddd")
      let users = await userSchemaa.find({ _id: { $nin: [req.params.id] } })
      let user = await userSchemaa.findById( req.params.id )

      console.log(user , "userrrrrrrrrrr")
      let add =    users.filter((obj)=>{

          
           if (!(user.requestTo.includes(obj._id)) && !(user.requestFrom.includes(obj._id)) && !(user.following.includes(obj._id))){

             return  obj
           }
  
           
          })
          let sliced = add.slice(0,3)

      res.status(200).json(sliced)

      console.log(add , "sliced")

      

    } catch (error) {
      res.status(500).json(error)
      console.log(error.message, "llllllllllll")


    }


  },
  


  // add follow request 

  followUsers: async (req, res) => {

    try {

      console.log(req.params.id)
      console.log(req.body, "bodyyyyyyy")

      let user = await userSchemaa.findOne({ _id: req.body.userId })
      let requeseter = await userSchemaa.findOne({ _id: req.params.id, requestFrom:  req.body.userId }  )


      if (user.requestTo.includes(req.params.id) || user.requestFrom.includes(req.params.id)) {



        res.status(200).json("alread requested")
        res.status(200).json("updated")


      } else {


        console.log(user, "kkkkkkkkkkk")
        let userpush = await userSchemaa.updateOne({ _id: req.body.userId }, { $push: { requestTo: req.params.id } })
        let requeseterPush = await userSchemaa.updateOne({ _id: req.params.id }, { $push: { requestFrom: req.body.userId } })
        console.log(user, "hhhhhhhhhhhhhhhhhhhhhhhhhh")

        res.status(200).json("updated")


      }
    } catch (error) {


      console.log(error.message, "mmmmmmmmm")
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

          return postSchemma.find({ userId: friends }).sort({ createdAt: -1 })
        })

      )

    

      console.log(friendsPost, "KKKKKKKDSSDASDASD")
     

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


  savePost: async (req, res) => {

    try {

      console.log(req.params.id, "POSTiddddddddSAVED")
      console.log(req.body.userId)

      const postId = req.params.id
      const { userId} = req.body

      const post = await userSchemaa.findById( userId )

      console.log(post , "postssssssdfasdfasfdasdfasdfasdfasdfasdf")

      if(!(post.savedPost.includes(req.params.id))){
         
        let response = await userSchemaa.updateOne({_id: userId},{ $push: { savedPost: postId} })

        res.status(200).json({message :"updated"})

      }else{

        

        
        console.log("already added ")
        res.status(200).json({ message :"already added"})
      }

    } catch (error) {

      console.log(error.message)



    }
  },

  savedPost :async(req,res)=>{

   try {

    console.log(req.params.id , "savedpostssssssss idddddddddddddd")

    let savedPosts = await userSchemaa.findOne({_id :req.params.id}).populate('savedPost')

    console.log(savedPosts.savedPost , "savedpostsssssssssssssssssssssss")

    res.status(200).json(savedPosts.savedPost)


   }catch(error){

    console.log(error.message , "eroorrrrrrerwerwe")


   }

  },

  viewComments: async (req, res) => {
    console.log(req.params.id, "hiiiiiiiiiiiiiiiii")

    const postID = req.params.id

    await commentScheema.find({ postId: postID }).populate('userId').then((response) => {

      console.log(response, "commentdetailssssssssssss")
      res.status(200).json(response)
    }).catch((error) => {

      console.log(error.message)
      res.status(401).json(error)
    })



  },

  // view profile posts 

  viewProfile: (req, res) => {

    console.log("abcdefg");

    try {

      console.log(req.params.id, "gggggggggggg")

      const userId = req.params.id

       userSchemaa.findOne({ _id: userId }).then((response) => {

        console.log(response , "userdetajsdfksgfhsgdfhsg")

        res.status(200).json(response)
      }).catch((error) => {

        console.log("sdfffffffffffffffff")

        res.status(401).json(error)
      })

    } catch (error) {

      console.log(error.message, "ggggggggggg")
      res.status(500).json(error)



    }
  },


  // view posts profile 

 viewProfilePosts : async(req,res)=>{
  
 try{

  console.log(req.params.id , "paramsiddd")

  let userPosts = await postSchemma.find({ userId: req.params.id }).sort({ createdAt: -1 })

   console.log(userPosts , "postsssssssssss")

   res.status(200).json(userPosts)


 }catch(error){

  console.log(error.message , "hhhhhh");



 }


 },

  // friendRequests  

  friendRequest: (req, res) => {

    try {

      console.log(req.params.id)
      const userId = req.params.id

      userSchemaa.findOne({ _id: userId }).populate('requestFrom').then((response) => {

        console.log(response.requestFrom, "responsemmmmmmm")
        res.status(200).json(response.requestFrom)
      })



    } catch (error) {

      console.log(error.message)

    }
  },

  // accept request 

  acceptRequest: async (req, res) => {

    try {


      console.log(req.params.id, "oooooooooo")
      console.log(req.body.userID, "kkkkkkkkkk")

      let userId = req.body.userID
      let requestId = req.params.id



      let user = await userSchemaa.updateOne({ _id: userId }, { $pull: { requestFrom: req.params.id } })
      let requeseter = await userSchemaa.updateOne({ _id: requestId }, { $pull: { requestFrom: userId } })
      let userUpdate = await userSchemaa.updateOne({ _id: userId }, { $push: { following: req.params.id } })

      let reqUpdate = await userSchemaa.updateOne({ _id: requestId }, { $push: { following: userId } })


      res.status(200).json("accepted")




    } catch (error) {
      console.log(error, " messdfsdfsdfsdsageeeeeeeeeeeeeeeee")


    }
  },

  // decline request 

  declineRequest: async (req, res) => {

    try {



      console.log(req.params.id, "oooooooooo")
      console.log(req.body.userID, "kkkkkkkkkk")

      let userId = req.body.userID
      let requestId = req.params.id



      let user = await userSchemaa.updateOne({ _id: userId }, { $pull: { requestFrom: req.params.id } })
      let requeseter = await userSchemaa.updateOne({ _id: requestId }, { $pull: { requestTo: userId } })

      res.status(200).json("declined")


    } catch (error) {
      console.log(error, " messdfsdfsdfsdsageeeeeeeeeeeeeeeee")


    }

  },


  // cancel request

  cancelRequest: async (req, res) => {

    try {



      console.log(req.params.id, "oooooooooo")
      console.log(req.body.userID, "kkkkkkkkkk")

      let userId = req.body.userID
      let requestId = req.params.id



      let user = await userSchemaa.updateOne({ _id: userId }, { $pull: { requestTo: req.params.id } })
      let requeseter = await userSchemaa.updateOne({ _id: requestId }, { $pull: { requestFrom: userId } })

      res.status(200).json("declined")


    } catch (error) {
      console.log(error, " messdfsdfsdfsdsageeeeeeeeeeeeeeeee")


    }

  },

  unfollow: async(req, res) => {

    try {



      console.log(req.params.id, "oooooooooo")
      console.log(req.body.userID, "kkkkkkkkkk")

      let userId = req.body.userID
      let requestId = req.params.id



      let user = await userSchemaa.updateOne({ _id: userId }, { $pull: { following: req.params.id } })
      let requeseter = await userSchemaa.updateOne({ _id: requestId }, { $pull: { following: userId } })

      res.status(200).json("declined")


    } catch (error) {
      console.log(error, " messdfsdfsdfsdsageeeeeeeeeeeeeeeee")


    }

  },
   /* ---------------------------- find single user ---------------------------- */
  findUser :async(req,res)=>{


    try {

    console.log(req.params.id , "iddddd")

     let User = await userSchemaa.findById(req.params.id)
      

     console.log(User , "user")
     res.status(200).json(User)

    }catch(error){

      res.status(500).json(error)

    }
  } , 

 

  /* ------------------------------- report post ------------------------------ */

  reportPost : async(req,res)=>{

   try{

    let postId = req.params.id
    let {userId  , reportValue} = req.body
    console.log(reportValue)
    let response = await postSchemma.updateOne({_id: postId},{$push :{ reports : userId }})
    let report = await ReportModel.create({
      userId : userId,
      postId : postId,
      reason : reportValue


    })

    console.log(report ,"report ")

    res.json(200).status({message :"reported"})
   



   }catch(error){

    console.log(error.message)


   }

  },

  deletePost :async(req,res)=>{
     

    try{
      console.log(req.params.id)
      const postId = req.params.id
      let deletePost = await postSchemma.deleteOne({_id : postId})
      let comment = await commentScheema.deleteMany({postId : postId})
      let saved = await userSchemaa.updateMany({ $pull :{savedPost : postId}})
  
      console.log(deletePost , "saved");
      console.log(comment , "saved");
  
      console.log(saved , "saved");
      res.status(200).json("deleted")
    }catch(error){
      res.status(500).json("Notdeleted")

      console.log(error.message , "delete error message")
    }
   
  },

  /* ------------------------------ edit profile ------------------------------ */

  editProfile : async(req,res)=>{

    try{

      console.log(req.body ,"update bodyyyyy")
    const { username, userfullname, about, userId} = req.body

    let updateProfile = await userSchemaa.updateOne({_id :userId },{
       $set:req.body 
       })

       res.status(200).json("updated")

    }catch(error){


      console.log(error.message)
    }

    
    
  }

}




module.exports = controller