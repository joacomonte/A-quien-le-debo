// "use client";

import Link from "next/link";

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
    <div className="flex flex-col items-center justify-center w-100% h-screen gap-3">
      {result.name && <h4 className="">The event name is: {result.name}</h4>}
      <h4 className="">Welcome!</h4>
      <Link href={`/event/${eventId}/users`}>
        <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          Add participants
        </button>
      </Link>
    </div>
  );
}
