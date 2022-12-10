const jwt = require('jsonwebtoken')

const verifyJwtUser = (req,res,next)=>{
    console.log('in verify');
    const token = req.headers.accesstoken;
    console.log(token,'its token');
    if(!token){
        res.status(403).json("Account verification failed")
    }else {
        jwt.verify(token, process.env.JWT_KEY_USER , (err, decoded) =>{

            if(err){    
                console.log(err);
                res.status(403).json({ message:"Authentication Failed!"})
            }else{
                req.userId = decoded.id;
                console.log('verify ok');
                next()
            }
        })
    }
} 

module.exports = verifyJwtUser