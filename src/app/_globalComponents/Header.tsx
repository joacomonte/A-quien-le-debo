import { FcMindMap } from "react-icons/fc";
import Navbar from "@/app/_globalComponents/Navbar";

type Params = {
  params: {
    eventId: string;
  };
};
export default async function Header({ id }: any) {
  // const response = await fetch(
  //   `http://localhost:3000/api/event/${id}`,

  //   {
  //     cache: "no-store",
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   },
  // );
  // const result = await response.json();
  const result = { name: "Testing" };

  return (
    <header className="h-max-14 flex h-14 w-full max-w-[500px] items-center justify-start gap-3 rounded-b-2xl bg-[#bbbbbb07] px-4  text-left shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <FcMindMap size={30} />
      {result?.name && <h2 className="font-semibold"> {result.name}</h2>}
    </header>
  );
}
