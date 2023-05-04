const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    garmentsTypeName: String,
    quantity: Number
});

const sellReportSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    sell: {
        type: [DataSchema],
    },

});



module.exports = mongoose.model('sellReport', sellReportSchema);

