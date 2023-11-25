import Header from "@/app/_components/Header";

import Navbar from "@/app/_components/Navbar";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    eventId: string;
  };
};

export default async function Layout({ children, params }: LayoutProps) {
  const eventId = params.eventId;

  return (
    <div className="flex flex-col h-[100vh] max-h-[100vh]">
      <div className="h-14">
        <Header id={eventId} />
      </div>
      <div className="flex-grow overflow-auto">{children}</div>
      <div className="h-20">
        <Navbar />
      </div>
    </div>
  );
}
