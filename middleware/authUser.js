const JWT = require('jsonwebtoken');

// This function will check the token wheather the user is login or not. User is authorized or not


exports.requireSignIn = async(req , res , next) =>{
    try{
        
        const token = req.headers.authorization.substring(7);
        const decode = JWT.verify(token , process.env.JWT_SECRET);
        req.user = decode;
        next();
    }
    catch(error){
        return res.status(401).send({success : false , message :"error in verifying token "});
    }
}