const profile = require ('express').Router()
const auth = require ('../middlewares/auth.middleware')


profile.get("/", require("../controllers/profile.controller").readProfileById);
profile.get("/:id", require("../controllers/profile.controller").readProfileById);
profile.put("/", auth, require('../controllers/profile.controller').updateProfile);


module.exports = profile