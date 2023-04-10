const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes")

const port = process.env.PORT || 7485;
const appdata = require("./data.json");


require("./database/conn")


app.get("/", (req, res) => {
    res.send("hello, i am rvcl");
});

app.use(express.json());

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