import express from "express";
import axios from "axios";
import FlightSearch from "../models/FlightSearch.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  const { origin, destination, depart_date, return_date, one_way } = req.query;

  if (!origin || !destination || !depart_date) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    // --- Outbound flight ---
    const outboundRes = await axios.get(
      "https://api.travelpayouts.com/aviasales/v3/prices_for_dates",
      {
        params: {
          origin,
          destination,
          departure_at: depart_date,
          token: process.env.TRAVELPAYOUTS_TOKEN,
          currency: "inr",
          sorting: "price",
        },
      }
    );

    let flights = outboundRes.data.data || [];

    // --- If round trip, also fetch return flights ---
    if (one_way === "false" && return_date) {
      const returnRes = await axios.get(
        "https://api.travelpayouts.com/aviasales/v3/get_latest_prices",
        {
          params: {
            origin: destination, // reverse
            destination: origin,
            departure_at: return_date,
            token: process.env.TRAVELPAYOUTS_TOKEN,
            currency: "inr",
            sorting: "price",
          },
        }
      );

      const returnFlights = returnRes.data.data || [];

      // Combine outbound + return
      flights = flights.map((outbound) => {
        returnFlights.forEach((ret) => {
          outbound.return_at = ret.departure_at;
          outbound.return_price = ret.price;
        });
        return outbound;
      });
    }

    res.json({ success: true, data: flights });
  } catch (err) {
    console.error("API error:", err.message);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
});



export default router;
