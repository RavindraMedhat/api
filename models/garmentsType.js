const mongose = require("mongoose");

const garmentsTypeSchema = new mongose.Schema({

    garmentsTypeName: {
        type: String,
        required: [true, 'Please enter garmentsTypeName'],
        minLength: [5, 'Please enter minimum 5 latern in garmentsTypeName'],
    },
    garmentImage: {
        type: String,
        required: [true, 'Please enter password'],
        minLength: [5, 'Please enter minimum 5 latern in password'],
    },
    collectionName: {
        type: String,
        required: [true, 'Please enter collection Name'],

    }
    // ,
    // profilePhoto:{
    //     type : Buffer,
    //     required:true
    // }

}, { timestamps: true });


const garmentsType = new mongose.model('garmentsType', garmentsTypeSchema);

module.exports = garmentsType;
