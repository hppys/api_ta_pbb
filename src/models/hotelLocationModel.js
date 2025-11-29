import { supabase } from "../config/supabaseClient.js";

export const HotelLocationModel = {
  async create(locationData) {
    const { data, error } = await supabase
      .from("hotel_locations")
      .insert([locationData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Fungsi Helper: Cari berdasarkan ID Hotel
  async findByHotelId(hotelId) {
    const { data, error } = await supabase
      .from("hotel_locations")
      .select("*")
      .eq("hotel_id", hotelId)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data;
  },

  // Fungsi Update or Create (Upsert)
  async updateOrCreate(hotelId, locationData) {
    // Cek apakah lokasi sudah ada
    const existingLocation = await this.findByHotelId(hotelId);

    // Hapus hotel_id dari payload update agar aman
    const payload = { ...locationData };
    delete payload.hotel_id;

    if (existingLocation) {
      // Update
      const { data, error } = await supabase
        .from("hotel_locations")
        .update(payload)
        .eq("id", existingLocation.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      // Create baru
      return this.create({
        hotel_id: hotelId,
        ...locationData,
      });
    }
  },
};
