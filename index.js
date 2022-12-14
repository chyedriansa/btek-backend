const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use("/assets/uploads", express.static(path.join(__dirname,"src", "assets", "uploads")))

app.use("/", require("./src/routes"));

app.listen(8888, ()=> {
  console.log("app listening on port 8888");
});