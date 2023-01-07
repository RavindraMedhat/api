const express = require("express");
require("./database/conn")

const User = require("./models/user")
const app = express();
app.use(express.json());

const port = process.env.PORT || 7485;
const appdata = require("./data.json");

app.get("/", (req, res) => {
    res.send("hello i am ravindrasinh");
});

// add user
app.post("/user", async (req, res) => {

    try {
        const reqdata = new User(req.body);
        const createUser = await reqdata.save();
        res.status(201).send(createUser);
    } catch (e) {
        console.log("error :- ", e);
        res.status(400).send(e);
    }
})

// get list of users
app.post("/users", async (req, res) => {
    try {
        const data = await User.find();
        res.send(data);
    } catch (e) {
        console.log("error :- ", e);
        res.status(400).send(e);
    }

})
// get user data by id
app.get("/user/:id", async (req, res) => {

    try {
        const _id = req.params.id;
        const data = await User.findById(_id);
        console.log(data);
        if (!data)
            return res.status(404).send();
        else
            res.send(data);

    } catch (e) {
        console.log("error :- ", e);
        res.status(400).send(e);
    }
})

app.get("/data", async (req, res) => {
    res.send(appdata);
});

app.listen(port, () => {
    console.log("i am ravi");
});