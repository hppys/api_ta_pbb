import { FlightModel } from "../models/flightModel.js";

export const FlightController = {
  // GET ALL
  async getAll(req, res) {
    try {
      const flights = await FlightModel.getAll();
      res.json(flights);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET BY ID
  async getById(req, res) {
    try {
      const flight = await FlightModel.getById(req.params.id);
      if (!flight) return res.status(404).json({ error: "Flight not found" });
      res.json(flight);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // CREATE (Sederhana karena tidak ada tabel relasi seperti rental_locations)
  async create(req, res) {
    try {
      const newFlight = await FlightModel.create(req.body);
      res.status(201).json(newFlight);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // UPDATE
  async update(req, res) {
    try {
      const updatedFlight = await FlightModel.update(req.params.id, req.body);
      res.json(updatedFlight);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // REMOVE
  async remove(req, res) {
    try {
      const result = await FlightModel.remove(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
