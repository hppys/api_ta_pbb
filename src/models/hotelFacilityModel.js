import { supabase } from "../config/supabaseClient.js";

export const HotelFacilityModel = {
  async create(facility) {
    const { data, error } = await supabase
      .from("hotel_facilities")
      .insert([facility])
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
