import NewSpend from '@/app/event/[eventId]/spendings/_components/NewSpend';
import UserSpendsList from '@/app/event/[eventId]/spendings/_components/UserSpendsList';
import { revalidatePath } from 'next/cache';

type PageProps = {
  params: Promise<{ eventId: string }>
};

async function getAllSpendings(eventId: string) {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/event/${eventId}/spendings`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    
    const responseBody = await response.json();


    return responseBody;
  } catch (error) {
    console.error('Error fetching spendings:', error);
    throw error;
  }
}



export default async function Page({ params }: PageProps) {
  const { eventId } = await params;
  const { data } = await getAllSpendings(eventId);
  const spendings = data?.data || [];

  const totalAmount = spendings.reduce((total: any, spending: any) => total + spending.amount, 0);

  // Server Action for revalidation
  async function revalidateData() {
    'use server';
    revalidatePath(`/events/${eventId}`);
  }

  return (
    <div className=" h-[100vh] w-full overflow-auto">
      <main className="flex h-full w-full flex-col items-start px-4 pb-[90px]">
      <h1 className="flex items-start self-start pb-6 pt-12 text-2xl">
          Resumen de gastos</h1>
        <div className="w-full flex flex-col gap-2 py-3 ">
          {/* Render all spendings using map */}
          {spendings.map((spending: any) => (
            <UserSpendsList
              key={spending.spendId} // Provide a unique key for each item
              title={spending.title}
              amount={spending.amount}
              whoPaid={spending.spenderId}
              notes={spending.notes}
              eventId={eventId}
            />
          ))}
          <div className="pl-2 pt-2">Total: {totalAmount}</div>
        </div>
        <NewSpend eventId={eventId} onDataChange={revalidateData} />
      </main>
    </div>
  );
}
