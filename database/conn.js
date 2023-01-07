const mongose = require("mongoose");
mongose.connect("mongodb+srv://test:test@cluster0.3snq0fm.mongodb.net/RVCL_DB?retryWrites=true&w=majority"
    , {
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: true,
        useUnifiedTopology: true,
    }
).then(() => {
    console.log("connection is successful");
}).catch((e) => {
    console.log("not connect");
    console.log(e);
});