const express = require("express");
require("./database/conn")
require("./login/login")


const User = require("./models/user")
const app = express();
app.use(express.json());

const port = process.env.PORT || 7485;
const appdata = require("./data.json");

app.get("/", (req, res) => {
    res.send("hello, i am rvcl");
});


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



// temp api
app.get("/data", async (req, res) => {
    res.send(appdata);
});

app.get("/vivek", (req, res) => {
    res.send(" hii vivek i am ravindrasinh");
});

app.get("/dir", (req, res) => {
    res.send(__dirname);
})

app.listen(port, () => {
    console.log("i am ravi");
});