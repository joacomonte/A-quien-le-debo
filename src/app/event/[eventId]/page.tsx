// "use client";

import Link from "next/link";
import { FcMindMap } from "react-icons/fc";
import { FaTasks } from "react-icons/fa";
import { TbUserQuestion } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";

// import { useEffect, useState } from "react";

type Params = {
  params: {
    eventId: string;
  };
};

export default async function EventIdPage({ params: { eventId } }: Params) {
  const response = await fetch(`http://localhost:3000/api/event/${eventId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  return (
    <>
      <header className="relative flex items-center max-w-[500px] justify-start w-full h-12 gap-3 px-4 text-left bg-slate-100">
        <FcMindMap size={30} />{" "}
        {result.name && <h2 className="font-semibold"> {result.name}</h2>}
      </header>
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
      <div className="sticky bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <FaTasks size={25} color={"gray"} />

            <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Spendings
            </span>
          </button>
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <FaUsers size={25} color={"gray"} />
            <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Members
            </span>
          </button>
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <TbUserQuestion size={25} color={"gray"} />
            <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Pay to?
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
