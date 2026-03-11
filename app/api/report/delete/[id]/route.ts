import { NextRequest, NextResponse } from "next/server";
import { sql } from "../../../(config)/postgres";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const res =
      await sql`DELETE FROM public.report where id=${id} RETURNING *`;

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting report:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
