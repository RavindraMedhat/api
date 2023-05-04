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

const customer_search = (req, res) => {
    const name = req.params.name;
    customer.find({ name: { $regex: name, $options: 'i' } }).then((customer_data) => {
        return res.status(200).json({ success: true, customer_data });

    }).catch((e) => {
        return res.status(201).json({ success: false, message: e.message });
    });
}

const customer_sort_last_10 = async (req, res) => {

    const customer_data = await customer.find()
        .sort({ createdAt: -1 })
        .limit(10).then((customer_data) => {
            return res.status(200).json({ success: true, customer_data });

        }).catch((e) => {
            return res.status(201).json({ success: false, message: e.message });
        });

}

module.exports = {
    customer_add,
    customer_list,
    customer_search,
    customer_sort_last_10
}