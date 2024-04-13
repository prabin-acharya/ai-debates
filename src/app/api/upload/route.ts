import { getRequestContext } from "@cloudflare/next-on-pages";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  console.log("--------------------------");
  const myBucket = getRequestContext().env.R2_BUCKET;

  // ###############
  const ai = getRequestContext().env.AI;
  const inputs = {
    prompt: "Cyberpunk cow",
  };

  const response = await ai.run(
    "@cf/bytedance/stable-diffusion-xl-lightning",
    inputs
  );
  // ####################

  // Convert the binary string to Uint8Array
  // const binaryString = response;
  // const buffer = new Uint8Array(binaryString.length);
  // for (let i = 0; i < binaryString.length; i++) {
  //   buffer[i] = binaryString.charCodeAt(i);
  // }

  // Save the image data to Cloudflare R2
  // const save = await myBucket.put("prabin1", buffer.buffer);

  // console.log(response.format, response.type, "$$$");

  // // Create a ReadableStream reader
  const reader = response.getReader();
  const chunks = [];
  let totalBytes = 0;

  console.log(reader);

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

  const save = await myBucket.put("prabinpng2", imageData.buffer);

  // {
  //   metadata: { contentType: "image/png" },
  // }

  // console.log(save);
  // const save = await myBucket.put("prabin22", response);

  return Response.json(save || { hello: "+++++" });
}
