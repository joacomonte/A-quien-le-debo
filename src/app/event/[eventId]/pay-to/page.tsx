import BalanceCalculation from './_components/BalanceCalculation';

type PageProps = {
  params: Promise<{ eventId: string }>;
};

async function getAllMembersBalance(eventId: string) {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/event/${eventId}/members/balance`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

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


  function getPaymentInstructions(item, data) {
    const creditors = [];
    const debtors = [];
  
    // Separar a los acreedores y deudores
    data.forEach((entry) => {
      if (entry.balance > 0) {
        creditors.push({ name: entry.name, balance: entry.balance });
      } else if (entry.balance < 0) {
        debtors.push({ name: entry.name, balance: -entry.balance }); // Convertir el balance a positivo para simplificar
      }
    });
  
    // Ordenar por balance descendente
    creditors.sort((a, b) => b.balance - a.balance);
    debtors.sort((a, b) => b.balance - a.balance);
  
    const transactions = [];
    let i = 0,
      j = 0;
  
    // Generar transacciones
    while (i < creditors.length && j < debtors.length) {
      const creditor = creditors[i];
      const debtor = debtors[j];
  
      const amount = Math.min(creditor.balance, debtor.balance);
      transactions.push({
        from: debtor.name,
        to: creditor.name,
        amount,
      });
  
      // Actualizar balances
      creditor.balance -= amount;
      debtor.balance -= amount;
  
      // Avanzar al siguiente acreedor o deudor si su balance queda en 0
      if (creditor.balance === 0) i++;
      if (debtor.balance === 0) j++;
    }
  
    // Generar instrucciones para el usuario actual
    if (item.balance < 0) {
      // El usuario está en deuda: debe pagar dinero
      const payments = transactions
        .filter((t) => t.from === item.name)
        .map((t) => `Pagar a ${t.to} $${t.amount.toFixed(2)}`);
      return payments.length > 0 ? payments.join(', ') : 'Esta en 0.';
    } else if (item.balance > 0) {
      // El usuario tiene saldo positivo: debe recibir pagos
      const receipts = transactions
        .filter((t) => t.to === item.name)
        .map((t) => `Pedir a ${t.from} $${t.amount.toFixed(2)} `);
      return receipts.length > 0 ? receipts.join(', ') : 'Esta en 0.';
    } else {
      return 'Saldo equilibrado, no requiere transacciones.';
    }
  }
  
  

  // Find maximum absolute value for scaling
  const maxAbsValue = Math.max(
    ...sortedData.map((item) => Math.abs(item.balance))
  );

  return (
    <div className=' h-[100vh] w-full overflow-auto'>
      <main className='flex h-full w-full flex-col items-start p-4'>
        <h1 className='flex items-start self-start pb-8 pt-14 text-2xl font-medium'>
          Balance
        </h1>
        <div className='h-full w-full px-2 overflow-y-auto pb-[90px]'>
          {sortedData.map((item) => (
            <div key={item.name} className='mb-6'>
              <div className='flex items-center mb-2 space-x-4'>
                <div className='flex flex-col w-2/5'>
                <span className=' text-sm w-full font-medium truncate'>{item.name}</span>
                <span className='w-fit text-[10px] text-gray-500 font-medium break-words'>{getPaymentInstructions(item, sortedData)}</span>
                </div>
                
                <div className='flex-grow h-5 bg-gray-200 rounded-full overflow-hidden'>
                  <div
                    className={`h-full rounded-full ${item.balance >= 0 ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{
                      width: `${(Math.abs(item.balance) / maxAbsValue) * 100}%`,
                    }}
                  />
                </div>
                <div
                  className={`w-28 text-right font-semibold ${item.balance >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {item.balance >= 0 ? '-$' : '$'}
                  {Math.abs(item.balance).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
