import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import flightRoutes from "./routes/flightRoutes.js";
const contactRoutes = require('./routes/contact.js');

const PORT=process.env.PORT

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: ["https://cywav.vercel.app"],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/flights", flightRoutes);
app.use('/api/contact', contactRoutes);


// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT || 5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch(err => console.error("❌ MongoDB Error:", err));
