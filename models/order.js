const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // order_id: {
    //     type: String,
    //     required: true
    // },
    customer_id: {
        type: String,
        required: true
    },
    order_date: {
        type: Date,
        required: true
    },
    delivery_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    garment_type_id: {
        type: String,
        required: true
    },order_form_img_URL: {
        type: String,
        required: true
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
