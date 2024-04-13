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

  const data: any = await request.json();
  const debateTitle = data.debateTitle;

  // generate image
  const ai = getRequestContext().env.AI;

  const inputs = {
    prompt: debateTitle,
  };

  const response = await ai.run(
    "@cf/stabilityai/stable-diffusion-xl-base-1.0",
    inputs
  );

  // save image

  // Create a ReadableStream reader
  const reader = response.getReader();
  const chunks = [];
  let totalBytes = 0;

  // Read the data from the ReadableStream and calculate total bytes
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    totalBytes += value.length;
  }

  // Concatenate the data chunks into a single Uint8Array
  const imageData = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    imageData.set(chunk, offset);
    offset += chunk.length;
  }

  const myBucket = getRequestContext().env.R2_BUCKET;
  const key = data.debateId;

  const save = await myBucket.put(key, imageData.buffer, {
    metadata: { contentType: "image/png" },
  });

  return Response.json({ success: true, key, save });

  //   return new Response(response, {
  //     headers: {
  //       "content-type": "image/png",
  //     },
  //   });
}
