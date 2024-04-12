import {
  AIStream,
  type AIStreamCallbacksAndOptions,
  type AIStreamParser,
} from "ai";

function parseCloudflareStream(): AIStreamParser {
  return (data) => {
    const json = JSON.parse(data) as {
      response: string;
      p: string | null;
    };
    const text = json.response;
    return text;
  };
}

export function CloudflareStream(
  res: Response,
  cb?: AIStreamCallbacksAndOptions
): ReadableStream {
  return AIStream(res, parseCloudflareStream(), cb);
}
