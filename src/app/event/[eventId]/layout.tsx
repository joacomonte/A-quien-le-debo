import Header from "@/app/_globalComponents/Header";

import Navbar from "@/app/_globalComponents/Navbar";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    eventId: string;
  };
};

export default async function Layout({ children, params }: LayoutProps) {
  const { eventId } = await params;

  return (
    <>
      <Header id={eventId} />
      {children}
      <Navbar />
    </>
  );
}
{
  /* <div className="flex-grow overflow-auto">{children}</div> */
}
