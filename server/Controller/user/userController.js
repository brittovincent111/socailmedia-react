const userSchemaa = require('../../schema/user/signUp')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const postSchemma = require('../../schema/user/posts')
const commentScheema = require('../../schema/user/commentSchemma')
const userSchemma = require('../../schema/user/signUp')
const ReportModel = require('../../schema/user/ReportSchemma')
const notificationSchemma = require('../../schema/user/NotificationSchema')
const userReportModel = require('../../schema/user/userReport')
const otpSchemma = require('../../schema/user/otpModel')
const nodemailer = require('nodemailer')




let otpConfig = async (email, res , forget) => {

  try {
    console.log(email, "emaill")
    const OTP = await Math.
      floor(100000 + Math.random() * 900000).
      toString()
    console.log(OTP)
    const hashOtp = await bcrypt.
      hash(OTP, 10)
    const user = await otpSchemma.
      findOne({ user: email })
    if (!user) {
      const data = new otpSchemma({
        user: email,
        otp: hashOtp,
        created: Date.now(),
        Expiry: Date.now() + 100000
      })
      await data.save()
    } else {
      await otpSchemma.
        updateOne({ user: email }, { otp: hashOtp })
    }



    /* ------------------------ Nodemailer configuration ------------------------ */



    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER,
        pass: process.env.NODEMAILER_PASS,
      },
    })
     
    if(forget){

      let info = await transporter.sendMail({
        from: process.env.NODEMAILER, // sender address
        to: email, // list of receivers
        subject:"Sending a email for password reset",
        text:`Click this link to reset your password http://localhost:3000/forgotPassword/${email}/${OTP}`
      })

      if (info.messageId) {
        console.log('in ifffffff');
        res.status(200).json({ status: true, message: 'Otp send to mail' })
      } else {
        console.log('in elllseeee');
        res.status(402).json('something went wrong')
      }

     

    }else{

      let info = await transporter.sendMail({
        from: process.env.NODEMAILER, // sender address
        to: email, // list of receivers
        subject: "One Time Password for TalentF", // Subject line
        text: `Hello User Your six digit OTP for authentication is ${OTP} `, // plain text body
        html: `<p>Hello User Your six digit OTP for authentication is <b>${OTP}</b></p>`, // html body
      })
      if (info.messageId) {
        console.log('in ifffffff');
        res.status(200).json({ status: true, message: 'Otp send to mail' })
      } else {
        console.log('in elllseeee');
        res.status(402).json('something went wrong')
      }

    }
  

  } catch (error) {

    console.log(error.message, "error")

  }


}


/* ------------------------------- controller ------------------------------- */

