const express = require("express");
require("./database/conn")

const User = require("./models/user")
const app = express();
app.use(express.json());

const port = process.env.PORT || 7485;
const appdata = require("./data.json");

app.get("/", (req, res) => {
    res.send("hello, i am rvcl");
});

// add user
app.post("/AddUser", async (req, res) => {
    try {
        const reqdata = new User(req.body);
        const data = await User.find({ username: reqdata.username });
        if (data.length == 0) { 
            await reqdata.save();
            return res.status(201).send({ success: true, message: "user is add" });
        } else {
            return res.send({ success: false, message: "username alredy used" });
        }
    } catch (e) {
        console.log("error :- ", e);
        res.status(400).send(e);
    }
})

// get list of users
app.post("/users", async (req, res) => {
    try {
        const user_data = await User.find();
        if (user_data.length == 0)
            return res.status(200).json({ success: false, message: "no data found" });
        else
            return res.status(200).json({ success: true, user_data });
    } catch (e) {
        console.log("error :- ", e);
        return res.status(400).json(e);
    }
})

// get user data by username
app.post("/userByName", async (req, res) => {
    try {
        const username = req.body;
        const data = await User.find(username);
        console.log(req.body);
        console.log(data);
        if (data.length == 0)
            return res.status(404).send({ data: "no data found" });
        else
            return res.status(401).send({ data: data });
    } catch (e) {
        console.log("error :- ", e);
        res.status(400).send(e);
    }
})

// check user is there or not
app.post("/isUserThere", async (req, res) => {
    try {
        const username = req.body;
        console.log(username.username);
        const data = await User.find(username);
        if (data.length == 0)
            return res.status(404).send({ isUserThere: false, message: "there are no data of username" });
        else if (data.length == 1)
            return res.status(401).send({ isUserThere: true, message: "there are 1 data of username" });
        else
            return res.status(401).send({ isUserThere: false, message: "there are more then 1 data of same username" });

    } catch (e) {
        console.log("error :- ", e);
        res.status(400).send(e);
    }
})

// try to login
app.post("/LoginReq", async (req, res) => {

    const reqData = req.body;
    const data = await User.find(reqData);

    if (data.length == 0) {
        return res.send({ success: false, rool: "" });
    } else {
        return res.send({ success: true, role: data[0].role });
    }

})

// temp api
app.get("/data", async (req, res) => {
    res.send(appdata);
});

app.get("/vivek", (req, res) => {
    res.send(" hii vivek i am ravindrasinh");
})

app.listen(port, () => {
    console.log("i am ravi");
});