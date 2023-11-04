"use client";

import { useState } from "react";
import { Combobox } from "@headlessui/react";

type Params = {
  params: {
    eventId: string;
  };
};

export default function Page({ params: { eventId } }: Params) {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<any>();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleSubmit = async () => {
    const response = await fetch(
      `http://localhost:3000/api/event/${eventId}/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    // console.log(result);
    setUsers(result.data.users);
  };

  return (
    <div className=" w-screen h-full max-w-[500px] max-h-[700px] pb-6">
      <main className="flex flex-col items-start w-full h-full px-6">
        <h1 className="flex items-start self-start pt-8 text-3xl pb-14">
          Members
        </h1>
        <div className="flex flex-col justify-between w-full h-full">
          <div className="flex flex-col gap-6">
            <button
              className="p-2 text-white bg-blue-500 rounded-md"
              onClick={handleSubmit}
            >
              fetch
            </button>
            <div>
              {users ? (
                users.map((user: any) => (
                  <div key={user.userId}>
                    <p>{user.userName}</p>
                  </div>
                ))
              ) : (
                <p>No users found.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
