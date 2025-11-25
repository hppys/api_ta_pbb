import { supabase } from "../config/supabaseClient.js";

export const HotelLocationModel = {
  async create(location) {
    const { data, error } = await supabase
      .from("hotel_locations")
      .insert([location])
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
