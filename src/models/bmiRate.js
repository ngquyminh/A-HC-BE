/* eslint-disable func-names */
const mongoose = require("mongoose");

const bmiRateSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const BMIRate = mongoose.model("BMIRate", bmiRateSchema);

module.exports = { BMIRate };
