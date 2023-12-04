"use client";

import { Dialog, Transition, Listbox, Combobox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

type person = {
  id: number;
  name: string;
};

const people: person[] = [
  { id: 1, name: "Juanchi" },
  { id: 2, name: "Patu" },
  { id: 3, name: "Curcex Re-tarded" },
  { id: 4, name: "Teti" },
  { id: 5, name: "Johnny green" },
  { id: 6, name: "Bart" },
  { id: 7, name: "Tesla" },
  { id: 8, name: "Ottus" },
];

export default function NewSpend() {
  const [selectedPeople, setSelectedPeople] = useState<person[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [whoPaid, setWhoPaid] = useState<person | null>(null);

  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const toggleSelectAll = () => {
    if (selectedPeople.length === 0) {
      setSelectedPeople([...people]);
    } else {
      setSelectedPeople([]);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className=" flex w-full justify-center rounded-lg border  border-transparent bg-green-100 px-4 py-4  text-left text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 "
      >
        Nuevo gasto
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-30 " onClose={closeModal}>
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
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Nuevo gasto
                  </Dialog.Title>
                  <div className="pt-2">
                    <p className="text-sm text-gray-500">
                      Podrás editarlo mas adelante
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 py-6">
                    <div>
                      <label
                        htmlFor="whoPaid"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Quien pagó?
                      </label>
                      <div className="w-full">
                        <Combobox value={whoPaid} onChange={setWhoPaid}>
                          <div className="relative z-30 mt-1">
                            <div className="relative w-full cursor-default overflow-hidden rounded-lg  text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                              <Combobox.Input
                                className="w-full border-none bg-gray-50 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0"
                                displayValue={(person: any) => person?.name}
                                onChange={(event) =>
                                  setQuery(event.target.value)
                                }
                              />
                              <Combobox.Button className="absolute inset-y-0 right-0 z-20 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </Combobox.Button>
                            </div>
                            {/* <Combobox.Button className="relative z-30 w-full cursor-default rounded-lg bg-gray-50 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                              <span className="block truncate">
                                {whoPaid?.name}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Combobox.Button> */}
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Combobox.Options className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                {filteredPeople.map((person, personIdx) => (
                                  <Combobox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                          ? "bg-green-100 text-green-900"
                                          : "text-gray-900"
                                      }`
                                    }
                                    value={person}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected
                                              ? "font-medium"
                                              : "font-normal"
                                          }`}
                                        >
                                          {person.name}
                                        </span>
                                        {selected ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Combobox.Option>
                                ))}
                              </Combobox.Options>
                            </Transition>
                          </div>
                        </Combobox>
                      </div>
                    </div>

                    {/* Start Multi select */}
                    <div className=" w-full">
                      <div>
                        <label
                          htmlFor="amount"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Entre quienes?
                        </label>

                        <div className="no-scrollbar flex w-full gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                          {selectedPeople.map((p, i) => (
                            <span
                              key={i}
                              className=" mb-2 whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            >
                              {p.name}
                            </span>
                          ))}
                        </div>

                        <Listbox
                          value={selectedPeople}
                          onChange={(v) => setSelectedPeople(v)}
                          multiple
                        >
                          <div className="relative z-20 mt-1">
                            <div className="relative w-full cursor-default overflow-hidden rounded-lg  text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                              {/* <Listbox.Input
                                className="w-full border-none bg-gray-50 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0"
                                displayValue={(person: any) => person.name}
                                onChange={(event) =>
                                  setQuery(event.target.value)
                                }
                              /> */}
                              <Listbox.Button className="w-full border-none bg-gray-50 py-2 pl-3 pr-2 text-left text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0">
                                <span className="block truncate text-gray-500">
                                  Seleccione de la lista
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </span>
                              </Listbox.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                              afterLeave={() => setQuery("")}
                            >
                              <Listbox.Options className="absolute z-20 mt-1 max-h-[250px] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                {query === "" && (
                                  <div
                                    onClick={toggleSelectAll}
                                    className="relative cursor-default select-none py-2 pl-10 pr-4 font-medium hover:bg-green-50"
                                  >
                                    {selectedPeople.length === 0
                                      ? "Select All"
                                      : "Deselect All"}
                                    {selectedPeople.length === people.length ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                        <CheckIcon
                                          className="h-5 w-5 text-green-600"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </div>
                                )}
                                {people.length === 0 && (
                                  <div className="relative cursor-default select-none py-2 pl-10 pr-4">
                                    Sin coincidencias
                                  </div>
                                )}
                                {people.map((person, personIdx) => (
                                  <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                          ? "bg-green-50  text-green-900"
                                          : "text-gray-900"
                                      }`
                                    }
                                    value={person}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected
                                              ? "font-medium"
                                              : "font-normal"
                                          }`}
                                        >
                                          {person.name}
                                        </span>
                                        {selected ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                            <CheckIcon
                                              className="h-5 w-5 text-green-600"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>
                    </div>
                    {/* End Multi select */}
                    <div>
                      <label
                        htmlFor="first_name"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Titulo
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 "
                        placeholder="John"
                        required
                      ></input>
                    </div>
                    <div>
                      <label
                        htmlFor="amount"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Monto
                      </label>
                      <input
                        type="number"
                        id="amount"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 "
                        placeholder="400"
                        required
                      ></input>
                    </div>
                  </div>

                  <div className="flex w-full items-end justify-end pt-4">
                    <button
                      type="button"
                      className="flex justify-end rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 outline-none hover:bg-green-200 focus:outline-none focus-visible:ring-2 "
                      onClick={closeModal}
                    >
                      Guardar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
