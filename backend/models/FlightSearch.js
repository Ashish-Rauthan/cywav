import mongoose from "mongoose";

const flightSearchSchema = new mongoose.Schema({
  origin: String,
  destination: String,
  depart_date: String,
  return_date: String,
  one_way: Boolean,
  results: Object, // store API response
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("FlightSearch", flightSearchSchema);
