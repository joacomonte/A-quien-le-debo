'use client';

import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type spendProps = {
  title: string;
  notes: string;
  amount: string;
  whoPaid: number;
  consumers?: Member[];
  eventId: any;
};

export default function UserSpendsList({ title, notes, amount, whoPaid, eventId }: spendProps) {
  const [whoPaidName, setWhoPaidName] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchPaidByMember = async () => {
      if (eventId) {
        try {
          const res = await fetch(`/api/event/${eventId}/members/${whoPaid}`);
          if (!res.ok) {
            throw new Error(`HTTP error ${res.status}`);
          }
          const data = await res.json();
          console.log('resssss', data);

          setWhoPaidName(data.data);
        } catch (error) {
          console.error('Error fetching member data:', error);
        }
      }
    };

    fetchPaidByMember();
  }, []);

  return (
    <div className="w-full rounded-lg bg-gray-100 text-left text-sm font-medium text-gray-900">
      <div className="flex justify-between px-4 py-4 hover:bg-gray-200 cursor-pointer rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-gray-500/75" onClick={toggleOpen}>
        <div>
          <span>{title}: </span>
          <span className="font-bold">${amount}</span>
          <span className="px-1 text-xs text-gray-500"> {whoPaidName ? `Pagó ${whoPaidName}` : 'Cargando...'}</span>
        </div>
        <ChevronUpIcon className={`h-5 w-5 text-gray-500 ${isOpen ? 'rotate-180 transform' : ''}`} />
      </div>
      <Transition show={isOpen} enter="transition duration-300 ease-out" enterFrom="transform scale-95 opacity-0" enterTo="transform scale-100 opacity-100" leave="transition duration-300 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="transform scale-95 opacity-0">
        <div className="flex flex-col gap-3 px-4 py-3 text-sm text-gray-500">{notes ? <ul>{notes}</ul> : <p>Sin notas</p>}</div>
      </Transition>
    </div>
  );
}
