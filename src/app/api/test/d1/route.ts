import { getRequestContext } from "@cloudflare/next-on-pages";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  //   let responseText = "Hello World";

  const db = getRequestContext().env.DB;
  //   const ps = db.prepare("SELECT * from users");

  const { results } = await db
    .prepare("SELECT * FROM Customers WHERE CompanyName = ?")
    .bind("Bs Beverages")
    .all();

  return Response.json(results);

  //   return new Response(responseText);
}
