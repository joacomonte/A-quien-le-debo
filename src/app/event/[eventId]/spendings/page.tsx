import NewSpend from "@/app/event/[eventId]/spendings/_components/NewSpend";
import UserSpendsList from "@/app/event/[eventId]/spendings/_components/UserSpendsList";

type Params = {
  params: {
    eventId: string;
  };
};
// h-[calc(100%-300px)]
export default function Page({ params: { eventId } }: Params) {
  return (
    <div className=" h-[100vh] w-screen max-w-[500px] overflow-auto">
      <main className="flex h-full w-full flex-col  items-start p-4">
        <h1 className="flex items-start self-start pb-8 pt-14 text-3xl font-bold">
          Gastos del evento
        </h1>
        <div className="w-full">
          <UserSpendsList />
        </div>
        <div className="flex w-full gap-3 px-2 py-2">
          <h4 className="py-3 text-base font-medium">Total</h4>
          <h4 className="py-3 font-medium ">$9800</h4>
        </div>
        <NewSpend eventId={eventId} />
      </main>
    </div>
  );
}
