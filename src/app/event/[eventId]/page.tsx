// "use client";

import { FcMindMap } from "react-icons/fc";
import Navbar from "@/app/_globalComponents/Navbar";
import Link from "next/link";
import Header from "@/app/_globalComponents/Header";

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
    },
  );
  const result: ApiResponse<responseType> = await response.json();
  console.log(result);

  return (
    <div className=" h-full max-h-[700px] w-screen max-w-[500px] pb-6">
      <main className="flex h-full w-full flex-col items-start px-6">
        <h1 className="flex items-start self-start pb-14 pt-8 text-3xl">
          Summary
        </h1>
        <div className="flex h-full w-full flex-col justify-between">
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
        </div>
      </main>
    </div>
  );
}
