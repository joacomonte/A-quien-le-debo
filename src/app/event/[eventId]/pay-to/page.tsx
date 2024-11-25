import BalanceCalculation from "./_components/BalanceCalculation";


type PageProps = {
  params: Promise<{ eventId: string }>
};

export default async function PayTo({ params }: PageProps) {

  const { eventId } = await params;

  return (
    <div className=" h-[100vh] w-full overflow-auto">
      <main className="flex h-full w-full flex-col  items-start p-4">
        <h1 className="flex items-start self-start pb-8 pt-14 text-3xl font-bold">Resumen de gastos</h1>
      <BalanceCalculation eventId={eventId}/>
      </main>
    </div>
  );
}