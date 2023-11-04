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
    <>
      <Header id={eventId} />
      {children}
      <Navbar />
    </>
  );
}
