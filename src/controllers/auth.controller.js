const userModel = require ('../models/users.model')
const profileModel = require ('../models/profile.model')
const argon = require('argon2')
const jwt = require ('jsonwebtoken')

exports.login = async (req, res) => {
    try{
    const user = await userModel.selectUserByEmail(req.body.email)
    if(user.rowCount){
        const selectedUser = user.rows[0]
        const valid = await argon.verify(selectedUser.password, req.body.password)
        if(valid){
            const {id} = selectedUser
            const token = jwt.sign({id:selectedUser.id}, process.env.APP_SECRET || 'default=key');
            return res.json({
                success:true,
                message: 'Login is success',
                result: user.rows[0], token
            });
        }
    }
    return res.status(401).json({
        success:false,
        message: "Wrong email or password"
      });
    
}catch(err){
    return res.status(500).json({
         success:false,
         message: "Error"+err.message
        });   
    }
};

exports.register = async (req, res) =>{
    req.body.password = await argon.hash(req.body.password);
    try{
        const user = await userModel.insertUser( req.body)
        if(user.rowCount){
            const createUser = user.rows[0];
            req.body.userId = createUser.id;
            const profile  = await profileModel.insertProfile(req.body);
            if(profile.rowCount){
                return res.json({
                    success: true,
                    message: 'Register Success'
                });
            }
        }
    }catch(err){
        return res.status(500).json({
            success:false,
            message: "Error"+err.message
           });   
    }
    
}