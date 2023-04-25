const order = require("../models/order");

const order_add = async (req, res) => {

    const c = new order(req.body);

    c.save().then(() => {
        return res.status(201).send({ success: true, message: "order is add" });
    }).catch((e) => {
        return res.status(201).json({ success: false, message: e.message });
    })
}

const order_list = async (req, res) => {

    order.find()
        .then((order_data) => {
            if (order_data.length == 0)
                return res.status(200).json({ success: false, message: "no data found" });
            else
                return res.status(200).json({ success: true, order_data });
        })
        .catch((e) => {
            console.log("error :- ", e);
            return res.status(400).json(e);
        });

}

module.exports = {
    order_add,
    order_list
}