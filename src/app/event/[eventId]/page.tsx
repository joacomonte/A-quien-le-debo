// "use client";

import { FcMindMap } from "react-icons/fc";
import Navbar from "@/app/_components/Navbar";
import Link from "next/link";
import Header from "@/app/_components/Header";

// import { useEffect, useState } from "react";

type Params = {
  params: {
    eventId: string;
  };
};

export default async function EventIdPage({ params: { eventId } }: Params) {
  const response = await fetch(
    `http://localhost:3000/api/event/${eventId}`,

    {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();
  console.log(result);

  return (
    <>
      <div className=" w-screen h-full max-w-[500px] max-h-[700px] pb-6">
        <main className="flex flex-col items-start w-full h-full px-6">
          <h1 className="flex items-start self-start pt-8 text-3xl pb-14">
            Summary
          </h1>
          <div className="flex flex-col justify-between w-full h-full">
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-lg ">Monte</h2>
                <p className="text-sm text-gray-500">Spent $4000 in Vacio</p>
              </div>
              <div>
                <h2 className="text-lg ">Teti</h2>
                <p className="text-sm text-gray-500">Spent $700 in Cervecita</p>
              </div>
            </div>

            {/* <Link href={`/event/${eventId}/users`}>
              <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
              Add participants
              </button>
            </Link> */}
          </div>
        </main>
      </div>

      {/* <Navbar /> */}
    </>
  );
}
