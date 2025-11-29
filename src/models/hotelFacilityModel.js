import { supabase } from "../config/supabaseClient.js";

export const HotelFacilityModel = {
  // Method CREATE (sudah ada sebelumnya)
  async create(facilityData) {
    const { data, error } = await supabase
      .from("hotel_facilities")
      .insert([facilityData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Method SYNC (Hapus Lama -> Tambah Baru)
  // Ini fungsi yang dicari oleh Controller Anda
  async syncFacilities(hotelId, facilities) {
    // 1. Hapus semua fasilitas lama untuk hotel ini
    const { error: deleteError } = await supabase
      .from("hotel_facilities")
      .delete()
      .eq("hotel_id", hotelId);

    if (deleteError) throw deleteError;

    // 2. Insert fasilitas baru (jika ada array fasilitas)
    if (facilities && facilities.length > 0) {
      // Siapkan array objek untuk bulk insert
      const facilitiesToInsert = facilities.map((f) => ({
        hotel_id: hotelId,
        facility: f, // String nama fasilitas
      }));

      const { error: insertError } = await supabase
        .from("hotel_facilities")
        .insert(facilitiesToInsert);

      if (insertError) throw insertError;
    }

    return true;
  },
};
