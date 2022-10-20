const jwt = require("jsonwebtoken")
const auth = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization
    if(authHeader){
        if(authHeader.starstWith('Bearer ')){
            const token = authHeader.slice(7)
            const payload = jwt.verify(token, process.env.APP_SECRET || 'default-key')
            req.userData = payload;
            return next();
        }
    }else{
        return res.status(401).json({
            success: false,
            message: "invalid Token"
        });
    }
    }catch(err){
        return res.status(401).json({
            success: false,
            message: "Unauthorize, invalid Token"
        });
    }
}

module.exports = auth 