"use client";

import { Message } from "ai";
import { useChat } from "ai/react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NewDebate() {
  const [debateTitle, setDebateTitle] = useState("");
  const [debateId, setDebateId] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [createButtonClicked, setCreateButtonClicked] = useState(false);

  const [message1Finish, setMessage1Finish] = useState("");
  const [message2Finish, setMessage2Finish] = useState("");
  const [message3Finish, setMessage3Finish] = useState("");

  console.log(debateId);

  useEffect(() => {
    console.log(debateId, "message1Finish");
  }, [message1Finish, debateId]);

  const saveAgentsArgument = async (agentName: string, argument: string) => {
    console.log(debateId);
    if (!debateId) {
      return;
    }

    try {
      const response = await axios.post("/api/db/arguments", {
        debateId,
        agentName,
        argument,
      });

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createDebate = async () => {
    if (debateTitle.length > 5) {
      setCreateButtonClicked(true);
    }

    try {
      const response = await axios.post("/api/db/debate", {
        debateTitle,
      });

      console.log(response.data.debateId, "debateId from remote");
      // set debate Id---------------
      setDebateId(response.data.debateId);

      append1({
        role: "user",
        content: `You are in a debate competition. Here is the title of the debate: ${debateTitle}. You are to act like Steve Jobs and make your argument. You are playing the character of Steve Jobs. Go direct to the point, pick a side and make your case. Say it in the tone of how Steve Jobs used to speak.(keep it short, less than 80 words). Begin your argument:`,
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

  // AI AGENTS ######################################################################

  const onFinish1 = (message: Message) => {
    console.log("1 finish", debateId, message);

    setMessage1Finish(message.content);
    saveAgentsArgument("STEVE JOBS", message.content);

    append2({
      role: "user",
      content: `You are in a debate competition. Here is the title of the debate: ${debateTitle}. You are to act like Elon Musk and make your argument. You are playing the character of Elon Musk. Go direct to the point, pick a side and make your case. Say it in the tone of how Elon Musk speaks.
      Here are the arguments made by previous participants:
      Steve Jobs: ${message.content || ""}
      Try to add to the discussion, rather than simply repeating the same thing said by previous participants.
      (keep it short, less than 80 words). Begin your argument:`,
    });
  };

  const onFinish2 = (message: Message) => {
    console.log("2 finish", message);

    setMessage2Finish(message.content);
    // saveAgentsArgument("Elon Musk", message.content);

    append3({
      role: "user",
      content: `You are in a debate competition. Here is the title of the debate: ${debateTitle}. You are to act like a very talented Economist and make your argument. You share your perspective as economist and try to add to the discussions. You are playing the character of a very talented Economist. You take a broad view at the world. Use some language of economist but it should be understandable by general public. Go direct to the point, pick a side and make your case. Present your argument in the tone of how an economist speaks. But, DO NOT  mention that you are an economist. Do NOT say anywhere that you are an economist. 
      Here are the arguments made by previous participants:
      Steve Jobs: ${message1Finish || ""}
      Elon Musk: ${message.content || ""}
      Try to add to the discussion, rather than simply repeating the same thing said by previous participants.
      (keep it short, less than 80 words). Begin your argument:`,
    });
  };

  const onFinish3 = (message: Message) => {
    console.log("3 finish", message);

    setMessage3Finish(message.content);

    append4({
      role: "user",
      content: `You are in a debate competition. Here is the title of the debate: ${debateTitle}. You are to act like the philosopher Socrates and make your arguments in his language, writing style, tone. Go direct to the point, pick a side and make your case. But, DO NOT  mention that you are socrates.
      Here are the arguments made by previous participants:
      Steve Jobs: ${message1Finish || ""}
      Elon Musk: ${message2Finish || ""}
      Economist: ${message.content || ""}
      Try to add to the discussion, rather than simply repeating the same thing said by previous participants.
      (keep it short, less than 80 words). Begin your argument:`,
    });
  };

  const onFinish4 = (message: Message) => {
    console.log("2 finish", message);
  };

  // AI debate agents
  const { messages: messages1, append: append1 } = useChat({
    api: "/api/chat/llama",
    onFinish: onFinish1,
  });

  const { messages: messages2, append: append2 } = useChat({
    api: "/api/chat/anthropic",
    onFinish: onFinish2,
  });

  const { messages: messages3, append: append3 } = useChat({
    api: "/api/chat/openai",
    onFinish: onFinish3,
  });

  const { messages: messages4, append: append4 } = useChat({
    api: "/api/chat/llama13",
    onFinish: onFinish4,
  });

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
        <div className="px-2">
          <p className="font-bold text-lg mb-3">Debates</p>

          <div className="px-4">
            {/*  */}

            {messages1[1] && (
              <div className="w-full items-start">
                <div className="bg-blue-200 px-3 rounded-md w-9/12 mb-4">
                  <span className="font-semibold text-sm m-0 pt-1">
                    STEVE JOBS
                  </span>
                  <p className=" text-black">
                    {messages1[1].content}
                    {/* Free speech is the cornerstone of a democratic society,
                    fundamental to individual autonomy, societal progress, and
                    the exchange of ideas. Dating back to the Enlightenment era
                    and enshrined in documents like the First Amendment to the
                    United States Constitutio */}
                  </p>
                </div>
              </div>
            )}

            {messages2[1] && (
              <div className="w-full flex flex-col items-end mb-4">
                <div className="bg-green-200 px-3 rounded-md w-9/12 flex flex-col flex-end items-end">
                  <span className="font-semibold text-sm m-0 pt-1">
                    ELON MUSK
                  </span>
                  <p className=" text-black">
                    {messages2[1].content}
                    {/* Central to the argument for free speech is the belief that
                  allowing diverse perspectives to be heard fosters innovation,
                  intellectual growth, and the discovery of truth. By engaging
                  in open dialogue and debate, society can identify and
                  challenge prevailing norms, question authority, and address
                  injustices. */}
                  </p>
                </div>
              </div>
            )}

            {messages3[1] && (
              <div className="w-full items-start">
                <div className="bg-violet-300 px-3 rounded-md w-9/12 mb-4">
                  <span className="font-semibold text-sm m-0 pt-1">
                    SOCRATES
                  </span>
                  <p className=" text-black">
                    {messages3[1].content}
                    {/* Free speech is the cornerstone of a democratic society,
                    fundamental to individual autonomy, societal progress, and
                    the exchange of ideas. Dating back to the Enlightenment era
                    and enshrined in documents like the First Amendment to the
                    United States Constitutio */}
                  </p>
                </div>
              </div>
            )}

            {messages4[1] && (
              <div className="w-full flex flex-col items-end mb-4">
                <div className="bg-fuchsia-300 px-3 rounded-md w-9/12 flex flex-col flex-end items-end">
                  <span className="font-semibold text-sm m-0 pt-1">
                    ECONOMIST
                  </span>
                  <p className=" text-black">{messages4[1].content}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
