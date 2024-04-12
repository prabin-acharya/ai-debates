import { getRequestContext } from "@cloudflare/next-on-pages";
import { OpenAIStream, StreamingTextResponse } from "ai";
import type { NextRequest } from "next/server";

import { CloudflareStream } from "@/components/CloudflareStream";
import { Ai } from "@cloudflare/ai";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const resJson: any = await req.json();
  let messages: any = resJson["messages"];

  const ai = new Ai(getRequestContext().env.AI);
  const stream = (await ai.run("@hf/thebloke/llama-2-13b-chat-awq", {
    messages,
    stream: true,
  })) as ReadableStream;

  let response = new Response(stream, {
    headers: { "content-type": "text/event-stream" },
  });

  let cStream = CloudflareStream(response);

  // Respond with the stream
  return new StreamingTextResponse(cStream);
}
