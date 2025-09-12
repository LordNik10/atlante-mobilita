import { NextResponse } from "next/server";
import { sql } from "../../(config)/postgres";

export async function GET() {
  try {
    const res =
      await sql`SELECT r.*, u.name, u.email FROM public."report" r INNER JOIN public."user" u ON r.user_id = u.id `;

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
