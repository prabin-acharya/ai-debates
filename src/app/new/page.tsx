"use client";

import { Message } from "ai";
import { useChat } from "ai/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";

export default function NewDebate() {
  const [debateId, setDebateId] = useState(null);
  const [debateTitle, setDebateTitle] = useState("");
  const [debateDescription, setDebateDescription] = useState("");

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [createButtonClicked, setCreateButtonClicked] = useState(false);

  const [message1Finish, setMessage1Finish] = useState("");
  const [message2Finish, setMessage2Finish] = useState("");
  const [message3Finish, setMessage3Finish] = useState("");
  const [message4Finish, setMessage4Finish] = useState("");
  const [message5Finish, setMessage5Finish] = useState("");
  const [message6Finish, setMessage6Finish] = useState("");

  const [debateSummary, setDebateSummary] = useState("");
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const router = useRouter();

  // make sure userId exists in cookie
  useEffect(() => {
    const getUserId = async () => {
      try {
        const response = await axios.get("/api/db/userId");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching debates:", error);
      }
    };

    getUserId();
  }, []);

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

  // genearte and save Summray
  useEffect(() => {
    const generateSummary = async () => {
      try {
        setIsSummaryLoading(true);

        const response = await axios.post("/api/summary", {
          debateId,
          debateDetail: `
        Debate Title: ${debateTitle}
        Debate Description: ${debateDescription.substring(0, 300)}
        Debate Arguments:
          Steve Jobs: ${message1Finish}
          Elon Musk: ${message2Finish}
          Economist: ${message4Finish}
          Socrates: ${message3Finish}
          Aristotle: ${message5Finish}
        `,
        });
        console.log(response.data);

        setDebateSummary(response.data.summary);
      } catch (err) {
        console.log(err);
      } finally {
        setIsSummaryLoading(false);
      }
    };

    if (debateId && message5Finish.length > 1) generateSummary();
  }, [
    message5Finish,
    debateId,
    debateTitle,
    debateDescription,
    message1Finish,
    message2Finish,
    message4Finish,
    message3Finish,
  ]);

  console.log(
    "-----------------------------------------------------------this is to check render freq"
  );

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
      // content: `You are taking part in a very important debate competition. Here is the title of the debate: ${debateTitle}. You are playing the character of Steve Jobs. So say what Steve Jobs would say about the topic. Go direct to the point, pick a side and make your case. Say it in the tone of how Steve Jobs used to speak.(keep it short, less than 80 words). Begin your argument:`,
      // content: `You are taking part in a very importatnt debate competition. Here is the title of the debate: ${debateTitle}. You are playing the character of Steve Jobs. So say what Steve Jobs would say about the topic from his perspective in this speaking style, language, tone. Go direct to the point, pick a side and make your case. Try to add to the discussion, do not repeat things already said by previous participants. Say it in the tone of how Steve Jobs used to speack and emulate his perspective.
      content: `You are taking part in a very important debate competition. Here is the title of the debate: ${debateTitle}. You will embody Steve Jobs. Approach the topic as Jobs would, leveraging his distinctive speaking style, tone, and perspective. Be assertive and clear, choosing a definitive stance on the issue. Enhance the dialogue by introducing novel viewpoints or arguments, avoiding redundancy with prior statements. Emulate Jobs' characteristic directness,  inspirational tone, charisma to convincingly argue your position.
      Here are the arguments made by previous participants:
      Aristotle: ${message.content || ""}
      (keep it short, less than 80 words). Begin your argument:`,
    });
  };

  const onFinish2 = (message: Message) => {
    console.log("2 finish", message, isLoading);
    setMessage2Finish(message.content);

    append3({
      role: "user",
      // content: `You are taking part in a very importatnt debate competition. Here is the title of the debate: ${debateTitle}. You are playing the character of Carl Sagan. So say what Steve Jobs would say about the topic from his perspective in this speaking style, language, tone. Go direct to the point, pick a side and make your case. Try to add to the discussion, do not repeat things already said by previous participants. Say it in the tone of how Steve Jobs used to speack and emulate his perspective.
      content: `You are participating in an important debate: ${debateTitle}. You are channeling Carl Sagan. Express your arguments with Sagan’s sense of wonder and scientific insight. Use his narrative style, which combines eloquence with clear, accessible explanations, often punctuated with profound reflections on human experience and the cosmos. Approach the topic with a curiosity-driven perspective, emphasizing empirical evidence and rational thought. Aim to inspire and educate, introducing new ideas without duplicating previous contributions. Let Sagan’s passion for discovery and understanding guide your persuasive communication.
      Here are the arguments made by previous participants:
      Aristotle: ${message1Finish || ""}
      Steve Jobs: ${message.content || ""}
      Try to add to the discussion, rather than simply repeating the same thing said by previous participants.
      (keep it short, less than 80 words). Begin your argument:`,
    });
  };

  const onFinish3 = (message: Message) => {
    console.log("3 finish", message);
    setMessage3Finish(message.content);

    append4({
      role: "user",
      // content: `You are in a debate competition. Here is the title of the debate: ${debateTitle}. You are to act like the philosopher Socrates and make your arguments in his language, writing style, tone. Go direct to the point, pick a side and make your case. But, DO NOT  mention that you are socrates.
      content: `You are participating in a significant debate: ${debateTitle}. You are playing the character of Leonardo da Vinci. Articulate your arguments as da Vinci might, blending art, science, and inventive thinking. Use his observational skills and interdisciplinary approach to explore the topic from multiple angles. Emphasize practical solutions and visionary ideas, inspired by da Vinci’s notebooks full of sketches and thoughts. Avoid repeating earlier points, instead bringing fresh, innovative perspectives. Speak with the curiosity and precision of a polymath, persuasively advancing your position with a blend of creativity and analytical rigor.
      Here are the arguments made by previous participants:
      Aristotle: ${message1Finish || ""}
      Steve Jobs: ${message2Finish || ""}
      Carl Sagan: ${message.content || ""}
      Try to add to the discussion, rather than simply repeating the same thing said by previous participants.
      (keep it short, less than 80 words). Begin your argument:`,
    });
  };

  const onFinish4 = (message: Message) => {
    console.log("4 finish", message);
    setMessage4Finish(message.content);

    append5({
      role: "user",
      // content: `You are in a debate competition. Here is the title of the debate: ${debateTitle}. You are to act like the Aristotle and make your arguments in his language, writing style, tone. Go direct to the point, pick a side and make your case. But, DO NOT  mention that you are Aristotle.
      content: `You are participating in an important debate: ${debateTitle}. You are playing the character of Elon Musk. Articulate your views with Musk’s characteristic forward-thinking and solution-oriented approach. Speak with the boldness and directness that Musk is known for, often discussing futuristic technologies and ambitious projects. Tackle the topic from an innovative angle, always looking for disruptive and scalable solutions. Keep your arguments concise and impactful, using clear, modern language. Ensure that your contributions add new dimensions to the discussion, steering clear of redundancy with previous speakers. Use Elon's speaking style, tone, language.
      Here are the arguments made by previous participants:
      Aristotle: ${message1Finish || ""}
      Steve Jobs: ${message2Finish || ""}
      Carl Sagan: ${message3Finish || ""}
      Leonardo da Vinci: ${message.content || ""}
      Try to add to the discussion, rather than simply repeating the same thing said by previous participants.
      (keep it short, less than 80 words). Begin your argument:`,
    });
  };

  const onFinish5 = (message: Message) => {
    console.log("5 finish", message);
    setMessage5Finish(message.content);

    append6({
      role: "user",
      // content: `You are in a debate competition. Here is the title of the debate: ${debateTitle}. You are to act like the Leonardo da Vinci and make your arguments in his language, writing style, tone. Go direct to the point, pick a side and make your case. But, DO NOT  mention that you are da Vinici.
      content: `You are participating in a important debate: ${debateTitle}. Assume the role of Madame Curie. Deliver your arguments with the meticulousness and determination that characterized Curie’s scientific endeavors. Use a tone of quiet confidence and unwavering commitment to truth and empirical evidence. Focus on the importance of rigorous research and ethical considerations in science. Bring a thoughtful, analytical perspective to the debate, introducing insights rooted in deep understanding and factual accuracy. Avoid duplicating existing points, instead enriching the conversation with profound observations if possible. You should sound like Madam Curie so use her speaking style, tone.
      Here are the arguments made by previous participants:
      Aristotle: ${message1Finish || ""}
      Steve Jobs: ${message2Finish || ""}
      Carl Sagan: ${message3Finish || ""}
      Leonardo da Vinci: ${message.content || ""}
      Elon Musk: ${message.content || ""}
      Try to add to the discussion, rather than simply repeating the same thing said by previous participants.
      (keep it short, less than 80 words). Begin your argument:`,
    });
  };

  const onFinish6 = (message: Message) => {
    console.log("6 finish", message);
    setMessage6Finish(message.content);
  };

  // AI debate agents
  const { messages: messages1, append: append1 } = useChat({
    api: "/api/chat/openai",
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
    api: "/api/chat/llama",
    onFinish: onFinish3,
  });

  const { messages: messages4, append: append4 } = useChat({
    api: "/api/chat/anthropic",
    onFinish: onFinish4,
  });

  const { messages: messages5, append: append5 } = useChat({
    api: "/api/chat/mistral",
    onFinish: onFinish5,
  });

  const { messages: messages6, append: append6 } = useChat({
    api: "/api/chat/openhermes",
    onFinish: onFinish6,
  });

  // ###################################################################################################33
  // when user clicks createDebate
  const createDebate = async () => {
    if (debateTitle.length < 5) {
      console.log("invalide debate title. should be more than 5 characters");
      return;
    }

    setCreateButtonClicked(true);

    try {
      const response = await axios.post("/api/db/debate", {
        debateTitle,
        debateDescription: debateDescription.substring(0, 300),
      });

      console.log(response.data.debateId, "debateId from remote");
      setDebateId(response.data.debateId);
      fetchDebateBannerImage(response.data.debateId);

      append1({
        role: "user",
        // content: `You are taking part in a very important debate competition. Here is the title of the debate: ${debateTitle}. You are playing the character of Steve Jobs. So say what Steve Jobs would say about the topic. Go direct to the point, pick a side and make your case. Say it in the tone of how Steve Jobs used to speak.(keep it short, less than 80 words). Begin your argument:`,
        // content: `You are taking part in a very important debate competition. Here is the title of the debate: ${debateTitle}. You are playing the character of Aristotle. So, you have to make arguments from the perspective of Aristotle, in his tone, writing style.  Go direct to the point, pick a side and make your case. But, DO NOT  mention that you are Aristotle.`,
        content: `You are participating in a critical debate: ${debateTitle}. Assume the role of Aristotle. Frame your arguments as Aristotle would, using his methodical reasoning, ethical considerations, and eloquent dialectics. Embrace his style of rigorous logic and structured dialogue, focusing on clarity and depth. Adopt a philosophical perspective, delving into the principles underlying the debate topic. Offer thoughtful analysis and reasoned arguments, steering clear of repeating points already made by others. Employ Aristotle's scholarly tone and persuasive rhetoric to advance your position convincingly.`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // what I want it to look like
  // Aristotle +++
  // Steve Jobs +++
  // Carl Sagan +++
  // Elon Musk
  // da Vinci +++
  // madam curie
  // Economist
  // tagore

  // Carl Sagan
  // davinci
  // tagore // apj abdul kalam
  // Nelson Mandela
  // Aristotle Plato
  // madam curie //  ada lovelace
  // Benjamin Franklin

  return (
    <div className="h-full min-h-screen  bg-slate-300">
      {/* <div className="w-2/3 h-full m-auto pb-10 border  px-2 min-h-screen"> */}

      <div className="w-2/3 mx-auto h-full border min-h-screen">
        <nav className=" flex items-center px-2 pt-6  pb-4 justify-between border-b">
          <Link href={"/"}>
            <h1 className="text-2xl font-bold text-red-400">AI Debates</h1>
          </Link>
          <div className="flex flex-row-reverse ">
            <div className=" flex items-center justify-center ml-4 pr-4">
              <CgProfile
                onClick={() => router.push("/user")}
                className="text-3xl cursor-pointer text-slate-600"
              />
            </div>
            {message5Finish.length > 2 && (
              <button
                onClick={() => window.location.reload()}
                className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Debate
              </button>
            )}
          </div>
        </nav>

        {/*  */}
        <div className="py-2">
          {!createButtonClicked ? (
            <div className="flex flex-col w-full h-full justify-between px-4 py-6">
              <div className="flex flex-col w-2/3 m-auto">
                <label className="font-semibold mb-1 text-gray-800">
                  Debate Title
                  <span className="ml-1 text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="debateTitle"
                  value={debateTitle}
                  onChange={(e) => setDebateTitle(e.target.value)}
                  className="mb-4 border rounded py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Which Came First: Chicken or Egg?"
                />

                <label className="font-semibold mb-1 text-gray-800">
                  Description
                </label>
                <textarea
                  typeof="text"
                  id="debateDescription"
                  value={debateDescription}
                  onChange={(e) => setDebateDescription(e.target.value)}
                  className="mb-2 outline-none px-2 text-gray-700 rounded py-2"
                  rows={3}
                  placeholder="Optional. Set the stage for debate/discussion. Specify focus points..."
                />
                <div className="mt-2">
                  <button
                    onClick={createDebate}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Create Debate
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-4xl font-semibold text-gray-800 font-serif">
                {debateTitle}
              </p>
              {debateDescription.length > 1 && (
                <p className="px-4 text-gray-800 font-serif">
                  {debateDescription}
                </p>
              )}
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
                  src={`https://pub-2f1faf404e074e64b3a0f184d00d15e4.r2.dev/${debateId}`}
                  // src={`https://pub-2f1faf404e074e64b3a0f184d00d15e4.r2.dev/prabin333`}
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

        {/*  */}
        <div className="px-2 pt-2 pb-32">
          {messages1.length > 1 && (
            <p className="font-bold text-lg">Arguments</p>
          )}

          <div className="px-4 mt-3">
            {messages1[1] && (
              <div className="w-full items-start mt-2 mb-3">
                <div className="bg-blue-200 border border-blue-500 px-3 rounded-md w-9/12 ">
                  <span className="font-semibold text-sm m-0 pt-1">
                    ARISTOTLE
                  </span>
                  <p className=" text-black">{messages1[1].content}</p>
                </div>
              </div>
            )}

            {messages2[1] && (
              <div className="w-full flex flex-col items-end mb-3">
                <div className="bg-green-200 border border-green-500 px-3 rounded-md w-9/12 flex flex-col flex-end items-end">
                  <span className="font-semibold text-sm m-0 pt-1">
                    STEVE JOBS
                  </span>
                  <p className=" text-black">{messages2[1].content}</p>
                </div>
              </div>
            )}

            {messages3[1] && (
              <div className="w-full items-start mb-3">
                <div className="bg-violet-300 border border-violet-500 px-3 rounded-md w-9/12 ">
                  <span className="font-semibold text-sm m-0 pt-1">
                    CARL SAGAN
                  </span>
                  <p className=" text-black">{messages3[1].content}</p>
                </div>
              </div>
            )}

            {messages4[1] && (
              <div className="w-full flex flex-col items-end mb-3">
                <div className="bg-fuchsia-300 border border-fuchsia-500 px-3 rounded-md w-9/12 flex flex-col flex-end items-end">
                  <span className="font-semibold text-sm m-0 pt-1">
                    LEONARDO DA VINCI
                  </span>
                  <p className=" text-black">{messages4[1].content}</p>
                </div>
              </div>
            )}

            {messages5[1] && (
              <div className="w-full items-start mb-8">
                <div className="bg-orange-200 border border-orange-500 px-3 rounded-md w-9/12 ">
                  <span className="font-semibold text-sm m-0 pt-1">
                    ELON MUSK
                  </span>
                  <p className=" text-black">{messages5[1].content}</p>
                </div>
              </div>
            )}

            {messages6[1] && (
              <div className="w-full flex flex-col items-end mb-3">
                <div className="bg-amber-200 border border-amber-500 px-3 rounded-md w-9/12 flex flex-col flex-end items-end">
                  <span className="font-semibold text-sm m-0 pt-1">
                    MADAM CURIE
                  </span>
                  <p className=" text-black">{messages6[1].content}</p>
                </div>
              </div>
            )}

            {isSummaryLoading ? (
              <div className="w-full text-center py-8">
                <p className="m-auto">generating summary....</p>
              </div>
            ) : (
              <>
                {debateSummary.length > 5 && (
                  <div className="px-4 border-t pb-16">
                    <div className="w-full py-16 mb-3">
                      <div className="bg-slate-200 px-3 rounded-md w-11/12  m-auto border-2 border-blue-600 py-1">
                        <span className="font-semibold text-sm m-0 pt-1">
                          SUMMARY
                        </span>
                        <p className=" text-black">{debateSummary}</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
