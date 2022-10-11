const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    let token = req.headers['authorization'];
    
    try{
        token = token.splite(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY); 
        console.warn(decoded)
        // req.userData = decoded;
        // next();
    } catch(error){
        return res.status(401).json({
            message:'Auth failed'
        });
    }

};