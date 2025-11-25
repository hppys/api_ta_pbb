import { RentalModel } from "../models/rentalModel.js";
import { RentalLocationModel } from "../models/rentalLocationModel.js";

export const RentalController = {
  // --- READ OPERATIONS ---

  async getAll(req, res) {
    try {
      const rentals = await RentalModel.getAll();
      res.json(rentals);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const rental = await RentalModel.getById(req.params.id);
      if (!rental) {
        return res.status(404).json({ error: "Rental not found" });
      }
      res.json(rental);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // --- CREATE OPERATION (POST) ---
  async create(req, res) {
    try {
      // 1. Pisahkan data 'location' dari data rental lainnya
      const { location, ...rentalData } = req.body;

      // 2. Buat data Rental utama
      const newRental = await RentalModel.create(rentalData);
      const rentalId = newRental.id;

      // 3. Buat Lokasi Rental jika data lokasi dikirim
      if (location) {
        await RentalLocationModel.create({
          rental_id: rentalId,
          ...location,
        });
      }

      // 4. Ambil ulang data lengkap (termasuk relasi lokasi) untuk dikirim sebagai respons
      const fullRentalData = await RentalModel.getById(rentalId);

      res.status(201).json(fullRentalData);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // --- UPDATE OPERATION (PUT) ---
  async update(req, res) {
    try {
      const { location, ...rentalData } = req.body;
      const rentalId = req.params.id;

      // 1. Update data Rental utama (jika ada field yang dikirim)
      if (Object.keys(rentalData).length > 0) {
        await RentalModel.update(rentalId, rentalData);
      }

      // 2. Update atau Buat lokasi baru (Upsert)
      if (location) {
        // Pastikan method 'updateOrCreate' sudah ada di RentalLocationModel
        await RentalLocationModel.updateOrCreate(rentalId, location);
      }

      // 3. Ambil data terbaru untuk respons
      const updatedRental = await RentalModel.getById(rentalId);

      res.json(updatedRental);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // --- DELETE OPERATION (DELETE) ---
  async remove(req, res) {
    try {
      await RentalModel.remove(req.params.id);
      res.json({ message: "Rental deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
