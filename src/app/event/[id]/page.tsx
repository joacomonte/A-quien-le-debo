"use client";

import { useState } from "react";

type Params = {
  params: {
    id: string;
  };
};

export default function EventIdPage({ params: { id } }: Params) {
  const [eventName, setEventName] = useState<any>("");

  const handleSubmit = async () => {
    const response = await fetch(`/api/event/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventId: id }),
    });

    const responseBody = await response.json();

    setEventName(responseBody.name);
    console.log(responseBody);
  };

  return (
    <div className="flex flex-col items-center justify-center w-100% h-screen gap-3">
      <h4 className="">The event id is: {id}</h4>
      <button
        className="w-32 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Get name
      </button>
      {eventName && <h4 className="">The event name is: {eventName}</h4>}
    </div>
  );
}
