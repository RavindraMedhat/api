const express = require("express");
const cors = require('cors');

const userRoutes = require("./routes/userRoutes")
const garmentsTypeRoutes = require("./routes/garmentsTypeRoutes")
const customerRoutes = require("./routes/customerRoutes")
const orderRoutes = require("./routes/orderRoutes")
const orderProgressRoutes = require("./routes/orderProgress")
const sellReportRoutes = require("./routes/sellReportRoutes")
const garment_tracking = require("./routes/garmentTrackingRoutes")

const appdata = require("./data.json");
const User = require("./models/user");
const mongose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();

const port = process.env.PORT || 7485;


// code for connection

mongose.connect("mongodb+srv://test:74857485@cluster0.3snq0fm.mongodb.net/RVCL_DB",
    {
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

const allowedOrigins = [''];

// Enable CORS for specified origins
app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.use(express.json());

app.use((req, res, next) => {
    console.log("New Request");
    console.log("url : -" + req.hostname + req.url);
    next();
})

app.get("/", (req, res) => {
    res.send("hello, i am rvcl");
});

// app.use(allApi);

app.use('/user', userRoutes);

app.use('/garmentsType', garmentsTypeRoutes);

app.use('/customer', customerRoutes);

app.use('/order', orderRoutes);

app.use('/orderProgress', orderProgressRoutes);

app.use('/sellReport', sellReportRoutes);

app.use('/garment_tracking', garment_tracking);



// try to login  
app.post("/LoginReq", (req, res) => {

    User.find({ username: req.body.username })
        .then((data) => {
            // console.log(req.body.password, data.password);
            console.log(data);
            if (data.length == 0) {
                return res.send({ success: false, rool: "", error: "user is not found" });
            } else {
                bcrypt.compare(req.body.password, data[0].password).then((boll) => {
                    if (boll) {
                        console.log(req.body.password);
                        return res.send({ success: true, role: data[0].role, error: "" });
                    } else {
                        return res.send({ success: false, rool: "", error: "password is not corect" });
                    }
                });
            }
        }).catch((e) => {
            console.log("error :- " + e);
        })
})

// temp api
app.get("/data", async (req, res) => {
    res.send(appdata);
});

