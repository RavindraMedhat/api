const mongoose = require('mongoose');

const garment_tracking_Schema = new mongoose.Schema({
    // garment_tracking_id: String,
    garment_type_id: String,
    current_place: String,
    records: [{
        place: String,
        details: String,
        sending_date: Date,
        receiving_date: Date
    }]
});

const Garment_tracking = mongoose.model('Garment', garment_tracking_Schema);

module.exports = Garment_tracking;
