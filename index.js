const express = require("express");
require("./conn")

const cors = require("cors");
const app = express();
app.use(cors());

const port = process.env.PORT || 7485;
const appdata = require("./data.json");

app.get("/", (req, res) => {
    res.send("hello i am ravindrasinh");
});

app.get("/users", async (req, res) => {

    try {
        const data = await User.find();
        res.send(data);
    } catch (e) {
        console.log("error :- ", e);
        res.status(400).send(e);
    }
})
app.get("/data", (req, res) => {
    res.send(appdata);
});

app.listen(port, () => {
    console.log("i am ravi");
});