const express = require("express");
const userRoutes = require("./routes/userRoutes")
const appdata = require("./data.json");
const User = require("./models/user");
const mongose = require("mongoose");

const app = express();

const port = process.env.PORT || 7485;

mongose.connect("mongodb+srv://test:74857485@cluster0.3snq0fm.mongodb.net/RVCL_DB?retryWrites=true&w=majority"
    , {
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: true,
        useUnifiedTopology: true,
    }
).then(() => {
    console.log("connection is successful");

    app.listen(port, () => {
        console.log("I AM RAVI NOW YOU CAN REQUEST ANY THING");
    });
}).catch((e) => {
    console.log("not connect");
    console.log(e);
});


app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello, i am rvcl");
});

app.use('/user', userRoutes);

// try to login
app.post("/LoginReq", (req, res) => {

    const reqData = req.body;

    User.find(reqData)
        .then((data) => {
            if (data.length == 0) {
                return res.send({ success: false, rool: "" });
            } else {
                return res.send({ success: true, role: data[0].role });
            }
        }).catch((e) => {
            console.log("error :- " + e);
        })


})

// temp api
app.get("/data", async (req, res) => {
    res.send(appdata);
});

