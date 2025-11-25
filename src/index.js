import express from "express";
import dotenv from "dotenv";
import hotelRoutes from "./routes/hotelRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// API routes
app.use("/api/hotels", hotelRoutes);

// ❗ WAJIB untuk Vercel: export default, BUKAN listen()
export default app;
