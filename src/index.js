import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import hotelRoutes from "./routes/hotelRoutes.js";
import flightRoutes from "./routes/flightRoutes.js"; // <-- IMPORT BARU
import rentalRoutes from "./routes/rentalRoutes.js"; // <-- IMPORT BARU

dotenv.config();

const app = express();

// Tambahkan CORS
app.use(
  cors({
    origin: "*", // ubah jika frontend kamu Vite
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Base test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// API routes
// Route Hotel yang sudah ada
app.use("/api/hotels", hotelRoutes);

// Route Flights BARU
// Endpoint: /api/flights
app.use("/api/flights", flightRoutes);

// Route Rentals BARU
// Endpoint: /api/rentals
app.use("/api/rentals", rentalRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
