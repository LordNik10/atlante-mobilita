import { getUserInfoFromCookie } from "@/utils/supabase/server";
import MapDetails from "./MapDetails";

export default async function MapPage() {
  const user = await getUserInfoFromCookie();

  return <MapDetails user={user} />;
}
