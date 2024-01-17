"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

type spendProps = {
  title: string;
  notes: string;
  amount: string;
  whoPaid: string;
  consumers?: Member[];
};

export default function UserSpendsList({
  title,
  notes,
  amount,
  whoPaid,
  consumers,
}: spendProps) {
  return (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500/75">
              <div>
                <span>{title}: </span>
                <span className="text-sm font-bold ">${amount}</span>
                <span className="px-2 text-xs text-gray-600">
                  (Paid {whoPaid})
                </span>
              </div>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="flex flex-col gap-3 px-4 py-3 text-sm text-gray-500">
              <ul>{notes}</ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
