import BalanceCalculation from './_components/BalanceCalculation';


type PageProps = {
  params: Promise<{ eventId: string }>;
};

async function getAllMembersBalance(eventId: string) {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/event/${eventId}/members/balance`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseBody = await response.json();
    console.log(responseBody);
    
    return responseBody;
  } catch (error) {
    console.error('Error fetching spendings:', error);
    throw error;
  }
}

export default async function PayTo({ params }: PageProps) {
  const { eventId } = await params;
  const { data } = await getAllMembersBalance(eventId);
  console.log(data);
  
  // const balanceData = [
  //   { name: 'John Doe', balance: 5500 },
  //   { name: 'Jane Smith', balance: -3200 },
  //   { name: 'Mike Johnson', balance: 8700 },
  //   { name: 'Sarah Williams', balance: -1500 },
  //   { name: 'Alex Brown', balance: 6300 },
  //   { name: 'Emma Davis', balance: -4100 },
  //   { name: 'Tom Wilson', balance: 9200 },
  //   { name: 'Lisa Taylor', balance: -2800 },
  // ];

  // Sort data: positives descending, then negatives descending (more negative at bottom)
  const sortedData = [...data].sort((a, b) => {
    if (a.balance >= 0 && b.balance >= 0) return b.balance - a.balance;
    if (a.balance < 0 && b.balance < 0) return b.balance - a.balance;
    return b.balance - a.balance;
  });

  // Find maximum absolute value for scaling
  const maxAbsValue = Math.max(...sortedData.map((item) => Math.abs(item.balance)));

  return (
    <div className=" h-[100vh] w-full overflow-auto">
      <main className="flex h-full w-full flex-col  items-start p-4">
        <h1 className="flex items-start self-start pb-8 pt-14 text-2xl font-bold">Resumen de gastos</h1>

        <div className="h-[400px] max-h-[55vh] w-full overflow-y-auto pb-[10vh]">
          {sortedData.map((item) => (
            <div key={item.name} className="flex items-center mb-3 space-x-4 ">
              <div className="w-1/3 text-sm font-medium truncate">{item.name}</div>
              <div className="flex-grow h-8 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.balance >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{
                    width: `${(Math.abs(item.balance) / maxAbsValue) * 100}%`,
                  }}
                />
              </div>
              <div className={`w-28 text-right font-semibold ${item.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {item.balance >= 0 ? '$' : '-$'}
                {Math.abs(item.balance).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
