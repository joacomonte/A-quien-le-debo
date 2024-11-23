import { FcMindMap } from "react-icons/fc";


export default async function Header({ eventName }: any) {
  return (
    <header className="h-max-14 flex h-14 w-full max-w-[500px] items-center justify-start gap-3 rounded-b-2xl bg-[#bbbbbb07] px-4  text-left shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <FcMindMap size={30} />
      {eventName && <h2 className="font-semibold"> {eventName}</h2>}
    </header>
  );
}
