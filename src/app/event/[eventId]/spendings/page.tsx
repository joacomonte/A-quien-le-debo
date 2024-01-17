import NewSpend from "@/app/event/[eventId]/spendings/_components/NewSpend";
import UserSpendsList from "@/app/event/[eventId]/spendings/_components/UserSpendsList";

type Params = {
  params: {
    eventId: string;
  };
};

async function getAllSpendings(eventId: string) {
  console.log("entre");

  try {
    const response = await fetch(
      `http://localhost:3000/api/event/${eventId}/spendings`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const responseBody = await response.json();
    console.log(responseBody);

    return responseBody;
  } catch (error) {
    console.error("Error fetching spendings:", error);
    throw error; // You can handle the error according to your needs
  }
}
export default async function Page({ params: { eventId } }: Params) {
  const data = await getAllSpendings(eventId);
  console.log(data.data);

  return (
    <div className=" h-[100vh] w-screen max-w-[500px] overflow-auto">
      <main className="flex h-full w-full flex-col  items-start p-4">
        <h1 className="flex items-start self-start pb-8 pt-14 text-3xl font-bold">
          Spedings Details
        </h1>
        <div className="w-full">
          {/* <UserSpendsList title={title} amount={amount} whoPaid={whoPaid} notes={notes}  /> */}
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
