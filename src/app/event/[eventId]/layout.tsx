import Header from '@/app/_globalComponents/Header';

import Navbar from '@/app/_globalComponents/Navbar';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ eventId: string }>; // Update to reflect that params is a Promise
};

async function getEventName(eventId: string) {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/event/${eventId}`, {
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
  // Await params to extract eventId
  const { eventId } = await params;

  // Fetch event name or any data you need asynchronously
  const eventName = (await getEventName(eventId)).data;

  return (
    <>
      <Header eventName={eventName} />
      {children}
      <Navbar />
    </>
  );
}
