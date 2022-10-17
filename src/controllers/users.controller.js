const userModel = require ("../models/users.model");

exports.createUser = async(req, res) => {
  try{
    const insert = await userModel.insertUser(req.body);
    const user = insert.rows[0];
    return res.json({
      success: true,
      message: "Create user successfully",
      results: user
    });
  } catch(err) {
    return res.status(500).json({
      success:false,
      message: "Error"+err.message
    });
  }
};


exports.readAllUsers = async(req, res) => {
  try {
    const users = await userModel.selectAllUsers();

    return res.json({
      success: true,
      message:"List All User",
      result: users.rows
    });
  }catch (err){
    return res.status(500).json({
      success:false,
      message: "Error"+err.message
    });
  }
};

exports.readUserById = async(req, res) => {
  try {
    const user = await userModel.selectUserById(req.params.id);

    return res.json({
      success: true,
      message:"Detail user",
      result: user.rows[0]
    });
  }catch (err){
    return res.status(500).json({
      success:false,
      message: "Error"+err.message
    });
  }
};

exports.editUserById = async(req, res) => {
  try {
    const update = await userModel.updateUserById(req.params.id, req.body.email.password);
    const user = update.rows[0];

    return res.json({
      success: true,
      message:"Update Success",
      result: user
    });
  }catch (err){
    return res.status(500).json({
      success:false,
      message: "Error"+err.message
    });
  }
};

exports.deleteUserById = async(req, res) => {
  try {
    const user = await userModel.deleteUserById(req.params.id);

    return res.json({
      success: true,
      message:"User Deleted",
      result: user.rows[0]
    });
  }catch (err){
    return res.status(500).json({
      success:false,
      message: "Error"+err.message
    });
  }
};