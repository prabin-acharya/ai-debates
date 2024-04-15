"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { CgProfile } from "react-icons/cg";

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

    const getUserId = async () => {
      try {
        const response = await axios.get("/api/db/userId");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching debates:", error);
      }
    };

    getUserId();
    fetchDebates();
  }, []);

  let debates1: any = [];
  let debates2: any = [];
  if (debates && debates.length > 0) {
    const debatesLength = debates.length;
    debates1 = debates.slice(0, debatesLength / 2);
    debates2 = debates.slice(debatesLength / 2, debatesLength);
  }

  return (
    <main className="flex min-h-screen flex-col bg-slate-300">
      <div className="w-full md:w-2/3 mx-auto h-full border min-h-screen">
        <nav className=" flex items-center px-2 pt-6 pb-4 justify-between border-b">
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

            <button
              onClick={() => router.push("/new")}
              className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Debate
            </button>
          </div>
        </nav>

        <div className="  min-h-96 pt-8 pb-40">
          <div>
            <span className="px-3 font-semibold text-sm text-gray-600">
              EXPLORE DEBATES
            </span>
          </div>
          {debates && debates.length > 0 && (
            <>
              <Marquee pauseOnHover={true}>
                {debates1.map((debate: any) => (
                  <div
                    key={debate.debateId}
                    onClick={() => router.push(`/debate/${debate.debateId}`)}
                    className="w-21r h-52 bg-gray-200-400 px-2  py-2 m-2 rounded-md inline-block cursor-pointer shadow-md hover:shadow-slate-400"
                  >
                    <div className="w-80 h-28 relative m-auto py-2">
                      <Image
                        fill={true}
                        className="absolute inset-0 rounded object-cover"
                        src={`https://pub-2f1faf404e074e64b3a0f184d00d15e4.r2.dev/${debate.debateId}`}
                        alt={"hello"}
                      />
                    </div>

                    <div className="w-full text-center h-full border border-blue-600 items-center justify-center">
                      <p className="font-semibold mt-2 text-lg text-gray-800 break-words">
                        {debate.title && debate.title.length > 40
                          ? `${debate.title.slice(0, 40)}...`
                          : debate.title}
                      </p>
                    </div>
                  </div>
                ))}
              </Marquee>
              <Marquee direction="right" pauseOnHover={true}>
                {debates2.map((debate: any) => (
                  <div
                    key={debate.debateId}
                    onClick={() => router.push(`/debate/${debate.debateId}`)}
                    className="w-21r h-52 bg-gray-200-400 px-2  py-2 m-2 rounded-md inline-block cursor-pointer shadow-md hover:shadow-slate-400"
                  >
                    <div className="w-80 h-28 relative m-auto py-2">
                      <Image
                        fill={true}
                        className="absolute inset-0 rounded object-cover"
                        src={`https://pub-2f1faf404e074e64b3a0f184d00d15e4.r2.dev/${debate.debateId}`}
                        alt={"hello"}
                      />
                    </div>

                    <div className="w-full text-center h-full border border-blue-600 items-center justify-center">
                      <p className="font-semibold mt-2 text-lg text-gray-800 break-words">
                        {debate.title && debate.title.length > 40
                          ? `${debate.title.slice(0, 40)}...`
                          : debate.title}
                      </p>
                    </div>
                  </div>
                ))}
              </Marquee>
            </>
          )}

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
