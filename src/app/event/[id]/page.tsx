"use client";

type Params = {
  params: {
    id: string;
  };
};

export default function EventIdPage({ params: { id } }: Params) {
  return (
    <div>
      <p>{id}</p>
    </div>
  );
}
