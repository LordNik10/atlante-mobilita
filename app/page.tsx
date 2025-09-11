import { getUserInfoFromCookie } from "@/utils/supabase/server";

export default async function Home() {
  const user = await getUserInfoFromCookie();
  console.log("user", user);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {user ? (
        <>
          <div className="flex items-center gap-4">
            <span className="font-semibold">utente loggato:{user.name}</span>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="text-lg">Welcome to our platform!</p>
          <p className="text-sm text-gray-500">
            Please sign in to access your account.
          </p>
        </div>
      )}
    </div>
  );
}
