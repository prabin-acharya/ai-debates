"use client";

import Image from "next/image";

export default function Chat() {
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <h1 className="text-2xl">Ai Debates</h1>
      <Image
        src="https://pub-2f1faf404e074e64b3a0f184d00d15e4.r2.dev/GH9xBkbWUAAeMYB.jpeg"
        width={500}
        height={500}
        alt="apple"
      />
    </div>
  );
}
