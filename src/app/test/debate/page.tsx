"use client";

import { Message } from "ai";
import { useChat } from "ai/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Debate() {
  const [debateTitle, setDebateTitle] = useState("");
  const [debateId, setDebateId] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const [createButtonClicked, setCreateButtonClicked] = useState(true);

  const [message1Finish, setMessage1Finish] = useState("");
  const [message2Finish, setMessage2Finish] = useState("");
  const [message3Finish, setMessage3Finish] = useState("");
  const [message4Finish, setMessage4Finish] = useState("");

  // Save Arguments to DB
  useEffect(() => {
    console.log(debateId, "message1Finish");

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

    if (debateId && message1Finish.length > 1)
      saveAgentsArgument("STEVE JOBS", message1Finish);
  }, [message1Finish, debateId]);

  useEffect(() => {
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

    if (debateId && message2Finish.length > 1)
      saveAgentsArgument("ELON MUSK", message2Finish);
  }, [message2Finish, debateId]);

  useEffect(() => {
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

    if (debateId && message3Finish.length > 1)
      saveAgentsArgument("SOCRATES", message3Finish);
  }, [message3Finish, debateId]);

  useEffect(() => {
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

    if (debateId && message4Finish.length > 1)
      saveAgentsArgument("ECONOMIST", message4Finish);
  }, [message4Finish, debateId]);

  const fetchDebateBannerImage = async (resDebateId: string) => {
    if (!debateTitle) return;

    try {
      const response = await axios.post("/api/image/", {
        debateId: resDebateId,
        debateTitle,
      });

      console.log("image response", response.data);
      setIsImageLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  // AI AGENTS ######################################################################

  const onFinish1 = (message: Message) => {
    console.log("1 finish", debateId, message);

    setMessage1Finish(message.content);
    // saveAgentsArgument("STEVE JOBS", message.content);

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
    console.log("2 finish", message, isLoading);
    setMessage2Finish(message.content);

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
    setMessage4Finish(message.content);
  };

  // AI debate agents
  const { messages: messages1, append: append1 } = useChat({
    api: "/api/chat/llama",
    onFinish: onFinish1,
  });

  const {
    messages: messages2,
    append: append2,
    isLoading,
  } = useChat({
    api: "/api/chat/llama13",
    onFinish: onFinish2,
  });

  const { messages: messages3, append: append3 } = useChat({
    api: "/api/chat/openai",
    onFinish: onFinish3,
  });

  const { messages: messages4, append: append4 } = useChat({
    api: "/api/chat/anthropic",
    onFinish: onFinish4,
  });

  // ###################################################################################################33
  // when user clicks createDebate
  const createDebate = async () => {
    if (debateTitle.length > 5) {
      setCreateButtonClicked(true);
    }

    // try {
    //   const response = await axios.post("/api/db/debate", {
    //     debateTitle,
    //   });

    //   console.log(response.data.debateId, "debateId from remote");
    //   setDebateId(response.data.debateId);
    //   fetchDebateBannerImage(response.data.debateId);

    //   append1({
    //     role: "user",
    //     content: `You are in a debate competition. Here is the title of the debate: ${debateTitle}. You are to act like Steve Jobs and make your argument. You are playing the character of Steve Jobs. Go direct to the point, pick a side and make your case. Say it in the tone of how Steve Jobs used to speak.(keep it short, less than 80 words). Begin your argument:`,
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };
  return (
    <div className="h-full min-h-screen  bg-slate-300">
      <div className="w-2/3 h-full m-auto pb-10 border  px-2">
        <div className="pt-6 ">
          <Link href={"/"}>
            <h1 className="text-xl font-bold text-red-400">AI Debates</h1>
          </Link>
        </div>
        {/*  */}
        <div className="py-6">
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
              <p className="text-4xl font-medium text-gray-800 font-serif">
                {debateTitle || "Hello Worlds"}
              </p>
            </div>
          )}
        </div>

        {createButtonClicked && (
          <>
            <div className="relative h-52 w-4/5 m-auto py-2">
              {isImageLoaded ? (
                <Image
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 rounded-xl"
                  // src={`https://pub-2f1faf404e074e64b3a0f184d00d15e4.r2.dev/${debateId}`}
                  src={`https://pub-2f1faf404e074e64b3a0f184d00d15e4.r2.dev/prabin333`}
                  alt={debateTitle}
                />
              ) : (
                <div className="m-auto text-center py-8  w-fit flex flex-col items-center justify-center">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <circle cx="3" cy="12" r="2" fill="grey" />
                      <circle cx="21" cy="12" r="2" fill="grey" />
                      <circle cx="12" cy="21" r="2" fill="grey" />
                      <circle cx="12" cy="3" r="2" fill="grey" />
                      <circle cx="5.64" cy="5.64" r="2" fill="grey" />
                      <circle cx="18.36" cy="18.36" r="2" fill="grey" />
                      <circle cx="5.64" cy="18.36" r="2" fill="grey" />
                      <circle cx="18.36" cy="5.64" r="2" fill="grey" />
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        dur="1.5s"
                        values="0 12 12;360 12 12"
                        repeatCount="indefinite"
                      />
                    </g>
                  </svg>
                </div>
              )}
            </div>
          </>
        )}

        {/* )} */}

        {/*  */}
        <div className="px-2 pt-2 pb-16">
          <p className="font-bold text-lg">Arguments</p>

          <div className="px-4">
            {/* <div className="w-full">
              {messages1.length < 2 && (
                <div className="m-auto text-center py-4 pb-8 w-fit flex flex-col items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <circle cx="3" cy="12" r="2" />
                      <circle cx="21" cy="12" r="2" />
                      <circle cx="12" cy="21" r="2" />
                      <circle cx="12" cy="3" r="2" />
                      <circle cx="5.64" cy="5.64" r="2" />
                      <circle cx="18.36" cy="18.36" r="2" />
                      <circle cx="5.64" cy="18.36" r="2" />
                      <circle cx="18.36" cy="5.64" r="2" />
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        dur="1.5s"
                        values="0 12 12;360 12 12"
                        repeatCount="indefinite"
                      />
                    </g>
                  </svg>
                </div>
              )}
            </div> */}
            {/*  */}

            {/* {messages1[1] && ( */}
            <div className="w-full items-start py-2">
              <div className="bg-blue-200 px-3 rounded-md w-9/12 mb-4">
                <span className="font-semibold text-sm m-0 pt-1">
                  STEVE JOBS
                </span>
                <p className=" text-black">
                  {/* {messages1[1].content} */}
                  Free speech is the cornerstone of a democratic society,
                  fundamental to individual autonomy, societal progress, and the
                  exchange of ideas. Dating back to the Enlightenment era and
                  enshrined in documents like the First Amendment to the United
                  States Constitutio
                </p>
              </div>
            </div>
            {/* )} */}

            {/* {messages2[1] && ( */}
            <div className="w-full flex flex-col items-end mb-4">
              <div className="bg-green-200 px-3 rounded-md w-9/12 flex flex-col flex-end items-end">
                <span className="font-semibold text-sm m-0 pt-1">
                  ELON MUSK
                </span>
                <p className=" text-black">
                  {/* {messages2[1].content} */}
                  Central to the argument for free speech is the belief that
                  allowing diverse perspectives to be heard fosters innovation,
                  intellectual growth, and the discovery of truth. By engaging
                  in open dialogue and debate, society can identify and
                  challenge prevailing norms, question authority, and address
                  injustices.
                </p>
              </div>
            </div>
            {/* )} */}

            {/* {messages3[1] && ( */}
            <div className="w-full items-start">
              <div className="bg-violet-300 px-3 rounded-md w-9/12 mb-4">
                <span className="font-semibold text-sm m-0 pt-1">SOCRATES</span>
                <p className=" text-black">
                  {/* {messages3[1].content} */}
                  Free speech is the cornerstone of a democratic society,
                  fundamental to individual autonomy, societal progress, and the
                  exchange of ideas. Dating back to the Enlightenment era and
                  enshrined in documents like the First Amendment to the United
                  States Constitutio
                </p>
              </div>
            </div>
            {/* )} */}

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
