"use server";

import { createClient } from "@/utils/supabase/server";

export interface user {
  id: string;
  email: string;
  name: string;
}

export async function getUserInfo(email?: string) {
  const supabase = await createClient();
  try {
    const res = await supabase
      .from("user")
      .select("*")
      .eq("email", email)
      .single();

    if (res.error) {
      throw new Error(`Error fetching user info: ${res.error.message}`);
    }
    return res.data;
  } catch (error) {
    console.error("Error in getUserInfo:", error);
    throw error;
  }
}
