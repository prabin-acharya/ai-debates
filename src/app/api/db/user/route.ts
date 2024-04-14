import { getRequestContext } from "@cloudflare/next-on-pages";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const userId = request.cookies.get("userId")?.value;

  const db = getRequestContext().env.DB;

  const { results } = await db
    .prepare("SELECT * FROM Debates WHERE userId = ?")
    .bind(userId)
    .all();

  return Response.json({ results });
}
