import { revalidatePath } from 'next/cache';
import SpendingsList from './_components/SpendingsList';
import NewSpendingDialog from './_components/NewSpendingDialog';

type PageProps = {
  params: Promise<{ eventId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { eventId } = await params;

  async function revalidateData() {
    'use server';
    revalidatePath(`/events/${eventId}`);
  }

  return (
    <div className=" h-[100vh] w-full overflow-auto">
      <main className="flex h-full w-full flex-col items-start px-4 pb-[90px]">
        <h1 className="flex items-start self-start pb-6 pt-12 text-2xl">Lista de gastos</h1>
        <NewSpendingDialog eventId={eventId} onDataChange={revalidateData}/>
        <SpendingsList eventId={eventId} />
      </main>
    </div>
  );
}
