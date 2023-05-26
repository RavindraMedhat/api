const customer = require("../models/customer");
const garmentsType = require("../models/garmentsType");
const order = require("../models/order");
const SellReport = require('../models/report');
const GarmentsType = require("../models/garmentsType");
const firebase = require("firebase/app");
const path = require("path");


const { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } = require("firebase/storage");

const firebaseConfig = {
    apiKey: "AIzaSyAWSkFneOhBIPRUg0zif8F5irl_fgXHoe0",
    authDomain: "project-sem6-eac05.firebaseapp.com",
    projectId: "project-sem6-eac05",
    storageBucket: "project-sem6-eac05.appspot.com",
    messagingSenderId: "853166853967",
    appId: "1:853166853967:web:a3d6b38895d1ba559c7f3a",
    measurementId: "G-F9DRDBY0CX"
};

firebase.initializeApp(firebaseConfig);
const storage = getStorage();


const order_add = async (req, res) => {

    const c = await new order(req.body);

    Order_form_path = req.body.customer_id + "/" + c._id + "_" + Date.now() + path.extname(req.file.originalname);
    const storageref = ref(storage, Order_form_path);

    const metadata = {
        contentType: 'image/jpg'
    };
    uploadBytes(storageref, req.file.buffer, metadata)
        .then(() => {
            getDownloadURL(storageref).then((url) => {
                c.order_form_img_URL = url;
            }).then(() => {
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
                                    return res.status(200).send({ success: true, message: "order is add", data: c });

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
                                    return res.status(200).send({ success: true, message: "order is add", id: c.id });

                                });
                            }
                        })

                    }).catch((e) => {
                        return res.status(201).json({ success: false, message: e.message });
                    })

                }).catch((e) => {
                    return res.status(201).json({ success: false, message: e.message });
                })
            })
        })


}

const order_list = async (req, res) => {

    order.find({ status: { $regex: /^(?!delivered$)/i } }).sort({ delivery_date: -1 })
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

    order.findById(req.params.id)
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
                GarmentsType.find({ _id: { $in: garmentTypeIds } })
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