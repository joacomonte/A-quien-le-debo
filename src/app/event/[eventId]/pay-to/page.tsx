import BalanceCalculation from "./_components/BalanceCalculation";


type PageProps = {
  params: {
    eventId: string;
  };
};

// async function fetchEventData(eventId: string) {
//   try {
//     const response = await fetch(`http://localhost:3000/api/event/${eventId}/members`, {
//       cache: 'no-store',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const responseBody = await response.json();
//     return responseBody;
//   } catch (error) {
//     console.error('Error fetching event data:', error);
//     throw error;
//   }
// }

export default async function PayTo({ params }: PageProps) {
  const { eventId } = await params;
  // const eventData = await fetchEventData(eventId);

  return (
    <div className="flex flex-col  justify-start">
      <br></br>
      <h1 className="text-4xl font-bold">WHO ARE YOU???</h1>
      <br></br>
      <BalanceCalculation eventId={eventId}/>
    </div>
  );
}


//   return (
//     <div>hola</div>
//     <div className=" h-[100vh] w-screen max-w-[500px] overflow-auto">
//       <main className="flex h-full w-full flex-col  items-start p-4">
//         <h1 className="flex items-start self-start pb-8 pt-14 text-3xl font-bold">
//           Gastos del evento
//         </h1>
//         <div>
//           <label
//             htmlFor="amount"
//             className="mb-2 block pl-2 text-sm font-medium text-gray-900 dark:text-white"
//           >
//             Quien sos?
//           </label>
//           <div className="w-56">
//             <SelectSearchUser onWhoPaidChange={handleWhoPaidChange} />
//           </div>

//         </div>
//         <div className="flex w-full px-2 py-4">
//           {selectedPerson && <p> Si sos {selectedPerson.name} debes $3600 </p>}
//         </div>
//       </main>
//     </div>
//   );
// }



          {/* <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {}}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-6 text-gray-900"
                      >
                        Quien sos?
                      </Dialog.Title>
                      <div className="mt-2"></div>
                      <Dialog.Description className="py-4 pb-4 text-sm text-gray-500">
                        Para poder darte la información primero debes
                        seleccionar quien sos.
                      </Dialog.Description>



                      <div className="mt-4 flex w-full items-end justify-end">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 "
                          onClick={() => setIsOpen(false)}
                        >
                          Continuar
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition> */}