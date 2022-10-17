const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(cors());
app.user(morgan("dev"));
app.user(
    express.urlencoded({
        extended: false,
    })
);

app.user("/", require("/src/routes"));
appp.listen(8888, () => {
    console.log("App listen on port 8888")
})