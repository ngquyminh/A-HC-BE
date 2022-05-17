/* eslint-disable func-names */
const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
  },
  steps: {
    type: Number,
  },
  duration: {
    type: Number,
  },
  sleepRate: {
    type: Number,
  }, 
  tripLocationFrom: { 
    type: String,
  }, 
  tripLocationTo: {
    type: String,
  },
  tripType: {
    type: String,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = { Activity };
