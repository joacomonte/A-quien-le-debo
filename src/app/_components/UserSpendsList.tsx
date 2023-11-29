"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

export default function UserSpendsList({ id }: any) {
  return (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500/75">
              <div>
                <span>Carne: </span>
                <span className="text-sm font-bold ">$6400</span>
                <span className="px-2 text-gray-600 text-xs">(Monte)</span>
              </div>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="flex flex-col px-4 py-3 text-sm text-gray-500 gap-3">
              <ul>
                <li>Tira de cerdo: $4000</li>
              </ul>
              <ul>
                <li>Vacio: $1500</li>
              </ul>
              <ul>
                <li>Queso: $500</li>
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <br></br>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500/75">
              <span>Bebidas $3400 - Nico</span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="flex flex-col px-4 py-3 text-sm text-gray-500 gap-3">
              <ul>
                <li>Fernet: $4000</li>
              </ul>
              <ul>
                <li>Hielo: $1500</li>
              </ul>
              <ul>
                <li>Coca: $500</li>
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <br></br>
      <button className="flex w-full justify-center rounded-lg bg-teal-100 px-4 py-4 text-sm  font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500/75">
        Nuevo Gasto
      </button>
    </>
  );
}
