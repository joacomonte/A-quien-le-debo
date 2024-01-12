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
                <span className="px-2 text-xs text-gray-600">(Paid Monte)</span>
              </div>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="flex flex-col gap-3 px-4 py-3 text-sm text-gray-500">
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
              <div>
                <span>Carne: </span>
                <span className="text-sm font-bold ">$6400</span>
                <span className="px-2 text-xs text-gray-600">(Paid Monte)</span>
              </div>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="flex flex-col gap-3 px-4 py-3 text-sm text-gray-500">
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
              <div>
                <span>Carne: </span>
                <span className="text-sm font-bold ">$6400</span>
                <span className="px-2 text-xs text-gray-600">(Paid Monte)</span>
              </div>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="flex flex-col gap-3 px-4 py-3 text-sm text-gray-500">
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
    </>
  );
}
