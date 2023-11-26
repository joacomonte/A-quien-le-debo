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

  return (
    <header className="flex items-center max-w-[500px] h-14 h-max-14 justify-start w-full gap-3 px-4 text-left bg-slate-100">
      <FcMindMap size={30} />
      {result?.name && <h2 className="font-semibold"> {result.name}</h2>}
    </header>
  );
}
