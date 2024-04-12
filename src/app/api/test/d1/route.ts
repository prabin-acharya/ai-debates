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

  console.log(results);

  return Response.json(results);
}
