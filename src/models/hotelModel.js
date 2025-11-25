import { supabase } from "../config/supabaseClient.js";

export const HotelModel = {
  async getAll() {
    const { data, error } = await supabase.from("hotels").select(`
        id, name, rating, price_per_night, image_url,
        hotel_locations(*),
        hotel_facilities(facility)
      `);

    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("hotels")
      .select(
        `
        id, name, rating, price_per_night, image_url,
        hotel_locations(*),
        hotel_facilities(facility)
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(payload) {
    const { data, error } = await supabase
      .from("hotels")
      .insert([
        {
          name: payload.name,
          rating: payload.rating,
          price_per_night: payload.price_per_night,
          image_url: payload.image_url,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from("hotels")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase.from("hotels").delete().eq("id", id);

    if (error) throw error;
    return { message: "Hotel deleted" };
  },
};
