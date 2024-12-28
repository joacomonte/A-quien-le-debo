'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Transition } from '@headlessui/react';
import { ChevronUpIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid';

import { useEffect, useState } from 'react';

type spendProps = {
  title: string;
  notes: string;
  amount: string;
  whoPaid: number;
  consumers?: Member[];
  spendId: number;
  eventId: any;
};

export default function UserSpendsItem({ title, notes, amount, whoPaid, spendId, eventId }: spendProps) {
  const [whoPaidName, setWhoPaidName] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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

          setWhoPaidName(data.data);
        } catch (error) {
          console.error('Error fetching member data:', error);
        }
      }
    };

    fetchPaidByMember();
  }, []);

  async function removeSpending() {
    setIsPopoverOpen(false);
    try {
      const response = await fetch(`/api/event/${eventId}/spendings`, {
        cache: 'no-store',
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spendId: spendId }),
      });
  
      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Error deleting spending:', response.status);
      }
    } catch (error) {
      console.error('Error deleting spending:', error);
    }
  }

  return (
    <div className="w-full rounded-lg bg-gray-100 text-left text-sm font-medium text-gray-900">
      <div className="flex justify-between p-5 hover:bg-gray-200 cursor-pointer rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-gray-500/75" onClick={toggleOpen}>
        <div>
          <span>{title}: </span>
          <span className="font-bold">${amount}</span>
          <span className="px-1 text-xs text-gray-500"> {whoPaidName ? `Pagó ${whoPaidName}` : 'Cargando...'}</span>
        </div>
        <ChevronUpIcon className={`h-5 w-5 text-gray-500 ${isOpen ? 'rotate-180 transform' : ''}`} />
      </div>
      <Transition show={isOpen} enter="transition duration-300 ease-out" enterFrom="transform scale-95 opacity-0" enterTo="transform scale-100 opacity-100" leave="transition duration-300 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="transform scale-95 opacity-0">
        <div className="flex justify-between gap-3 px-4 py-3 text-sm text-gray-500">
          {notes ? <p>{notes}</p> : <p>Sin notas</p>}
          <Popover open={isPopoverOpen}>
          <PopoverTrigger asChild>
            <div onClick={() => setIsPopoverOpen(true)} className="h-5 w-5 text-gray-400 cursor-pointer focus:outline-none ">
              <svg className='fill-current' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <path d="M5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10Z" fill="#inherit"></path>
                  <path d="M12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z" fill="#inherit"></path>{' '}
                  <path d="M21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12Z" fill="#inherit"></path>{' '}
                </g>
              </svg>{' '}
            </div>
          </PopoverTrigger>
          <PopoverContent className='w-80'>
            <div className='grid gap-4'>
              <div className='flex gap-2'>
                <button onClick={removeSpending} className='w-1/3 text-sm rounded-md mt-2 bg-red-100 px-2 py-4 text-red-500 cursor-pointer'>
                  Eliminar
                </button>
                <button className='w-2/3 text-sm rounded-md mt-2 bg-green-100 px-2 py-4 text-green-700 cursor-pointer'>
                  Editar
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        </div>
      </Transition>
    </div>
  );
}
