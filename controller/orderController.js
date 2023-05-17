const customer = require("../models/customer");
// const garmentsType = require("../models/garmentsType");
const order = require("../models/order");
const SellReport = require('../models/report');
const GarmentsType = require("../models/garmentsType");



const order_add = async (req, res) => {

    const c = new order(req.body);

    c.save().then(() => {

        const year = c.order_date.getFullYear();
        const month = c.order_date.toLocaleString('default', { month: 'long' });
        var orderGarmentType = "";

        GarmentsType.findById(c.garment_type_id).then((data) => {
            orderGarmentType = data.garmentsTypeName;
            SellReport.findOne({ year, month }).then((sellReport) => {

                if (!sellReport) {
                    const newSellReport = new SellReport({
                        year,
                        month,
                        sell: [{
                            garmentsTypeName: orderGarmentType,
                            quantity: 1,
                        }],
                    });
                    newSellReport.save().then(() => {
                        return res.status(200).send({ success: true, message: "order is add" });

                    });
                } else {
                    const index = sellReport.sell.findIndex(item => item.garmentsTypeName === orderGarmentType);

                    if (index === -1) {
                        sellReport.sell.push({
                            garmentsTypeName: orderGarmentType,
                            quantity: 1,
                        });
                    } else {
                        sellReport.sell[index].quantity += 1;
                    }

                    sellReport.save().then(() => {
                        return res.status(200).send({ success: true, message: "order is add" });

                    });
                }
            })

        }).catch((e) => {
            return res.status(201).json({ success: false, message: e.message });
        })





    }).catch((e) => {
        return res.status(201).json({ success: false, message: e.message });
    })
}

const order_list = async (req, res) => {

    order.find()
        .then((order_data) => {
            if (order_data.length == 0)
                return res.status(200).json({ success: true, order_data });
            else
                return res.status(200).json({ success: true, order_data });
        })
        .catch((e) => {
            console.log("error :- ", e);
            return res.status(400).json(e);
        });

}

const order_ByOrderId = async (req, res) => {

    order.find({ order_id: req.params.id })
        .then((order_data) => {
            if (order_data.length == 0)
                return res.status(201).json({ success: false, message: "no data found" });
            else {
                customer.findById(order_data[0].customer_id)
                    .then((customer_data) => {
                        if (customer_data.length == 0)
                            return res.status(201).json({ success: false, message: "no data found" });
                        else {
                            garmentsType.findById(order_data[0].garment_type_id)
                                .then((garment_type_data) => {
                                    if (garment_type_data.length == 0)
                                        return res.status(201).json({ success: false, message: "no data found" });
                                    else {
                                        // console.log({ success: true, Data: { order_data: order_data[0], customer_data, garment_type_data } });
                                        return res.status(200).json({ success: true, Data: { order_data: order_data[0], customer_data, garment_type_data } });
                                    }
                                }).catch((e) => {
                                    console.log("error :- ", e);
                                    return res.status(400).json(e);
                                })
                        }
                    })
                    .catch((e) => {
                        console.log("error :- ", e);
                        return res.status(400).json(e);
                    })

            }
        })
        .catch((e) => {
            console.log("error :- ", e);
            return res.status(400).json(e);
        });

}

const order_ByCustomerId = async (req, res) => {

    order.find({ customer_id: req.params.c_id })
        .then((order_data) => {
            if (order_data.length == 0) {
                console.log(req.params.id);
                console.log(order_data);

                return res.status(200).json({ success: false, message: "no data found 1" });

            } else {
                const garmentTypeIds = order_data.map(order => order.garment_type_id);
                garmentsType.find({ _id: { $in: garmentTypeIds } })
                    .then((garment_type_data) => {
                        if (garment_type_data.length == 0) {

                            return res.status(200).json({ success: false, message: "no data found 2" });

                        } else {
                            return res.status(200).json({ success: true, Data: { order_data, garment_type_data } });

                        }
                    }).catch((e) => {
                        console.log("error :- ", e);
                        return res.status(400).json(e);
                    });
            }

        }).catch((e) => {
            console.log("error :- ", e);
            return res.status(400).json(e);
        });
}

module.exports = {
    order_add,
    order_list,
    order_ByOrderId,
    order_ByCustomerId
}