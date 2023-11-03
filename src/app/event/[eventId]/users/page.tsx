"use client";

type Params = {
  params: {
    eventId: string;
  };
};

export default function UsersPage({ params: { eventId } }: Params) {
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
    console.log(result);
  };

  return (
    <div className="flex flex-col items-center justify-center w-100% h-screen gap-3">
      <h4 className="">This is users page</h4>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        add users test
      </button>
    </div>
  );
}
