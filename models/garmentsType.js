const mongose = require("mongoose");

const garmentsTypeSchema = new mongose.Schema({

    garmentsTypeName: {
        type: String,
        required: [true, 'Please enter garmentsTypeName'],
        // minLength: [5, 'Please enter minimum 5 latern in garmentsTypeName'],
    },
    garmentImageURL: {
        type: String,
        required: [true, 'garment image url not found'],
        // minLength: [5, 'Please enter minimum 5 latern in password'],
    },
    garmentImagePath: {
        type: String,
        required: [true, 'garment image path not found'],
        // minLength: [5, 'Please enter minimum 5 latern in password'],
    },
    collectionName: {
        type: String,
        required: [true, 'Please enter collection Name'],
    }

}, { timestamps: true });

const garmentsType = new mongose.model('garmentsType', garmentsTypeSchema);

module.exports = garmentsType;
