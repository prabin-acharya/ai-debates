"use client";

import { useChat } from "ai/react";
import { useEffect, useState } from "react";

interface Debate {
  _id: string;
  userId: string;
  title: string;
  createdAt: string;
}

export default function Home() {
  const [debates, setDebates] = useState<Debate[]>([]);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat/anthropic",
  });

  useEffect(() => {
    const fetchDebates = async () => {
      try {
        const response = await fetch("/api/getAllDebates");
        const data: any = await response.json();
        setDebates(data.result);
      } catch (error) {
        console.error("Error fetching debates:", error);
      }
    };

    fetchDebates();
  }, []);
  return (
    <main className="flex min-h-screen flex-col bg-orange-100">
      <div className="w-2/3 mx-auto">
        <nav className="border border-blue-500 flex items-center p-1 justify-between">
          <h1 className="font-bold text-2xl text-red-500">Ai debates</h1>

          <div className="flex flex-row-reverse ">
            <button
              // onClick={()=>()}
              className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Debate
            </button>
            {/* <DebateForm /> */}
          </div>
        </nav>

        <div className="border-2 border-red-950">
          <div className="flex flex-wrap ">
            {debates.map((debate) => (
              <div
                key={debate._id}
                className="bg-gray-200 p-4 m-2 rounded-md inline-block"
              >
                {debate.title}
              </div>
            ))}
          </div>
        </div>

        {/* <div> */}
        {/* {messages.map((m) => (
          <div key={m.id}>
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))} */}

        {/* <form onSubmit={handleSubmit}>
          <input
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </form> */}
        {/* </div> */}
      </div>
    </main>
  );
}
