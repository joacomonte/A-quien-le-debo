import { FcMindMap } from "react-icons/fc";
import Navbar from "@/app/_components/Navbar";

type Params = {
  params: {
    eventId: string;
  };
};
export default async function Header({ id }: any) {
  const response = await fetch(
    `http://localhost:3000/api/event/${id}`,

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
    <header className="relative flex items-center max-w-[500px] justify-start w-full h-12 gap-3 px-4 text-left bg-slate-100">
      <FcMindMap size={30} />
      {result?.name && <h2 className="font-semibold"> {result.name}</h2>}
    </header>
  );
}
