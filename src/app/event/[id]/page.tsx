"use client";

import { useEffect, useState } from "react";

type Params = {
  params: {
    id: string;
  };
};

export default function EventIdPage({ params: { id } }: Params) {
  const [eventName, setEventName] = useState<any>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/event/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventId: id }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setEventName(result.name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    return () => {
      // Cleanup function to cancel any pending requests or perform other cleanup
    };
  }, []);

  return (
    <>
      <div className="flex justify-center">
        {eventName && <h4 className="">The event name is: {eventName}</h4>}
      </div>
      <div className="flex flex-col items-center justify-center w-100% h-screen gap-3">
        <h4 className="">Welcome!</h4>
      </div>
    </>
  );
}
