import Header from '@/app/_globalComponents/Header';

import Navbar from '@/app/_globalComponents/Navbar';

type LayoutProps = {
  children: React.ReactNode;
  params: {
    eventId: string;
  };
};

async function getEventName(eventId: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/event/${eventId}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseBody = await response.json();
    return responseBody;
  } catch (error) {
    console.error('Error fetching event name:', error);
    throw error;
  }
}

export default async function Layout({ children, params }: LayoutProps) {
  const { eventId } = await params;
  const eventName = (await getEventName(eventId)).data;

  return (
    <>
      <Header eventName={eventName} />
      {children}
      <Navbar />
    </>
  );
}
