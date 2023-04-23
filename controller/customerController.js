const customer = require("../models/customer");

const customer_add = async (req, res) => {

    const c = new customer(req.body);

    c.save().then(() => {
        return res.status(201).send({ success: true, message: "customer is add" });
    }).catch((e) => {
        return res.status(201).json({ success: false, message: e.message });
    })
}


module.exports = {
    customer_add
}