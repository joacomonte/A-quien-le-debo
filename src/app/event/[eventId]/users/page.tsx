"use client";

type Params = {
  params: {
    eventId: string;
  };
};

export default function Page({ params: { eventId } }: Params) {
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

  return <p>dsd</p>;
}
