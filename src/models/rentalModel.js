import { supabase } from "../config/supabaseClient.js";

export const RentalModel = {
  // --- READ OPERATIONS ---

  // Mengambil semua rental dengan lokasi terkait (menggunakan Supabase join)
  async getAll() {
    const { data, error } = await supabase.from("rentals").select(`
        *, 
        rental_locations(*)
      `);

    if (error) throw error;
    return data;
  },

  // Mengambil rental berdasarkan ID dengan lokasi
  async getById(id) {
    const { data, error } = await supabase
      .from("rentals")
      .select(
        `
        *, 
        rental_locations(*)
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  // --- CREATE OPERATION ---
  async create(payload) {
    const { data, error } = await supabase
      .from("rentals")
      .insert([payload])
      .select()
      .single(); // Penting: kembalikan objek yang baru dibuat (termasuk ID)

    if (error) throw error;
    return data;
  },

  // --- UPDATE OPERATION ---
  async update(id, payload) {
    const { data, error } = await supabase
      .from("rentals")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // --- DELETE OPERATION ---
  async remove(id) {
    const { error } = await supabase.from("rentals").delete().eq("id", id);

    if (error) throw error;
    return { message: "Rental deleted successfully" };
  },
};
