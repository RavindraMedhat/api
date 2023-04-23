const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contactDetails: {
    type: {
      mobileNumber: {
        type: Number,
        required: true
      },
      email: {
        type: String,
      },
      address: {
        type: String,
      }
    },
    required: true
  },
  aadharNumber: {
    type: String,
  }
});

module.exports = mongoose.model('customer', customerSchema);

