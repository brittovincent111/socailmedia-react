
const { findByIdAndUpdate } = require('../../schema/user/signUp')
const userSchemaa = require('../../schema/user/signUp')
const Email = "brittovincent@gmail.com"
const Passsword = "123456"
const jwt = require('jsonwebtoken')

const Controller = {


  // adminlogin 

  AdminLogin: async (req, res) => {
    console.log(req.body.email)
    const { email, password } = req.body

    try {


      if (Email == email) {

        // const checkPassword = await bcrypt.compare(password,user.password)

        console.log("calllsssssssss")   
        if (Passsword == password) {
          const id = "123456"
          const token = jwt.sign({ id }, process.env.JWT_KEY, {
            expiresIn: "365d",


          })

          console.log("calll")
          res.json({ token: token, auth: true })

        } else {

          res.status(401).json({ error: "Wrong password" })

        }



      } else {
        res.status(401).json({ error: "Email Wrong" })
        console.log("email error")

      }

    } catch (e) {
      console.log(e)
      res.status(500).json({ error: "server error" })

    }
  },


  dashboard : (req,res)=>{
    try{
      console.log('dashboard')

    }catch{


      console.log(hiiii)
    }

    
  },


  // view users 


  userManagment: async (req, res) => {

    console.log("call reached")
    try {
      console.log("call reached")
      let user = await userSchemaa.find()
      if (user) {
        console.log("call reacheddddddddd")
        res.status(200).json(user)
      }

    } catch {

      res.status(401).json({message : "something went wrong "})

    }


  },


  BlockUser: async(req, res) => {

    try {  
      const userid = req.params.id
      await userSchemaa.findByIdAndUpdate(userid, { status: 'Blocked' },
        function (err, docs) {
          if (err) {
            console.log(err)
          }
          else {
            res.status(200).json({updated: "true"})
            console.log("Updated User : ", docs);
          }
        });

    }catch{
      console.log("error")

    }
  },

  UnBlockUser: async(req, res) => {

    console.log('dddddddd')

    try {
      const userid = req.params.id
      await userSchemaa.findByIdAndUpdate(userid, { status: 'Active' },
        function (err, docs) {
          if (err) {
            console.log(err)
          }
          else {
            res.status(200).json({updated: "true"})
            console.log("Updated User : ", docs);
          }
        });

    }catch{
      console.log("error")

    }
  }
}  


module.exports = Controller