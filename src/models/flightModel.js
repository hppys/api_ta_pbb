import { supabase } from "../config/supabaseClient.js";

export const FlightModel = {
  // GET ALL
  async getAll() {
    const { data, error } = await supabase.from("flights").select("*");
    if (error) throw error;
    return data;
  },

  // GET BY ID
  async getById(id) {
    const { data, error } = await supabase
      .from("flights")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  // CREATE (Penting: insert payload apa adanya sesuai kolom tabel)
  async create(payload) {
    const { data, error } = await supabase
      .from("flights")
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // UPDATE
  async update(id, payload) {
    const { data, error } = await supabase
      .from("flights")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // REMOVE
  async remove(id) {
    const { error } = await supabase.from("flights").delete().eq("id", id);

    if (error) throw error;
    return { message: `Flight with ID ${id} successfully deleted.` };
  },
};
