const express = require("express");
require("./database/conn")
// const port = process.env.PORT || 1234;
const User = require("./models/user")
const cors = require("cors");
const app = express();
app.use(express.json());

const port = process.env.PORT || 7485;
const appdata = require("./data.json");

app.get("/", (req, res) => {
    res.send("hello i am ravindrasinh");
});

app.post("/user", async (req, res) => {

    try {
        const reqdata = new User(req.body);
        const createUser = await reqdata.save();
        res.status(201).send(createUser);
        // console.log("user is add");
    } catch (e) {
        console.log("error :- ", e);
        res.status(400).send(e);
    }
})

app.get("/users", async (req, res) => {
    // res.send(appdata);
    try {
        const data = await User.find();
        res.send(data);
    } catch (e) {
        console.log("error :- ", e);
        res.status(400).send(e);
        // res.send(appdata);
    }

})
app.get("/data", async (req, res) => {
    res.send(appdata);
});

app.listen(port, () => {
    console.log("i am ravi");
});