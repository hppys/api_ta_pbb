import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import hotelRoutes from "./routes/hotelRoutes.js";

dotenv.config();

const app = express();

// Tambahkan CORS
app.use(
  cors({
    origin: "*", // atau "http://localhost:5173" saja
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
app.use("/api/hotels", hotelRoutes);

export default app;
