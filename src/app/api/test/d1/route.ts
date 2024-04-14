import { getRequestContext } from "@cloudflare/next-on-pages";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  console.log("--------------------------");
  const db = getRequestContext().env.DB;
  console.log(db);
  console.log("+++++++++++++===");

  const { results } = await db
    .prepare("SELECT * FROM Customers WHERE CompanyName = ?")
    .bind("Bs Beverages")
    .all();

  const { success } = await db.prepare("DROP TABLE IF EXISTS Debates").run();

  const { success: a } = await db
    .prepare("DROP TABLE IF EXISTS Arguments")
    .run();
  const { success: b } = await db.prepare("DROP TABLE IF EXISTS Users").run();

  console.log(results);

  return Response.json(results);
}
