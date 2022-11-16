const jwt = require('jsonwebtoken')

const verifyJWT = (req,res,next)=>{
    console.log('in verify');
    const token = req.headers["x-access-token"];
    console.log(token,'its token');
    if(!token){
        res.status(403).json("Account verification failed")
    }else {
        jwt.verify(token, process.env.JWT_KEY , (err, decoded) =>{

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

module.exports = verifyJWT