import { getRequestContext } from "@cloudflare/next-on-pages";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const data: any = await request.json();
  const debateDetail = data.debateDetail;
  const debateId = data.debateId;

  console.log(debateId);
  console.log("###########");
  console.log(debateDetail);

  const ai = getRequestContext().env.AI;

  const response = await ai.run("@cf/facebook/bart-large-cnn", {
    input_text: debateDetail,
    max_length: 2048,
  });

  const db = getRequestContext().env.DB;

  const { success } = await db
    .prepare(
      `INSERT INTO Arguments (debateId, agentName, argument) VALUES (?, ?, ?)`
    )
    .bind(debateId, "SUMMARY", response.summary)
    .run();

  return Response.json({ summary: response.summary });
}
