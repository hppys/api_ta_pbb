import { HotelModel } from "../models/hotelModel.js";
import { HotelLocationModel } from "../models/hotelLocationModel.js";
import { HotelFacilityModel } from "../models/hotelFacilityModel.js";
// Import Supabase Client juga diperlukan jika Anda perlu memulai transaksi,
// tetapi kita akan mengandalkan Model untuk saat ini.

export const HotelController = {
  // --- READ OPERATIONS ---

  async getAll(req, res) {
    try {
      // HotelModel.getAll sudah mengambil relasi (lokasi & fasilitas)
      const hotels = await HotelModel.getAll();
      res.json(hotels);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      // HotelModel.getById sudah mengambil relasi
      const hotel = await HotelModel.getById(req.params.id); // Cek apakah hotel ditemukan
      if (!hotel) {
        return res.status(404).json({ error: "Hotel not found" });
      }
      res.json(hotel);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }, // --- CREATE OPERATION ---

  async create(req, res) {
    // Catatan: Logika ini masih berisiko data inkonsisten tanpa transaksi database.
    try {
      const { name, rating, price_per_night, image_url, location, facilities } =
        req.body; // 1. Buat Hotel Utama

      const hotel = await HotelModel.create({
        name,
        rating,
        price_per_night,
        image_url,
      });

      // Ambil ID hotel baru untuk relasi
      const hotelId = hotel.id; // 2. Buat Lokasi

      if (location) {
        await HotelLocationModel.create({
          hotel_id: hotelId,
          ...location,
        });
      } // 3. Buat Fasilitas

      if (facilities && Array.isArray(facilities)) {
        // Gunakan Promise.all untuk eksekusi paralel (lebih cepat)
        const facilityPromises = facilities.map((f) =>
          HotelFacilityModel.create({ hotel_id: hotelId, facility: f })
        );
        await Promise.all(facilityPromises);
      } // 4. AMBIL DATA HOTEL LENGKAP SEBAGAI RESPON (Mendapatkan semua relasi)

      const createdHotel = await HotelModel.getById(hotelId);

      res.status(201).json(createdHotel);
    } catch (err) {
      // Status 400 untuk bad request, termasuk error database
      res
        .status(400)
        .json({ error: "Failed to create hotel.", details: err.message });
    }
  }, // --- UPDATE OPERATION ---

  async update(req, res) {
    try {
      const { location, facilities, ...hotelData } = req.body;
      const hotelId = req.params.id; // 1. Update data Hotel utama (jika ada data non-relasi)

      if (Object.keys(hotelData).length > 0) {
        // Kita tidak perlu menyimpan hasilnya karena kita akan panggil getById di akhir
        await HotelModel.update(hotelId, hotelData);
      } // 2. Update atau buat data Lokasi (Membutuhkan implementasi di HotelLocationModel)

      if (location) {
        await HotelLocationModel.updateOrCreate(hotelId, location);
      } // 3. Sinkronisasi Fasilitas (Membutuhkan implementasi di HotelFacilityModel)

      if (facilities) {
        await HotelFacilityModel.syncFacilities(hotelId, facilities);
      }

      // 4. AMBIL DATA LENGKAP SEBAGAI RESPON
      const updatedHotel = await HotelModel.getById(hotelId);

      res.json(updatedHotel);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Failed to update hotel data.", details: err.message });
    }
  }, // --- DELETE OPERATION ---

  async remove(req, res) {
    try {
      const result = await HotelModel.remove(req.params.id); // Jika Supabase berhasil, kirim pesan sukses
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
