import Image from 'next/image';


export default async function Header({ eventName }: any) {
  return (
    <header className="h-max-14 flex h-14 w-full items-center justify-start gap-3 rounded-b-lg bg-[#bbbbbb07] text-left shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <Image src="/diosito.png" alt="Event Created Icon" width={18} height={40} />
      {eventName && <h2 className="font-semibold"> {eventName}</h2>}
    </header>
  );
}
