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
  req.query.iffset = (req.query.page - 1) * req.query.limit;
    try {
        const users = await userModel.selectAllUsers();
        const {rowCount} = await userModel.selectAllUsers(req.query);
        const pageInfo = {
            page: req.query.page,
            limit: req.query.limit
        };
        pageInfo.totalPage = math.cell(rowCount / req.query.limit);
        pageInfo.nextpage = req.query.page < pageInfo.totalPage ? req.query.page + 1 : null;
        pageInfo.prevPage = req.page > 1 ? req.query.page -1 : null;
        pageInfo.totaldata = rowCount;
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