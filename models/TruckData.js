const mongoose = require("mongoose");

const TruckSchema = new mongoose.Schema({
  truck_id: String,
  latitude: Number,
  longitude: Number,
  speed: Number,
  timestamp: Number,
  route_deviation: Boolean,
  idle: Boolean,
  fuel_alert: Boolean
});

TruckSchema.index({ truck_id: 1, timestamp: -1 });
module.exports = mongoose.model("TruckData", TruckSchema);