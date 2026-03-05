"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
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

export type LoginEmailState = { error: string | null };

export async function loginWithEmail(
  _prevState: LoginEmailState,
  formData: FormData
): Promise<LoginEmailState> {
  const supabase = await createClient();
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Inserisci email e password." };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    const message =
      error.message === "Invalid login credentials"
        ? "Email o password non corretti."
        : error.message;
    return { error: message };
  }

  redirect("/");
}

export const logout = async () => {
  const supabase = await createClient();
  const cookieStore = await cookies();

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
  }
  cookieStore.delete("x-user-info");
};
