"use client";

import { Dialog, Transition, Listbox, TransitionChild, ListboxButton, ListboxOptions } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const people = [
  { id: 1, name: "Juanchi" },
  { id: 2, name: "Patu" },
  { id: 3, name: "Curcex Re-tarded" },
  { id: 4, name: "Teti" },
  { id: 5, name: "Johnny Blue" },
  { id: 6, name: "Bart" },
];

export default function NewSpend() {
  const [selectedPeople, setSelectedPeople] = useState([people[0]]);
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const toggleSelectAll = () => {
    if (selectedPeople.length > 0) {
      setSelectedPeople([]);
    } else setSelectedPeople(people);

    setIsActive(!isActive);
  };

  // State to manage active status
  const [isActive, setIsActive] = useState(false);

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
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
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
                    <div className=" w-full">
                      <label
                        htmlFor="amount"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Entre quienes?
                      </label>
                      <Listbox
                        value={selectedPeople}
                        onChange={setSelectedPeople}
                        multiple
                      >
                        <div className="relative mt-1">
                          <ListboxButton className="relative w-full cursor-default rounded-lg bg-gray-50 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block h-5 truncate">
                              {selectedPeople.length === 0 ? (
                                <span className="block h-5 truncate text-gray-500">
                                  Selecciona a alguien
                                </span> // Default message when array is empty
                              ) : (
                                selectedPeople
                                  .map((person: any) => person.name)
                                  .join(", ")
                              )}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </ListboxButton>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <ListboxOptions className="z-60 absolute mt-1 max-h-[300px] min-h-[200px]  w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                              <div
                                onClick={toggleSelectAll}
                                className={`relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  isActive
                                    ? "bg-green-100 text-green-900"
                                    : "text-gray-900"
                                }`}
                              >
                                {isActive ? "Select All" : "Deselect All"}
                              </div>
                              {people.map((person, personIdx) => (
                                <Listbox.Option
                                  key={personIdx}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? "bg-green-100  text-green-900"
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
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </ListboxOptions>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
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
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="400"
                        required
                      ></input>
                    </div>
                  </div>

                  <div className="flex w-full items-end justify-end pt-4">
                    <button
                      type="button"
                      className="flex justify-end rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 "
                      onClick={closeModal}
                    >
                      Guardar
                    </button>
                  </div>
                </Dialog.Panel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
