"use client";

import { Message } from "ai";
import { useChat } from "ai/react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NewDebate() {
  const [debateTitle, setDebateTitle] = useState("");
  const [debateId, setDebateId] = useState(null);
  const [isDebateLoading, setIsDebateLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [createButtonClicked, setCreateButtonClicked] = useState(false);

  const createDebate = async () => {
    if (debateTitle.length > 5) {
      setCreateButtonClicked(true);
    }

    try {
      const response = await axios.post("/api/db/debate", {
        title: debateTitle,
      });

      console.log(response.data);
      // set debate Id---------------
      // setDebateId(response.data.debateId)

      setIsDebateLoading(true);
      append1({
        role: "user",
        content: "who are you? who developed you??",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDebateBannerImage = async () => {
    if (!debateId || !debateTitle) return;

    try {
      setIsImageLoading(true);

      const response = await axios.post("/api/image/", {
        debateId: "prabin-test-debateId",
        debateTitle,
      });

      console.log("image response", response.data);
      // setImageUrl(response.data.imageUrl);

      setIsImageLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsImageLoading(false);
    }
  };

  const onFinish1 = (message: Message) => {
    console.log("1 finish", message);
    append2({
      role: "user",
      content: "who are you? who developed you??",
    });
  };

  const onFinish2 = (message: Message) => {
    console.log("2 finish", message);
  };

  // AI debate agents
  const { messages: messages1, append: append1 } = useChat({
    api: "/api/chat/anthropic",
    onFinish: onFinish1,
  });

  const { messages: messages2, append: append2 } = useChat({
    api: "/api/chat/openai",
    onFinish: onFinish2,
  });

  console.log(createButtonClicked);

  return (
    <div className="h-full min-h-screen border-4 border-red-300">
      <div className="w-2/3 h-full m-auto py-10 border  px-2">
        {/*  */}
        <div className="py-8">
          {!createButtonClicked ? (
            <div className="flex w-full h-full justify-between px-4 ">
              <input
                type="text"
                id="debateTitle"
                value={debateTitle}
                onChange={(e) => setDebateTitle(e.target.value)}
                className=" w-9/12 shadow  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter debate title"
              />
              <div className="w-3/12">
                <button
                  onClick={createDebate}
                  className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create Debate
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-4xl font-semibold">{debateTitle}</p>
            </div>
          )}
        </div>

        {/* {createButtonClicked && ( */}
        <div className="relative h-52 w-4/5 m-auto">
          <Image
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 rounded-xl"
            src="https://pub-2f1faf404e074e64b3a0f184d00d15e4.r2.dev/prabin333"
            alt={debateTitle}
          />
        </div>
        {/* )} */}

        {/*  */}
        <p className="font-bold text-lg">Debates</p>

        <p className="my-3 text-orange-800">
          {messages1[1] && messages1[1].content}
        </p>
        <p className="my-3 text-green-800">
          {messages2[1] && messages2[1].content}
        </p>
      </div>
    </div>
  );
}
