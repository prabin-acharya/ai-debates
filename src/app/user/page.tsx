"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const [debates, setDebates] = useState<any>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchUserDebates = async () => {
      try {
        const response = await axios.get("/api/db/user");
        console.log(response.data);

        setDebates(response.data.results);
      } catch (error) {
        console.error("Error fetching debates:", error);
      }
    };

    fetchUserDebates();
  }, []);

  return (
    <div className="h-full min-h-screen  bg-slate-300">
      <div className="w-2/3 mx-auto h-full border min-h-screen">
        <nav className=" flex items-center px-2 pt-6  pb-4 justify-between border-b">
          <Link href={"/"}>
            <h1 className="text-2xl font-bold text-red-400">AI Debates</h1>
          </Link>
          <div className="flex flex-row-reverse ">
            <div className=" flex items-center justify-center ml-4 pr-4"></div>

            <button
              onClick={() => router.push("/new")}
              className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Debate
            </button>
          </div>
        </nav>

        <div className="py-8 px-4">
          <h2 className="text-2xl font-bold">Debates</h2>
          <div className="py-4 flex flex-col">
            {debates.length > 0 && (
              <p className="mb-4 px-3">Here are the debates you started:</p>
            )}

            {debates &&
              debates.length > 0 &&
              debates.map((debate: any) => (
                <div
                  key={debate.debateId}
                  onClick={() => router.push(`/debate/${debate.debateId}`)}
                  className="w-2/3 m-auto  mb-2 bg-gray-200-400 px-2  py-2 rounded-md inline-block cursor-pointer shadow-md hover:shadow-slate-400"
                >
                  <div className="h-40 relative m-auto py-2">
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

            {debates.length == 0 && (
              <p className="m-auto font-semibold text-lg">
                You have not started any debates!
              </p>
            )}
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
}
