const GarmentTracking = require("../models/garment_tracking");

const addRecord = (req, res) => {

    const newTrack = {
        place: req.body.place,
        details: req.body.details,
        sending_date: req.body.sending_date,
        receiving_date: req.body.receiving_date
    };

    GarmentTracking.findOne({ garment_tracking_id: req.body.garment_tracking_id })
        .then(garment => {
            if (!garment) {
                const newGarment = new GarmentTracking({
                    garment_tracking_id: req.body.garment_tracking_id,
                    garment_type_id: req.body.garment_type_id,
                    current_place: req.body.place,
                    records: [],
                });

                newGarment.save().then(() => {
                    return res.status(200).send({ success: true, message: "Garment tracking record added" });
                }).catch((err) => {
                    return res.status(500).send({ success: false, message: "Error while adding garment tracking record: " + err });
                });
            } else {
                garment.records.push(newTrack);
                garment.save().then(() => {
                    return res.status(200).send({ success: true, message: "Garment tracking record added" });
                }).catch((err) => {
                    return res.status(500).send({ success: false, message: "Error while adding garment tracking record: " + err });
                });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, message: err.message });
        });
};

const updateReceivingDate = (req, res) => {
    const { garment_tracking_id, record_id, receiving_date } = req.body;

    GarmentTracking.findOneAndUpdate(
        { garment_tracking_id, "records._id": record_id },
        { $set: { "records.$.receiving_date": receiving_date } },
        // { new: true }
    )
        .then(updatedGarment => {
            if (!updatedGarment) {
                return res.status(404).send({ success: false, message: `Record with ID ${record_id} not found for garment with ID ${garment_tracking_id}` });
            } else {
                return res.status(200).send({ success: true, message: `Receiving date for record with ID ${record_id} of garment with ID ${garment_tracking_id} updated successfully.` });
            }
        })
        .catch(err => {
            return res.status(500).json({ success: false, message: err.message });
        });
};

const getRecord = (req, res) => {
    const garment_tracking_id = req.params.garmentTrackingId;

    GarmentTracking.findOne({ garment_tracking_id })
        .then(garment => {
            if (!garment) {
                return res.status(404).send({ success: false, message: `Garment with ID ${garment_tracking_id} not found` });
            } else {
                return res.status(200).send({ success: true, data: garment });
            }
        })
        .catch(err => {
            return res.status(500).json({ success: false, message: err.message });
        });
};


const getRecords = (req, res) => {

    GarmentTracking.find()
        .then(garment => {
            if (!garment) {
                return res.status(404).send({ success: false, message: `Garment with ID ${garment_tracking_id} not found` });
            } else {
                return res.status(200).send({ success: true, data: garment });
            }
        })
        .catch(err => {
            return res.status(500).json({ success: false, message: err.message });
        });
};

module.exports = {
    addRecord,
    updateReceivingDate,
    getRecord, 
    getRecords
};