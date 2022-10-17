const check = (req, res, next) => {
    if(req.body.username) {
      return next();
    }else{
      return res.status(404).json({
        success: false,
        message:"Failed to get username data"
      });
    }
  };
  
  module.exports = check;