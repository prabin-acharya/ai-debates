"use client";

import { useChat } from "ai/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

interface Debate {
  debateId: string;
  userId: string;
  title: string;
  createdDateTime: string;
}

export default function Home() {
  const [debates, setDebates] = useState<Debate[]>([]);

  const imagesIds = [
    "prabinpng33",
    "prabin333",
    "prabinpng2",
    "f2zAuEcvqtRDVmFEo64g7",
    "JfYFxY_8wyOr40aeNkVKQ",
    "GH9xBkbWUAAeMYB.jpeg",
    "6lySpe_-VDQfas7yjLDt7",
  ];

  const router = useRouter();

  useEffect(() => {
    const fetchDebates = async () => {
      try {
        const response = await axios.get("/api/db/listAllDebates");
        console.log(response.data);

        setDebates(response.data.results);
      } catch (error) {
        console.error("Error fetching debates:", error);
      }
    };

    fetchDebates();
  }, []);

  // const debates2: Debate[] = [
  //   {
  //     debateId: "JfYFxY_8wyOr40aeNkVKQ",
  //     userId: "JXwKfWG-8hu5tYAm0qPDZ",
  //     title: "Health vs Wealth #01",
  //     createdDateTime: "2024-04-14 06:35:45",
  //   },
  //   {
  //     debateId: "6lySpe_-VDQfas7yjLDt7",
  //     userId: "JXwKfWG-8hu5tYAm0qPDZ",
  //     title: "AI Safety vs AI Acceleration",
  //     createdDateTime: "2024-04-14 06:39:52",
  //   },
  //   {
  //     debateId: "f2zAuEcvqtRDVmFEo64g7",
  //     userId: "DIdhnBy1iG7yaJABZeIGK",
  //     title: "Health vs Wealth",
  //     createdDateTime: "2024-04-14 07:30:56",
  //   },
  //   {
  //     debateId: "RLPvSfReaPLUfQ3SuSPIj",
  //     userId: "aa5ImpCPcg0s-rppUr3lk",
  //     title: "Health vs Wealth",
  //     createdDateTime: "2024-04-13 21:36:42",
  //   },
  //   {
  //     debateId: "WZdHk5MzuxgwqiTiylNT_",
  //     userId: "a6FTZrIZuDxQmDkkMoDQt",
  //     title: "Health vs Wealth2",
  //     createdDateTime: "2024-04-13 21:46:52",
  //   },
  //   {
  //     debateId: "DpaKILDKr-FzpQdasM-xg",
  //     userId: "aa5ImpCPcg0s-rppUr3lk",
  //     title: "Health vs Wealth3",
  //     createdDateTime: "2024-04-13 21:48:23",
  //   },
  //   {
  //     debateId: "2DgwC5s0cuSNAHR8r8CPk",
  //     userId: "a6FTZrIZuDxQmDkkMoDQt",
  //     title: "health vs wealth4",
  //     createdDateTime: "2024-04-13 21:49:28",
  //   },
  //   {
  //     debateId: "AzSEJzzQtzg7QcnQC0Jg9",
  //     userId: "F4STq3T1L3mWXG9rRKe77",
  //     title: "Health vs Wealth5",
  //     createdDateTime: "2024-04-13 21:58:56",
  //   },
  //   {
  //     debateId: "yEoacRFnsGgOSpEQHlB5b",
  //     userId: "DoXqa0rSh21ICisX4YE01",
  //     title: "health vs wealth6",
  //     createdDateTime: "2024-04-13 22:06:18",
  //   },
  //   {
  //     debateId: "QfqgoSixoeCuwX5bvlCqP",
  //     userId: "nsc9ZXVvS3FVEU-qSPD63",
  //     title: "health vs wealth8",
  //     createdDateTime: "2024-04-13 22:09:09",
  //   },
  //   {
  //     debateId: "G8CBwAggCnqQzSL_l8bJX",
  //     userId: "P5u4zoz9hyDaEuGDz-OYH",
  //     title: "health vs wealth10",
  //     createdDateTime: "2024-04-13 22:13:19",
  //   },
  //   {
  //     debateId: "cmRR46vKzE3oXhk9uN1Lc",
  //     userId: "li1eXIPADt61jmagJXmKN",
  //     title: "health vs wealth11",
  //     createdDateTime: "2024-04-13 22:19:53",
  //   },
  //   {
  //     debateId: "2f-KTh6J8YCeZWNLywEnk",
  //     userId: "zvUDi_Fq8ABRfM55z5Aly",
  //     title: "Health vs Wealth #20",
  //     createdDateTime: "2024-04-14 04:04:46",
  //   },
  // ];

  console.log(debates);
  const debatesLength = debates.length;
  const debates1 = debates.slice(0, debatesLength / 2);
  const debates2 = debates.slice(debatesLength / 2, debatesLength);

  return (
    <main className="flex min-h-screen flex-col bg-slate-300">
      <div className="w-2/3 mx-auto h-full border border-yellow-500">
        <nav className="border border-blue-500 flex items-center p-1 justify-between">
          <h1 className="font-bold text-2xl text-red-500">Ai debates</h1>

          <div className="flex flex-row-reverse ">
            <button
              onClick={() => router.push("/new")}
              className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Debate
            </button>
          </div>
        </nav>

        <div className="border border-red-950 min-h-96 pt-8 pb-40">
          <Marquee pauseOnHover={true}>
            {debates1.map((debate) => (
              <div
                key={debate.debateId}
                onClick={() => router.push(`/debate/${debate.debateId}`)}
                className="bg-gray-200-400 px-2  py-2 m-2 rounded-md inline-block cursor-pointer shadow-md hover:shadow-slate-400"
              >
                <div className="w-64 h-20 relative m-auto py-2">
                  <Image
                    fill={true}
                    className="absolute inset-0 rounded object-cover"
                    src={`https://pub-2f1faf404e074e64b3a0f184d00d15e4.r2.dev/${debate.debateId}`}
                    alt={"hello"}
                  />
                </div>

                <div className="w-full text-center">
                  <p className="font-semibold mt-2">{debate.title}</p>
                </div>
              </div>
            ))}
          </Marquee>
          <Marquee direction="right" pauseOnHover={true}>
            {debates2.map((debate) => (
              <div
                key={debate.debateId}
                onClick={() => router.push(`/debate/${debate.debateId}`)}
                className="bg-gray-200-400 px-2  py-2 m-2 rounded-md inline-block cursor-pointer shadow-md hover:shadow-slate-400"
              >
                <div className="w-64 h-20 relative m-auto py-2">
                  <Image
                    fill={true}
                    className="absolute inset-0 rounded object-cover"
                    src={`https://pub-2f1faf404e074e64b3a0f184d00d15e4.r2.dev/${debate.debateId}`}
                    alt={"hello"}
                  />
                </div>

                <div className="w-full text-center">
                  <p className="font-semibold mt-2">{debate.title}</p>
                </div>
              </div>
            ))}
          </Marquee>
          {/* <div className="flex flex-wrap m-auto justify-center">
            {debates2.map((debate) => (
              <div
                key={debate.debateId}
                onClick={() => router.push(`/debate/${debate.debateId}`)}
                className="bg-gray-200-400 px-2  py-2 m-2 rounded-md inline-block cursor-pointer shadow-md hover:shadow-slate-400"
              >
                <div className="w-64 h-20 relative m-auto py-2">
                  <Image
                    fill={true}
                    className="absolute inset-0 rounded object-cover"
                    src={`https://pub-2f1faf404e074e64b3a0f184d00d15e4.r2.dev/${debate.debateId}`}
                    alt={"hello"}
                  />
                </div>

                <div className="w-full text-center">
                  <p className="font-semibold mt-2">{debate.title}</p>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </main>
  );
}
