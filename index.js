const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const port = process.env.PORT || 7485;
const appdata = require("./data.json");

app.get("/", (req, res) => {
    res.send("hello i am ravindrasinh");
});

app.get("/data", (req, res) => {
    res.send(appdata);
});

app.listen(port, () => {
    console.log("i am ravi");
});