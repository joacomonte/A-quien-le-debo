'use client';

import { Dialog, Transition, Listbox, Combobox, TransitionChild, ComboboxButton, ComboboxOptions, DialogTitle, ComboboxInput, ComboboxOption, ListboxButton, ListboxOptions, ListboxOption, DialogPanel } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Toaster, toast } from 'sonner';

type Person = {
  memberId: number;
  memberName: string;
};

type NewSpendProps = {
  eventId: string;
  onDataChange: () => void;
};

export default function NewSpend({ eventId, onDataChange: triggerParentUpdate }: NewSpendProps) {
  const [allMembers, setAllMembers] = useState<Member[] | null>(null);

  const [consumers, setConsumers] = useState<Member[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const [whoPaid, setWhoPaid] = useState<Person | null>(null);

  const [title, setTitle] = useState<string>('');

  const [notes, setNotes] = useState<string>('');

  const [amount, setAmount] = useState<string>('');

  const [query, setQuery] = useState('');

  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  useEffect(() => {
    async function getAllMembers() {
      const response = await fetch(`/api/event/${eventId}/members`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseBody: ApiResponse<Member[]> = await response.json();

      if (responseBody.message === 'OK') {
        setAllMembers(responseBody.data.map((member: Member) => member));
      }
    }

    getAllMembers();
  }, [eventId]); // Dependency array with eventId

  async function submitSpend() {
    setSubmitButtonLoading(true);
    const response = await fetch(`/api/event/${eventId}/spendings`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        spenderId: whoPaid?.memberId,
        consumers: consumers.map((consumer) => consumer.memberId),
        title: title,
        amount: amount,
        notes: notes,
      }),
    });
    const responseBody = await response.json();

    // Check if the response status is 201 (Created)
    if (responseBody.data.status === 201) {
        // Clear input fields and state variables
      setConsumers([]);
      setWhoPaid(null);
      setTitle('');
      setNotes('');
      setAmount('');
      setQuery('');
      setSubmitButtonLoading(false)

      closeModal();
      toast.success('Spending added successfully!');
      triggerParentUpdate()

    } else {
      toast.error('Failed to add spending. Please try again.');
    }
  }

  const filteredPeople = query === '' ? allMembers : allMembers?.filter((person) => person.memberName.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')));

  const toggleSelectAll = () => {
    if (consumers?.length === 0 && allMembers) {
      setConsumers([...allMembers]);
    } else {
      setConsumers([]);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function inputAmount(e: any) {
    const input = e.target.value;
    // Validate input to allow only numbers and one decimal point
    if (/^\d*\.?\d*$/.test(input)) {
      setAmount(input);
    }
  }

  return (
    <>
      <button type="button" onClick={openModal} className=" flex w-full justify-center rounded-xl border  border-transparent bg-green-100 px-4 py-4  text-left text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 ">
        Nuevo gasto
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" static className="relative z-30 " onClose={() => null}>
          <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle as="h3" className="text-xl font-medium leading-6 text-gray-900">
                    Detalles del nuevo gasto
                  </DialogTitle>
                  <div className="pt-4"></div>
                  <div className="flex flex-col gap-6 py-6">
                    <div>
                      <label htmlFor="whoPaid" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                        Quien pagó?
                      </label>
                      <div className="w-full">
                        <Combobox value={whoPaid} onChange={setWhoPaid}>
                          <div className="relative z-30 mt-1">
                            <div className="relative w-full cursor-default overflow-hidden rounded-lg  text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                              <ComboboxInput placeholder="Buscar por nombre" className="w-full border-none bg-gray-50 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0" displayValue={(person: Member) => person?.memberName} onChange={(event) => setQuery(event.target.value)} />
                              <ComboboxButton className="absolute inset-y-0 right-0 z-20 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                              </ComboboxButton>
                            </div>
                            <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                              <ComboboxOptions className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                {!allMembers && <li className=" relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900">Loading...</li>}
                                {(allMembers?.length === 0 || filteredPeople?.length === 0) && <li className=" relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900">No existen miembros</li>}
                                {filteredPeople?.map((person, index) => (
                                  <ComboboxOption key={index} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-green-50 text-green-900' : 'text-gray-900'}`} value={person}>
                                    {({ selected }) => (
                                      <>
                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{person.memberName}</span>
                                        {selected ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </ComboboxOption>
                                ))}
                              </ComboboxOptions>
                            </Transition>
                          </div>
                        </Combobox>
                      </div>
                    </div>

                    {/* Start Multi select */}
                    <div className=" w-full">
                      <div>
                        <label htmlFor="amount" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                          Entre quienes se divide?
                        </label>

                        <div className="no-scrollbar flex w-full gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                          {consumers.map((p, i) => (
                            <span key={i} className=" my-1 whitespace-nowrap rounded-full bg-green-100 text-green-700 px-2.5 py-0.5 text-xs font-medium dark:bg-gray-700 dark:text-gray-300">
                              {p.memberName}
                            </span>
                          ))}
                        </div>

                        <Listbox value={consumers} onChange={(v) => setConsumers(v)} multiple>
                          <div className="relative z-20 mt-1">
                            <div className="relative w-full cursor-default overflow-hidden rounded-lg  text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                              <ListboxButton className="w-full border-none bg-gray-50 py-2 pl-3 pr-2 text-left text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0">
                                <span className="block truncate text-gray-400">Seleccionar de la lista</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                              </ListboxButton>
                            </div>
                            <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setQuery('')}>
                              <ListboxOptions className="absolute z-20 mt-1 max-h-[250px] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                {query === '' && (
                                  <div onClick={toggleSelectAll} className="relative cursor-default select-none py-2 pl-10 pr-4 font-medium hover:bg-green-50">
                                    {consumers.length === 0 ? 'Seleccionar todos' : 'Deseleccionar todos'}
                                    {consumers.length === allMembers?.length ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                        <CheckIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
                                      </span>
                                    ) : null}
                                  </div>
                                )}
                                {allMembers?.length === 0 && <div className="relative cursor-default select-none py-2 pl-10 pr-4">Sin coincidencias</div>}
                                {allMembers?.map((person, personIdx) => (
                                  <ListboxOption key={personIdx} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-green-50  text-green-900' : 'text-gray-900'}`} value={person}>
                                    {({ selected }) => (
                                      <>
                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{person.memberName}</span>
                                        {selected ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                            <CheckIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </ListboxOption>
                                ))}
                              </ListboxOptions>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>
                    </div>
                    {/* End Multi select */}
                    <div>
                      <label htmlFor="first_name" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                        Titulo del gasto
                      </label>
                      <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" id="first_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 " placeholder="Bebidas" required></input>
                    </div>
                    <div>
                      <label htmlFor="amount" className="text-sm font-medium text-gray-900 dark:text-white">
                        Cuanto salio? <p className=" inline-block align-baseline text-xs text-gray-400">(Decimals with . )</p>
                      </label>
                      <input type="text" id="amount" value={amount} onChange={inputAmount} className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 " placeholder="100.50" required></input>
                    </div>
                    <div>
                      <label htmlFor="notes" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                        Notas <p className=" inline-block align-baseline text-xs text-gray-400">(Optional)</p>
                      </label>
                      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} id="notes" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 " placeholder="Fernet: $40" required></textarea>
                    </div>
                  </div>

                  <div className="flex w-full items-end justify-end gap-6 pt-4">
                    <button type="button" className="flex justify-end rounded-md border border-transparent bg-gray-50 px-4 py-2 text-sm font-medium text-gray-900 outline-none hover:bg-gray-100 focus:outline-none focus-visible:ring-2 " onClick={closeModal}>
                      Cancelar
                    </button>
                    <button type="button" className={`flex justify-end rounded-md border border-transparent px-4 py-2 text-sm font-medium outline-none focus:outline-none focus-visible:ring-2 ${submitButtonLoading ? 'bg-green-200 text-green-600 cursor-not-allowed' : 'bg-green-100 text-green-900 hover:bg-green-200'}`} onClick={submitSpend} disabled={submitButtonLoading}>
                      {submitButtonLoading ? 'Cargando...' : 'Guardar'}
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Toaster richColors position="top-center" />
    </>
  );
}
