const users = require ("express").Router();

const userController = require("../controllers/users.controller");

users.post("/", userController.createUser);
users.get("/", userController.readAllUsers);
users.get("/:id", userController.readUserById);
users.put("/:id", userController.editUserById);
users.delete("/:id", userController.deleteUserById);

module.exports = users;