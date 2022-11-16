const userSchemaa = require('../../schema/user/signUp')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const postSchemma = require('../../schema/user/posts')




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

    console.log(req.body , "hiiiiiiiiiiiii");
    const newPost = new postSchemma(req.body)
    try {

      const savedPost = await newPost.save();
      res.status(200).json(savedPost)
    } catch (err) {
      res.status(500).json(err)

    }
  },
  

  // suggested 
  userDetails : async(req,res)=>{
        
   try {
      await userSchemaa.find().limit(3).then((response)=>{

     res.status(200).json(response)
     }).catch((error)=>{

      console.log(error)

     })

   }catch (error){

   }


  },

  

  // add follow request 

  followUsers : async(req,res)=>{
    

    console.log(req.params.id)
    console.log(req.body , "bodyyyyyyy")

    let user = await  userSchemaa.findById( req.params.id)
    let currentUser = await userSchemaa.findById( req.body.userId)
    
    if(!currentUser.following.includes(req.params.id) ){

      if(!currentUser.requestTo.includes(req.params.id) && (!currentUser.requestFrom.includes(req.params.id))){

        await currentUser.updateOne({$push : {requestTo : req.params.id }})
        await user.updateOne({$push : {requestFrom : req.body.userId }})
        console.log("updated")
      }else{

             console.log("already requested")
      }
           

    }else{

      console.log("already following")


    }


  }, 
  userFeed : (req,res)=>{


  },
  // timeline posts 

  timeLinePosts : async(req,res)=>{

    console.log(req.params.id , "params id   ")

    try{

    
    
    let currentUser = await userSchemaa.findById( req.params.id)
    let userPosts = await postSchemma.find({userId : currentUser._id}).sort({createdAt : -1})
    const friendsPost = await Promise.all(
      currentUser.requestTo.map((friends)=>{

        return postSchemma.find({userId : friends}).sort({createdAt : -1})
      })

      )
      
      res.json(userPosts.concat(...friendsPost))
      console.log(userPosts , "friendspostssssssss")

   

  
}catch(error){

  console.log(error)

}
},

// postDetalis  

postDetails : async(req,res)=>{

  console.log('user detaisl')
  let userId =req.query.userId

  try{

    const user = await userSchemaa.findById(userId)


    console.log(user , " userdetalissssssssss")
    const {password ,requestFrom , requestTo , date , status , ...others} = user._doc

    res.status(200).json(others)



  }catch(error){

    console.log(error)


  }


}, 

likePost : async(req,res)=>{
  console.log(req.body.userId , req.params.id , "kkkkkkkkkkkkk")

  try {
    
    console.log("jjjjjjjjjjjjjjjjjj")
    const post =await postSchemma.findById(req.params.id)

    console.log(post)

    if(post.likes.includes(req.body.userId)){

      await post.updateOne({$pull:{likes : req.body.userId}})

      res.status(200).json("unliked")
    }else{    
   

     await  post.updateOne({$push:{likes : req.body.userId}})
      res.status(200).json("liked ")


    }



  }catch(error){


    console.log(error.message)


  }


}


}




module.exports = controller