const userSchemaa = require('../../schema/user/signUp')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_KEY = "12345"

const controller  = {

    userSignUp : async(req,res)=>{

      try {
        let userName =  await userSchemaa.findOne({username : req.body.username})
    
        console.log(userName , "dfsssssssss")
       
            if(userName){
                const error = "UserName Already exists"
                res.status(401).send({ error })
                // console.log("email error")
    
            }else{
               
                let userEmail =  await userSchemaa.findOne({email : req.body.email})

                if( userEmail){

                    res.status(401).json({ error : "Email Already exists"})
                    console.log("email error")
   
                }else {
                    let password = await bcrypt.hash(req.body.password , 10)

                    await userSchemaa.create({ 
                        username : req.body.username,    
                        email : req.body.email,
                        password :password
                       }).then((response)=>{
                        console.log("signup success")     
                    })  
                }

            }      

    }catch(error){

        console.log(error)

    }
},
  
  userLogin : async(req,res)=>{
    console.log(req.body.email)
    const{email,password} = req.body
   
    try{
        let user =  await userSchemaa.findOne({email})
        console.log(user , "userrrrrrrrrrrrr") 

        if( user){

            const checkPassword = await bcrypt.compare(password,user.password)

            console.log("calllsssssssss")
            if(checkPassword){
              const id=user._id
              const token=jwt.sign({id}, JWT_KEY,{
                expiresIn:"365d",
      
                
              })
             
              console.log("calll")
              res.json({user: user, token:token, auth:true})
          
            }else {
              
              res.status(401).json( {error : "Wrong password"})
      
            }

            

        }else {
            res.status(401).json({ error : "Email Not exists"})
            console.log("email error")
        
        }

    }catch(e){
        console.log(e)
        res.status(500).json({ error : "server error"})

    }
  }
}

module.exports = controller