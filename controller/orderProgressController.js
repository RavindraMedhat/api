const orderProgress = require("../models/orderProgress");
const order_ = require("../models/order");

const add_progress = (req, res) => {

    const newProgress = {
        work: req.body.work,
        place: req.body.place,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    };

    orderProgress.findOne({ order_id: req.body.order_id })
        .then(order => {
            if (!order) {

                const newOrder = new orderProgress({
                    order_id: req.body.order_id,
                    progress: [newProgress],
                    status: "panding"
                });

                newOrder.save().then(() => {
                    return res.status(200).send({ success: true, message: "order Progress is add" });

                }).catch((err) => {
                    return res.status(201).send({ success: false, message: "order Progress is not add :-" + err });
                });
            } else {
                order.progress.push(newProgress);
                order.status = newProgress.work;
                order_.updateOne({ order_id: orderId },
                    { $set: { "status": newProgress.work } }).then(
                        () => {
                            order.save()
                                .then(() => {
                                    return res.status(200).send({ success: true, message: "order Progress is add" });
                                })
                                .catch((err) => {
                                    return res.status(201).send({ success: false, message: "order Progress is not add :-" + err });
                                });
                        }
                    )

            }
        })
        .catch(err => {
            res.status(201).json({ success: false, message: err.message });
        });

}

const add_enddate = (req, res) => {

    orderId = req.body.orderId;
    progressId = req.body.progressId;
    endDate = req.body.endDate;

    orderProgress.updateOne(
        { order_id: orderId, "progress._id": progressId },
        { $set: { "progress.$.end_date": endDate } }
    )
        .then((result) => {
            if (!result) {
                return res.status(201).send({ success: false, message: `Order with ID ${req.body.orderId} or progress item with ID ${req.body.progressId} not found.` + result });
            } else {
                return res.status(200).send({ success: true, message: `End date for progress item with ID ${req.body.progressId} of order with ID ${req.body.orderId} updated successfully.` + result });
            }
        }).catch(err => {
            return res.status(201).json({ success: false, message: err.message });
        });
}

const get_Progress = (req, res) => {

    orderId = req.params.orderId;

    orderProgress.find({ order_id: orderId })
        .then((order_progress_data) => {
            if (!order_progress_data) {
                return res.status(201).send({ success: false, message: `Order with ID ${orderId} not found.` + order_progress_data });
            } else {
                return res.status(200).send({ success: true, data: order_progress_data[0] });
            }
        }).catch(err => {
            return res.status(201).json({ success: false, message: "error :-" + err.message });
        });
}




module.exports = {
    add_progress,
    add_enddate,
    get_Progress
}