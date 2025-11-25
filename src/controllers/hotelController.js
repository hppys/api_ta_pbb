import { HotelModel } from "../models/hotelModel.js";
import { HotelLocationModel } from "../models/hotelLocationModel.js";
import { HotelFacilityModel } from "../models/hotelFacilityModel.js";

export const HotelController = {
  async getAll(req, res) {
    try {
      const hotels = await HotelModel.getAll();
      res.json(hotels);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const hotel = await HotelModel.getById(req.params.id);
      res.json(hotel);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const { name, rating, price_per_night, image_url, location, facilities } =
        req.body;

      const hotel = await HotelModel.create({
        name,
        rating,
        price_per_night,
        image_url,
      });

      if (location) {
        await HotelLocationModel.create({
          hotel_id: hotel.id,
          ...location,
        });
      }

      if (facilities) {
        for (const f of facilities) {
          await HotelFacilityModel.create({
            hotel_id: hotel.id,
            facility: f,
          });
        }
      }

      res.status(201).json(hotel);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const hotel = await HotelModel.update(req.params.id, req.body);
      res.json(hotel);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      const result = await HotelModel.remove(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
