
const { findByIdAndUpdate } = require('../../schema/user/signUp')
const userSchemaa = require('../../schema/user/signUp')
const Email = "brittovincent@gmail.com"
const Passsword = "123456"
const jwt = require('jsonwebtoken')
const postSchemma = require('../../schema/user/posts')
const ReportModel = require('../../schema/user/ReportSchemma')
const postGroupSchemma = require('../../schema/user/groupPostSchemma')
const groupPostReportModel = require('../../schema/user/groupReportPost')
const userReportModel = require('../../schema/user/userReport')

const Controller = {


  /* ------------------------------- adminlogin ------------------------------- */

  AdminLogin: async (req, res) => {

    const { email, password } = req.body

    try {

      if (Email == email) {
        if (Passsword == password) {
          const id = "123456"
          const token = jwt.sign({ id }, process.env.JWT_KEY, {
            expiresIn: "365d",
          })

          res.json({ token: token, auth: true })

        } else {

          res.status(401).json({ error: "Wrong password" })

        }



      } else {

        res.status(401).json({ error: "Email Wrong" })

      }

    } catch (e) {
      res.status(500).json({ error: "server error" })

    }
  },
 

  /* -------------------------------- dashboard ------------------------------- */

  dashboard : (req,res)=>{
    try{
      console.log('dashboard')

    }catch{

      console.log(hiiii)
    }

    
  },


  /* ------------------------------- view users ------------------------------- */


  userManagment: async (req, res) => {

    try {
      let user = await userSchemaa.find({reports : { $ne : []}})
      if (user) {
        res.status(200).json(user)
      }

    } catch {

      res.status(500).json({message : "something went wrong "})

    }
  },


  viewUserSingleReport: async(req,res)=>{

    try{
      console.log(req.params.userId , "userID")
      let user = await userReportModel.find({userId : req.params.userId}).populate("reporterId")
      res.status(200).json(user)

    }catch(error){

      console.log(error.message , "message   ")

    }
  },

  /* -------------------------------- BlockUser ------------------------------- */

  BlockUser: async(req, res) => {

    try {  
      const userid = req.params.id
      await userSchemaa.
      findByIdAndUpdate(userid, { status: 'Blocked' });
      res.status(200).json({updated: "true"})

    }catch(error){

      res.status(500).json(error)

    }
  },

  /* ------------------------------ UnBlock User ------------------------------ */

  UnBlockUser: async(req, res) => {

    try {
      const userid = req.params.id
      await userSchemaa.findByIdAndUpdate(userid, { status: 'Active' });
    res.status(200).json({updated: "true"})

    }catch(error){

      res.status(500).json(error)

    }
  },

  /* --------------------------- view Reported Post --------------------------- */
  
  viewReportedPost :async(req,res)=>{

    try {

      let response = await postSchemma.
      find({reports : { $ne : []}})

        res.status(200).json(response)

    }catch(error){

      res.status(500).json(error)


    }

  }, 
  /* -------------------------------- blockPost ------------------------------- */

  blockPost : async(req,res)=>{

    try {  
      const postid = req.params.id
      await postSchemma.updateOne( {_id:postid}, { status: 'Blocked' })
        
            res.status(200).json({updated: "true"})
         

    }catch(error){

      console.log(error.message , "errormessage ")
      res.status(500).json(error)

    }

  },

  /* ------------------------------- UnBlockPost ------------------------------ */

  UnBlockPost: async(req, res) => {


    try {
      const postid = req.params.id
      await postSchemma.
      findByIdAndUpdate( postid, { status: 'Active' });
    res.status(200).json({updated: "true"})

    }catch(error){
      res.status(500).json(error)

    }
  },

  /* ---------------------------- viewSingleReport ---------------------------- */

  viewSingleReport : async(req,res)=>{
     

    const postId = req.params.postId
      try{

          let reports =  await ReportModel.find({postId : postId}).populate('userId')
          res.status(200).json(reports)

    }catch(error){
    
      res.status(500).json(error)

    }
  },
  /* ------------------------ view Group Reported Post ------------------------ */

  viewGroupReportedPost :async(req,res)=>{

    try {

      let response = await postGroupSchemma.
      find({reports : { $ne : []}}).
      populate("groupId").
      populate("userId")

        res.status(200).json(response)

    }catch(error){
      
      res.status(500).json(error)
    }
  },

  /* ------------------------ view Group Single Report ------------------------ */

  viewGroupSingleReport : async(req,res)=>{
     

    const postId = req.params.postId
    try{
          let reports =  await groupPostReportModel.
          find({postId : postId}).
          populate('userId')
          res.status(200).json(reports)

    }catch(error){
    
      res.status(500).json(error)
    }
  },

  /* ---------------------------- group post report --------------------------- */
  blockGroupPost : async(req,res)=>{

    try {  
      const postid = req.params.id
      await postGroupSchemma.updateOne( {_id:postid}, { status: 'Blocked' })
        
            res.status(200).json({updated: "true"})
         

    }catch(error){

      console.log(error.message , "errormessage ")
      res.status(500).json(error)

    }

  },

  /* --------------------------- unblock group post --------------------------- */
  UnBlockGroupPost: async(req, res) => {


    try {
      const postid = req.params.id
      await postGroupSchemma.
      findByIdAndUpdate( postid, { status: 'Active' });
    res.status(200).json({updated: "true"})

    }catch(error){
      res.status(500).json(error)

    }
  },

}  


module.exports = Controller