"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const getURL = () => {
  let url = process.env.NEXT_PUBLIC_REDIRECT_URL;
  url = url?.startsWith("http") ? url : `http://${url}`;
  url = url?.endsWith("/") ? url : `${url}/`;
  return url;
};

export async function login() {
  const supabase = await createClient();

  const redirectTo = getURL();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
    },
  });

  if (data.url) {
    redirect(data.url);
  }

  if (error) {
    throw new Error(`Error during login: ${error.message}`);
  }
}
