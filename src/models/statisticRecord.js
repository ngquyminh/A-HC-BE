/* eslint-disable func-names */
const mongoose = require("mongoose");

const statisticRecordSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  record: {
    type: Number,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const StatisticRecord = mongoose.model("StatisticRecord", statisticRecordSchema);

module.exports = { StatisticRecord };
