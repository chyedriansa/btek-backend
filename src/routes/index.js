const routes = require ("express").Router();

routes.use("/users", require("../routes/users.route"));

module.exports = routes;