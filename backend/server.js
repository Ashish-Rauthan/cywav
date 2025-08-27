import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import flightRoutes from "./routes/flightRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/flights", flightRoutes);

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch(err => console.error("❌ MongoDB Error:", err));
