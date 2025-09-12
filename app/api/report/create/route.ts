import { getUserInfoFromCookie } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "../../(config)/postgres";

export async function POST(request: NextRequest) {
  try {
    const userInfo = await getUserInfoFromCookie();

    if (!userInfo) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!body.title || !body.lat || !body.lng || !body.priority) {
      return NextResponse.json(
        { success: false, error: "Invalid data" },
        { status: 400 }
      );
    }

    const res =
      await sql`INSERT INTO public."report" (user_id,title,description,lat,lng,severity) VALUES (${userInfo.id},${body.title},${body.description},${body.lat},${body.lng},${body.priority}) RETURNING *`;

    return NextResponse.json({ success: true, data: res[0] });
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create report" },
      { status: 500 }
    );
  }
}
