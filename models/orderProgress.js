const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  work: String,
  place: String,
  start_date: Date,
  end_date: Date
});

const orderProgressSchema = new mongoose.Schema({
  order_id: String,
  progress: [progressSchema],
  status: String
});

const orderProgress = mongoose.model('OrderProgress', orderProgressSchema);

module.exports = orderProgress;
