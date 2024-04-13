import { getRequestContext } from "@cloudflare/next-on-pages";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
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
