const User = require("../models/user")

const handleError = (err) => {
    // console.log(err.message, err.code);
    const error = { username: '', password: '', role: '' };
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(e => {
            console.log(e.properties)
            error[e.properties.path] = e.properties.message;
        });
        console.log(error);
    }

    return error;
}

const user_add = (req, res) => {
    const reqdata = new User(req.body);

    User.find({ username: reqdata.username })
        .then((data) => {
            if (data.length == 0) {
                reqdata.save()
                    .then(() => {
                        return res.status(201).send({ success: true, message: "user is add" });
                    })
                    .catch((e) => {
                        console.log("error fing", e);
                        const error = handleError(e);
                        // res.status(400).send(e);
                        // return res.status(201).send({ success: true, message: e.message });
                        return res.status(201).json({ success: false, error });

                    });
            } else {
                return res.send({
                    success: false, error: {
                        username: 'User name alreday used',
                        password: '',
                        role: ''
                    }
                });
            }
        })
        .catch((e) => {
            // handleError(e);
            res.status(400).send(e);
        })

}

const user_list = (req, res) => {
    User.find()
        .then((user_data) => {
            if (user_data.length == 0)
                return res.status(200).json({ success: false, message: "no data found" });
            else
                return res.status(200).json({ success: true, user_data });
        })
        .catch((e) => {
            console.log("error :- ", e);
            return res.status(400).json(e);
        });
}

const user_by_name = (req, res) => {
    const username = req.params.userName;

    User.find({ username: username })
        .then((data) => {
            console.log(req.body);
            console.log(data);
            if (data.length == 0)
                return res.status(404).send({ data: "no data found" });
            else
                return res.status(401).send({ data: data });
        })
        .catch((e) => {
            console.log("error :- ", e);
            res.status(400).send(e);
        })
}

const user_is_there = (req, res) => {
    const username = req.body;
    console.log(username.username);

    User.find(username)
        .then((data) => {
            if (data.length == 0)
                return res.status(404).send({ isUserThere: false, message: "there are no data of username" });
            else if (data.length == 1)
                return res.status(401).send({ isUserThere: true, message: "there are 1 data of username" });
            else
                return res.status(401).send({ isUserThere: false, message: "there are more then 1 data of same username" });
        })
        .catch((e) => {
            console.log("error :- ", e);
            res.status(400).send(e);
        })
}

module.exports = {
    user_add,
    user_list,
    user_by_name,
    user_is_there
}