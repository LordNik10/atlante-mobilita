"use server";

import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export async function createUserInfo(userInfo?: User) {
  const supabase = await createClient();
  try {
    const res = await supabase.from("user").insert({
      email: userInfo?.email,
      name: userInfo?.user_metadata.name,
    });

    if (res.error) {
      throw new Error(`Error fetching user info: ${res.error.message}`);
    }
    return res.data;
  } catch (error) {
    console.error("Error in getUserInfo:", error);
    throw error;
  }
}
