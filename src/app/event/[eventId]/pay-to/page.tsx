"use client";
import SelectSearchUser from "@/app/_globalComponents/SelectSearchUser";
import { TPerson } from "@/app/_globalTypes/types";
import { supabase } from "@/app/lib/supabaseClient";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

export default function PayTo() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedPerson, setSelectedPerson] = useState<TPerson>(null);

  const handleWhoPaidChange = (person: TPerson | null) => {
    setSelectedPerson(person);
    console.log(person);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("Events").select("*");

      if (error) console.error(error);
      else console.log(data);
    };

    fetchData();
  }, []);

  return (
    <div className=" h-[100vh] w-screen max-w-[500px] overflow-auto">
      <main className="flex h-full w-full flex-col  items-start p-4">
        <h1 className="flex items-start self-start pb-8 pt-14 text-3xl font-bold">
          Gastos del evento
        </h1>
        <div>
          <label
            htmlFor="amount"
            className="mb-2 block pl-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Quien sos?
          </label>
          <div className="w-56">
            <SelectSearchUser onWhoPaidChange={handleWhoPaidChange} />
          </div>
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
        </div>
        <div className="flex w-full px-2 py-4">
          {selectedPerson && <p> Si sos {selectedPerson.name} debes $3600 </p>}
        </div>
      </main>
    </div>
  );
}
