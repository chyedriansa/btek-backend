const profile = require ('express').Router()


profile.get("/:id", require("../controllers/profile.controller").readProfileById);
profile.get("/", require("../controllers/profile.controller").readProfileById);


module.exports = profile