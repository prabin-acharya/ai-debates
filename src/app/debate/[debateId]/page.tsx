"use client";

export const runtime = "edge";

export default function Debate({ params }: { params: { debateId: string } }) {
  const debateId = params.debateId;
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
        <h1>Debate Title</h1>
        <p>{debateId}</p>
      </div>
    </main>
  );
}
