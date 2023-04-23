const customer = require("../models/customer");

const customer_add = async (req, res) => {

    const c = new customer(req.body);

    c.save().then(() => {
        return res.status(201).send({ success: true, message: "customer is add" });
    }).catch((e) => {
        return res.status(201).json({ success: false, message: e.message });
    })
}

const customer_list = async (req, res) => {

    customer.find()
        .then((customer_data) => {
            if (customer_data.length == 0)
                return res.status(200).json({ success: false, message: "no data found" });
            else
                return res.status(200).json({ success: true, customer_data });
        })
        .catch((e) => {
            console.log("error :- ", e);
            return res.status(400).json(e);
        });

}

module.exports = {
    customer_add,
    customer_list
}