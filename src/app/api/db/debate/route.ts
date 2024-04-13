import { getRequestContext } from "@cloudflare/next-on-pages";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  return Response.json({ hello: "world from get" });
}

export async function POST(request: NextRequest) {
  // const data = await request.json();
  // console.log(data);

  // const db = getRequestContext().env.DB;

  // const { results } = await db
  //   .prepare("SELECT * FROM Customers WHERE CompanyName = ?")
  //   .bind("Bs Beverages")
  //   .all();

  // return Response.json(results);

  return Response.json({ hello: "world from get" });
}
