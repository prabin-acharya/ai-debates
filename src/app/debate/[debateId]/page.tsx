"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const runtime = "edge";

export default function Debate({ params }: { params: { debateId: string } }) {
  const [debateTitle, setDebateTitle] = useState("");
  const [debateArguments, setDebateArguments] = useState<any>([]);

  const debateId = params.debateId;

  useEffect(() => {
    const fetchDebateDetails = async () => {
      if (!debateId) return;

      try {
        const response = await axios.get(`/api/db/debate?debateId=${debateId}`);

        console.log(response.data);

        setDebateTitle(response.data.debate[0].title);
        setDebateArguments(response.data.debateArguments);

        // const debate = {
        //   debateId: "N-F6LxSBS7wO5fuXbmVJH",
        //   userId: "93iEf69lz9aPFS-E03BGw",
        //   title: "Health vs Wealth#21",
        //   createdDateTime: "2024-04-14 04:22:26",
        // };

        // const debateArguments2 = [
        //   {
        //     argumentId: null,
        //     debateId: "N-F6LxSBS7wO5fuXbmVJH",
        //     agentName: "STEVE JOBS",
        //     argument:
        //       "  \"Ah, the age-old debate: Health vs Wealth. Let me tell you something, folks. I'm Steve Jobs, and I know a thing or two about innovation and disruption. And let me tell you, health is the new wealth. Think about it. In today's world, we're constantly connected, constantly on the go. Our bodies are our most valuable asset, and we need to take care of them. So, I say, prioritize your health. Invest in your well-being, your mental and physical health. It's the new wealth, my friends. It's the new wealth.\".\"",
        //     createdDateTime: "2024-04-14 04:22:35",
        //   },
        //   {
        //     argumentId: null,
        //     debateId: "N-F6LxSBS7wO5fuXbmVJH",
        //     agentName: "ELON MUSK",
        //     argument:
        //       "  Hey there, folks! Elon Musk here, and I'm here to tell you that health is not just the new wealth, it's the only wealth that matters. Think about it, we're living in a world where technology is advancing at an exponential rate, but our bodies are still made of flesh and blood. Our health is our greatest asset, and we need to prioritize it above all else. At SpaceX, we're not just pushing the boundaries of space exploration, we're also pioneering new technologies to improve human health and longevity. So, let's focus on what really matters – our health, our well-being, and our future on this planet and beyond. #HealthIsWealth #PrioritizeYourHealth</s>",
        //     createdDateTime: "2024-04-14 04:22:43",
        //   },
        //   {
        //     argumentId: null,
        //     debateId: "N-F6LxSBS7wO5fuXbmVJH",
        //     agentName: "SOCRATES",
        //     argument:
        //       "As an economist, I must emphasize the undeniable link between health and wealth. A healthy population is crucial for a thriving economy, as it leads to higher productivity, lower healthcare costs, and overall well-being. Prioritizing health not only benefits individuals, but also society as a whole. While wealth can provide access to healthcare, without good health, wealth loses its value. In the grand scheme of things, health truly is the foundation of wealth. #HealthIsWealth",
        //     createdDateTime: "2024-04-14 04:22:45",
        //   },
        //   {
        //     argumentId: null,
        //     debateId: "N-F6LxSBS7wO5fuXbmVJH",
        //     agentName: "ECONOMIST",
        //     argument: "Ah, a most int",
        //     createdDateTime: "2024-04-14 04:22:46",
        //   },
        // ];

        // setDebateTitle(debate.title);
        // setDebateArguments(debateArguments2);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDebateDetails();
  }, [debateId]);

  const debateArgumensBgColors = [
    "bg-blue-200",
    "bg-green-200",
    "bg-violet-300",
    "bg-fuchsia-300",
    "bg-slate-200",
    "bg-orange-200",
    "bg-pink-200",
  ];

  return (
    <div className="h-full min-h-screen  bg-slate-300">
      <div className="w-2/3 h-full m-auto pb-10 border  px-2 min-h-screen">
        <div className="pt-6 ">
          <Link href={"/"}>
            <h1 className="text-xl font-bold text-red-400">AI Debates</h1>
          </Link>
        </div>
        {/*  */}
        <div className="py-2">
          <div className="text-center">
            <p className="text-4xl font-semibold text-gray-800 font-serif">
              {debateTitle}
            </p>
          </div>
        </div>

        <div className="relative h-52 w-4/5 m-auto py-2">
          {debateId && debateTitle ? (
            <Image
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 rounded-xl"
              src={`https://pub-2f1faf404e074e64b3a0f184d00d15e4.r2.dev/${debateId}`}
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

        {debateArguments.length > 0 && (
          <div className="px-2 pt-4 pb-16">
            <p className="font-bold text-lg">Arguments</p>

            {debateArguments.map((debateArgument: any, index: any) =>
              index % 2 === 0 ? (
                <div key={index} className="w-full items-start mt-2 mb-3">
                  <div
                    className={`${debateArgumensBgColors[index]} px-3 rounded-md w-9/12 `}
                  >
                    <span className="font-semibold text-sm m-0 pt-1">
                      {debateArgument.agentName}
                    </span>
                    <p className=" text-black">{debateArgument.argument}</p>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className="w-full flex flex-col items-end mb-3"
                >
                  <div
                    className={`${debateArgumensBgColors[index]} px-3 rounded-md w-9/12 flex flex-col flex-end items-end`}
                  >
                    <span className="font-semibold text-sm m-0 pt-1">
                      {debateArgument.agentName}
                    </span>
                    <p className=" text-black">{debateArgument.argument}</p>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* ARGUMENTS ############### */}
        {/* <div className="px-2 pt-2 pb-16">
          {messages1.length > 1 && (
            <p className="font-bold text-lg">Arguments</p>
          )}

          <div className="px-4 mt-3">
            {messages1[1] && (
              <div className="w-full items-start mt-2 mb-3">
                <div className="bg-blue-200 px-3 rounded-md w-9/12 ">
                  <span className="font-semibold text-sm m-0 pt-1">
                    STEVE JOBS
                  </span>
                  <p className=" text-black">{messages1[1].content}</p>
                </div>
              </div>
            )}

            {messages2[1] && (
              <div className="w-full flex flex-col items-end mb-3">
                <div className="bg-green-200 px-3 rounded-md w-9/12 flex flex-col flex-end items-end">
                  <span className="font-semibold text-sm m-0 pt-1">
                    ELON MUSK
                  </span>
                  <p className=" text-black">{messages2[1].content}</p>
                </div>
              </div>
            )}

            {messages3[1] && (
              <div className="w-full items-start mb-3">
                <div className="bg-violet-300 px-3 rounded-md w-9/12 ">
                  <span className="font-semibold text-sm m-0 pt-1">
                    SOCRATES
                  </span>
                  <p className=" text-black">{messages3[1].content}</p>
                </div>
              </div>
            )}

            {messages4[1] && (
              <div className="w-full flex flex-col items-end mb-3">
                <div className="bg-fuchsia-300 px-3 rounded-md w-9/12 flex flex-col flex-end items-end">
                  <span className="font-semibold text-sm m-0 pt-1">
                    ECONOMIST
                  </span>
                  <p className=" text-black">{messages4[1].content}</p>
                </div>
              </div>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
}
