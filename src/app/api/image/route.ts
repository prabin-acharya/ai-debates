import { getRequestContext } from "@cloudflare/next-on-pages";
import type { NextRequest } from "next/server";

export const runtime = "edge";

// get image from its key
export async function GET(request: NextRequest) {
  console.log("--------------------------");
  const myBucket = getRequestContext().env.R2_BUCKET;

  const object = await myBucket.get("prabin333");

  if (object === null) {
    return new Response("Object Not Found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);

  return new Response(object.body, {
    headers,
  });
}

// generate and save image to R2
export async function POST(request: NextRequest) {
  console.log("--------------------------");
  const ai = getRequestContext().env.AI;

  const inputs = {
    prompt: "AI acceleration vs AI Safety",
  };

  const response = await ai.run(
    "@cf/stabilityai/stable-diffusion-xl-base-1.0",
    inputs
  );

  return new Response(response, {
    headers: {
      "content-type": "image/png",
    },
  });
}
