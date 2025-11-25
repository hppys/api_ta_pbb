import { supabase } from "../config/supabaseClient.js";

export const RentalLocationModel = {
  // Method dasar untuk mencari lokasi berdasarkan rental_id
  async findByRentalId(rentalId) {
    const { data, error } = await supabase
      .from("rental_locations")
      .select("*")
      .eq("rental_id", rentalId)
      .single();

    if (error && error.code !== "PGRST116") throw error; // PGRST116 = not found (bukan fatal)
    return data;
  },

  // --- CREATE OPERATION ---
  async create(locationData) {
    const { data, error } = await supabase
      .from("rental_locations")
      .insert([locationData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // --- UPDATE OPERATION (Internal) ---
  async update(id, locationData) {
    const { data, error } = await supabase
      .from("rental_locations")
      .update(locationData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // --- UPSERT (Update or Create) ---
  // Digunakan oleh RentalController.update
  async updateOrCreate(rentalId, locationData) {
    // Cek apakah lokasi sudah ada
    const existingLocation = await this.findByRentalId(rentalId);

    // Siapkan payload (hapus rental_id agar tidak duplikat di query update)
    const payload = { ...locationData };
    delete payload.rental_id;

    if (existingLocation) {
      return this.update(existingLocation.id, payload);
    } else {
      return this.create({
        rental_id: rentalId,
        ...locationData,
      });
    }
  },
};
