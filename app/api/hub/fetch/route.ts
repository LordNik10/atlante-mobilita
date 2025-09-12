import { NextResponse } from "next/server";
import { sql } from "../../(config)/postgres";

export async function GET() {
  try {
    const res = await sql`SELECT * FROM public."hub" `;

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
