const User = require("../models/user")
const express = require("express");
const router = express.Router();

// add user
router.post("/add", async (req, res) => {
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

// get list of all users
router.get("/list", async (req, res) => {
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
router.get("/:userName", async (req, res) => {
    try {
        const username = req.params.userName ;
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
router.post("/isThere", async (req, res) => {
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

module.exports = router;