const controller = {

  /* ------------------------------- user signup ------------------------------ */

  userSignUp: async (req, res) => {


    console.log(req.body, "signupppp")
    try {



      let password = await bcrypt.
        hash(req.body.password, 10)
      let user = await userSchemaa.
        create({
          userfullname: req.body.userfullname,
          username: req.body.username,
          email: req.body.email,
          password: password
        })

      console.log(user, "user")
      await notificationSchemma.
        create({ userId: user._id })
      res.json({ success: "success" })



    } catch (error) {

      console.log(error.message)
      res.status(500).send(error)

    }
  },


  /* -------------------------------- otp login ------------------------------- */

  userOtpLogin: async (req, res) => {



    try {
      let userName = await userSchemaa.
        findOne({ username: req.body.username })
      if (userName) {
        const error = "UserName Already exists"
        res.status(401).send({ error })

      } else {

        let userEmail = await userSchemaa.
          findOne({ email: req.body.email })

        if (userEmail) {

          res.status(401).
            json({ error: "Email Already exists" })

        } else {


          otpConfig(req.body.email, res)



        }
      }
    } catch (error) {

      console.log(error.message, "messageee")


    }
  },

  /* ------------------------------- Resend Otp ------------------------------- */

  resendOtp: async (req, res) => {


    try {
      let data = otpConfig(req.params.email, res)


    } catch (error) {

      console.log(error.message, "error")
    }
  },



  /* ---------------------------- OTP VERIFICATION ---------------------------- */

  verifyOtp: async (req, res) => {
    console.log(req.body, 'verify body');
    try {
      let validUser = await otpSchemma.
        findOne({ user: req?.body?.email })
      console.log(validUser, 'valid user');
      let validOtp = await bcrypt.
        compare(req.body.otp, validUser.otp)
      console.log(validOtp, 'otp validd');

      if (validOtp) {
        res.status(200).
          json({ message: 'otp verified', auth: true })
      } else {
        res.status(403).json({ message: 'invalid Otp' })
      }
    } catch (error) {
      console.log(error, 'verify otp error');
      res.status(500).json(error)
    }
  },
    
  /* ----------------------------- forget password ---------------------------- */

  forgetPassword : async(req,res)=>{
    
    console.log(req.params.email)
   let email = req.params.email
   let forget = true
    try{

      let data = otpConfig(req.params.email, res , forget)


  } catch (error) {

    console.log(error.message, "error")

  }

  },


  submitForgetPassword : async(req,res)=>{
    

      console.log(req.body, 'verify body');
      try {
        let validUser = await otpSchemma.
          findOne({ user: req?.body?.email })
        console.log(validUser, 'valid user');
        let validOtp = await bcrypt.
          compare(req.body.otp, validUser.otp)
        console.log(validOtp, 'otp validd');
  
        if (validOtp) {
          let password = await bcrypt.
          hash(req.body.password, 10)
          let data = await userSchemaa.updateOne({email : req.body.email} ,
            {$set:{password : password}})
  
            console.log(data , "dataaa")
          res.status(200).
            json({ message: 'otp verified', auth: true })
        } else {
          res.status(403).json({ message: 'invalid Otp' })
        }
    
    }catch(error){


    }


  },
  /* ------------------------------- user login ------------------------------- */

  userLogin: async (req, res) => {
    const { email, password } = req.body

    try {
      let user = await userSchemaa.
        findOne({ email })
      if (user && user.status == "Active") {

        const checkPassword = await bcrypt.
          compare(password, user.password)

        if (checkPassword) {
          const id = user._id
          const token = jwt.sign({ id },
            process.env.JWT_KEY_USER, {
            expiresIn: "365d",
          })
          res.status(200).
            json({ user: user, userToken: token })

        } else {

          res.status(401).
            json({ error: "Wrong password" })

        }
      } else {
        res.status(401).
          json({ error: "User Not Found" })

      }

    } catch (e) {
      res.status(500).
        json({ error: "server error" })

    }
  },

  /* ------------------------------ add post user ----------------------------- */


  AdduserPost: async (req, res) => {

    const newPost = new postSchemma(req.body)
    try {

      const savedPost = await newPost.save();
      res.status(200).json(savedPost)
    } catch (err) {
      res.status(500).json(err)

    }
  },


  /* ---------------------------- suggested friends --------------------------- */

  userDetails: async (req, res) => {



    try {
      let users = await userSchemaa.
        find({ _id: { $nin: [req.params.id] } })
      let user = await userSchemaa.
        findById(req.params.id)
      let add = users.filter((obj) => {

        if (!(user.requestTo.includes(obj._id)) &&
          !(user.requestFrom.includes(obj._id)) &&
          !(user.following.includes(obj._id))) {

          return obj
        }
      })
      let sliced = add.slice(0, 3)

      res.status(200).json(sliced)

    } catch (error) {
      res.status(500).json(error)

    }
  },



  /* ----------------------------- follow request ----------------------------- */
  followUsers: async (req, res) => {

    try {

      let user = await userSchemaa.
        findOne({ _id: req.body.userId })
      let requeseter = await userSchemaa.
        findOne({
          _id: req.params.id,
          requestFrom: req.body.userId
        })


      if (user.requestTo.includes(req.params.id) ||
        user.requestFrom.includes(req.params.id)) {

        res.status(200).json("alread requested")


      } else {

        await userSchemaa.
          updateOne({ _id: req.body.userId },
            { $push: { requestTo: req.params.id } })
        await userSchemaa.
          updateOne({ _id: req.params.id },
            { $push: { requestFrom: req.body.userId } })

        res.status(200).json("updated")

      }
    } catch (error) {

      res.status(500).json(error)

    }
  },



  userFeed: (req, res) => {


  },
  /* ----------------------------- timeline posts ----------------------------- */

  timeLinePosts: async (req, res) => {


    try {

      let currentUser = await userSchemaa.
        findById(req.params.id)
      let userPosts = await postSchemma.
        find({ userId: currentUser._id }).
        sort({ createdAt: -1 })

      const friendsPost = await Promise.all(
        currentUser.following.map((friends) => {

          return postSchemma.find({ userId: friends }).
            sort({ createdAt: -1 })
        })

      )

      res.json((userPosts.concat(...friendsPost)))

    } catch (error) {

      res.status(500).json(error)

    }
  },

  /* ------------------------------- postDetalis ------------------------------ */

  postDetails: async (req, res) => {

    let userId = req.query.userId

    try {

      const user = await userSchemaa.
        findById(userId)
      const {
        password,
        requestFrom,
        requestTo,
        date, status,
        ...others
      } = user._doc

      res.status(200).json(others)

    } catch (error) {

      res.status(500).json(error)

    }
  },


  /* -------------------------------- like post ------------------------------- */

  likePost: async (req, res) => {

    let details = {
      user: req.body.userId,
      desc: "liked your post"
    }

    try {
      const post = await postSchemma.
        findById(req.params.id)

      if (post.likes.includes(req.body.userId)) {

        await post.
          updateOne({ $pull: { likes: req.body.userId } })
        res.status(200).json("unliked")

      } else {

        let push = await post.
          updateOne({ $push: { likes: req.body.userId } })
        await notificationSchemma.
          updateOne({ userId: post.userId },
            { $push: { notification: details } })
        console.log(push, "pushhhh")
        res.status(200).json("liked ")

      }
    } catch (error) {

      res.status(500).json(error)

    }
  },

  /* ------------------------------ comment post ------------------------------ */

  commentPost: async (req, res) => {

    let details = {
      user: req.body.userId,
      desc: "commented your post"
    }

    try {
      const postId = req.params.id
      const { userId, comment, postUserId } = req.body
      await commentScheema.create({
        userId,
        comment,
        postId: postId
      })
      await notificationSchemma.
        updateOne({ userId: postUserId },
          { $push: { notification: details } })

      res.status(200).json("updated")

    } catch (error) {

      console.log(error.message, "messageee");
      res.status(500).json(error)

    }
  },

  /* -------------------------------- save post ------------------------------- */

  savePost: async (req, res) => {

    try {

      const postId = req.params.id
      const { userId } = req.body

      const post = await userSchemaa.
        findById(userId)

      if (!(post.savedPost.includes(req.params.id))) {

        await userSchemaa.updateOne({ _id: userId },
          { $push: { savedPost: postId } })
        await postSchemma.updateOne({ _id: postId },
          { $push: { saved: userId } })

        res.status(200).
          json({ message: "updated" })

      } else {

        await userSchemaa.updateOne({ _id: userId },
          { $pull: { savedPost: postId } })
        await postSchemma.updateOne({ _id: postId },
          { $pull: { saved: userId } })
        res.status(200).
          json({ message: " Remove update" })
      }

    } catch (error) {

      res.status(500).json(error)
    }
  },

  /* ------------------------------- saved posts ------------------------------ */

  savedPost: async (req, res) => {

    try {


      let savedPosts = await userSchemaa.
        findOne({ _id: req.params.id }).
        populate('savedPost')
      res.status(200).json(savedPosts.savedPost)


    } catch (error) {

      res.status(500).json(error)

    }

  },

  /* ------------------------------ view comments ----------------------------- */

  viewComments: async (req, res) => {

    try {

      const postID = req.params.id

      let response = await commentScheema.
        find({ postId: postID }).
        populate('userId')

      res.status(200).json(response)


    } catch (error) {

      res.status(401).json(error)

    }
  },

  /* --------------------------- view profile posts --------------------------- */

  viewProfile: async (req, res) => {


    try {

      const userId = req.params.id
      let response = await userSchemaa.
        findOne({ _id: userId }).
        populate('following', 'username , profilePicture')

      res.status(200).json(response)

    } catch (error) {

      res.status(500).json(error)
    }
  },


  /* --------------------------- view posts profile --------------------------- */

  viewProfilePosts: async (req, res) => {

    try {

      let userPosts = await postSchemma.
        find({ userId: req.params.id }).
        sort({ createdAt: -1 })
      res.status(200).json(userPosts)


    } catch (error) {

      res.status(500).json(error)

    }
  },

  /* ----------------------------- friendRequests ----------------------------- */

  friendRequest: async (req, res) => {

    try {

      const userId = req.params.id

      let response = await userSchemaa.
        findOne({ _id: userId }).
        populate('requestFrom')


      res.status(200).json(response.requestFrom)

    } catch (error) {

      res.status(500).json(error)

    }
  },

  /* ----------------------------- accept request ----------------------------- */

  acceptRequest: async (req, res) => {

    try {


      let userId = req.body.userID
      let requestId = req.params.id

      await userSchemaa.
        updateOne({ _id: userId },
          { $pull: { requestFrom: req.params.id } })
      await userSchemaa.
        updateOne({ _id: requestId },
          { $pull: { requestTo: userId } })
      await userSchemaa.
        updateOne({ _id: userId },
          { $push: { following: req.params.id } })
      await userSchemaa.
        updateOne({ _id: requestId },
          { $push: { following: userId } })


      res.status(200).json("accepted")

    } catch (error) {

      res.status(500).json(error)

    }
  },

  /* ----------------------------- decline request ---------------------------- */

  declineRequest: async (req, res) => {

    try {

      let userId = req.body.userID
      let requestId = req.params.id
      await userSchemaa.
        updateOne({ _id: userId },
          { $pull: { requestFrom: req.params.id } })
      await userSchemaa.
        updateOne({ _id: requestId },
          { $pull: { requestTo: userId } })

      res.status(200).json("declined")


    } catch (error) {

      res.status(500).json(error)

    }

  },


  /* ----------------------------- cancel request ----------------------------- */

  cancelRequest: async (req, res) => {

    try {

      let userId = req.body.userID
      let requestId = req.params.id
      await userSchemaa.
        updateOne({ _id: userId },
          { $pull: { requestTo: req.params.id } })
      await userSchemaa.
        updateOne({ _id: requestId },
          { $pull: { requestFrom: userId } })

      res.status(200).json("declined")


    } catch (error) {

      res.status(500).json(error)

    }

  },

  /* ------------------------------ unfollow user ----------------------------- */

  unfollow: async (req, res) => {

    try {

      let userId = req.body.userID
      let requestId = req.params.id
      await userSchemaa.
        updateOne({ _id: userId },
          { $pull: { following: req.params.id } })
      await userSchemaa.
        updateOne({ _id: requestId },
          { $pull: { following: userId } })

      res.status(200).json("declined")


    } catch (error) {
      res.status(500).json(error)


    }

  },
  /* ---------------------------- find single user ---------------------------- */
  findUser: async (req, res) => {


    try {

      let User = await userSchemaa.
        findById(req.params.id)
      res.status(200).json(User)

    } catch (error) {

      res.status(500).json(error)

    }
  },



  /* ------------------------------- report post ------------------------------ */

  reportPost: async (req, res) => {

    try {

      let postId = req.params.id
      let { userId, reportValue } = req.body
      let response = await postSchemma.
        updateOne({ _id: postId },
          { $push: { reports: userId } })
      await ReportModel.create({
        userId: userId,
        postId: postId,
        reason: reportValue
      })

      res.json(200).status({ message: "reported" })

    } catch (error) {

      res.status(500).json(error)

    }

  },
  /* ------------------------------- delete post ------------------------------ */

  deletePost: async (req, res) => {


    try {
      const postId = req.params.id
      await postSchemma.
        deleteOne({ _id: postId })
      await commentScheema.
        deleteMany({ postId: postId })
      await userSchemaa.
        updateMany({ $pull: { savedPost: postId } })

      res.status(200).json("deleted")

    } catch (error) {

      res.status(500).json("Notdeleted")

    }

  },

  /* ------------------------------ edit profile ------------------------------ */

  editProfile: async (req, res) => {


    try {
      let find = await userSchemaa.
        findOne({ username: req.body.username })
      if (find) {

        if (find._id == req.params.userId) {
          await userSchemaa.
            updateOne({ _id: req.params.userId }, {
              $set: req.body
            })

          res.status(200).json("updated")
        } else {

          res.status(401).json({ message: "already exists" })

        }

      } else {
        await userSchemaa.
          updateOne({ _id: req.params.userId }, {
            $set: req.body
          })
        res.status(200).json("updated")

      }
    } catch (error) {

      res.status(500).json(error)
    }
  },

  /* -------------------------------- edit post ------------------------------- */

  editPost: async (req, res) => {


    try {

      await postSchemma.
        updateOne({ _id: req.body.postId },
          { $set: { desc: req.body.desc } })
      res.status(200).json("updated")

    } catch (error) {

      res.status(500).json(error)

    }
  },

  /* ------------------------------ search users ------------------------------ */

  searchUsers: async (req, res) => {


    try {
      let users = await userSchemaa.
        find({
          userfullname: {
            $regex: '^' + req.params.val,
            $options: "i"
          }
        })
      res.status(200).json(users)

    } catch (error) {

      res.status(500).json(error)

    }
  },

  /* ------------------------------ NOTIFICATION ------------------------------ */

  notificationShow: async (req, res) => {

    try {

      let data = await notificationSchemma.
        findOne({ userId: req.params.userId }).
        populate("notification.user",
          "username profilePicture")
      let count = data.notification.filter((obj) => {

        if (obj.status == "true") {
          return obj

        }

      })
      let countLength = count.length
      res.status(200).json({ data, countLength })

    } catch (error) {

      console.log(error.message, "message")
      res.status(500).json(error)

    }
  },

  /* -------------------------- readed notifications -------------------------- */

  notificationRead: async (req, res) => {


    try {

      let data = await notificationSchemma.
        updateOne({ userId: req.params.userId },
          { $set: { "notification.$[].status": "false" } })
      res.status(200).json("updated")


    } catch (error) {

      console.log(error.message, "message")
      res.status(500).json(error)

    }

  },

  /* ------------------------------- report user ------------------------------ */

  reportUser: async (req, res) => {

    try {

      let response = await userSchemaa.
        updateOne({ _id: req.body.userID },
          { $push: { reports: req.params.userId } })


      await userReportModel.create({
        userId: req.body.userID,
        reporterId: req.params.userId,
        reason: req.body.reportValue
      })

      console.log("hiiii")



    } catch (error) {

      console.log(error.message, "messageee")

    }
  }

}




module.exports = controller