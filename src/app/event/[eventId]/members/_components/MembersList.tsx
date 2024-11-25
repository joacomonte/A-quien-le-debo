/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useState } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

import { motion } from 'framer-motion';
import AddMemberItem from './AddMemberItem';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function MembersList({ eventId }: any) {
  const [membersList, setMemberList] = useState<Member[] | null>(null);

  useEffect(() => {
    getAllMembers();
  }, []);

  async function getAllMembers() {
    const response = await fetch(`/api/event/${eventId}/members`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseBody: ApiResponse<Member[]> = await response.json();
    if (responseBody.message === 'OK') {
      setMemberList(responseBody.data);
    }
  }

  // TODO relplace with useOptimistic hook
  // Creates the member locally with a temp name 'deleting+name' the gets the data from the db and updates
  async function removeMember(memberId: number) {
    const updatedList: any = membersList?.map((user) => (user.memberId === memberId ? { ...user, memberName: 'Deleting...' } : user));
    setMemberList(updatedList);

    const response = await fetch(`/api/event/${eventId}/members`, {
      cache: 'no-store',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        memberId: memberId,
      }),
    });
    console.log(response);
    getAllMembers();
  }

  return (
    <>
      {/* loading or null state */}
      {!membersList && <p className="px-2 py-5 ">Cargando...</p>}

      {/* if membersList has data */}
      {membersList && (
        <ul role="list" className="divide-y divide-gray-200 ">
          {/* If memberList empty */}
          {!membersList.length && <p className="px-2 py-5">No members found. Please add new members.</p>}

          {/* If memberList has members */}
          {membersList.map((member) => (
            <MemberItem key={member.memberId} member={member} removeMember={removeMember} />
          ))}

          {/*  this is the add new member li */}
          <li className="px-2 py-5 ">
            <AddMemberItem eventId={eventId} onListUpdate={getAllMembers} />
          </li>
        </ul>
      )}
    </>
  );
}

interface MemberItemProps {
  member: Member;
  removeMember: (memberId: number) => void;
}

// Define the MemberItem component
const MemberItem: React.FC<MemberItemProps> = ({ member, removeMember }) => {
  return (
    <motion.li key={member.memberId} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="px-2 py-4">
      <div className="flex items-center justify-between space-x-4 rtl:space-x-reverse">
        <p className="truncate text-base font-thin text-gray-800">{member.memberName}</p>

        <Popover>
          <PopoverTrigger asChild>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fill-rule="evenodd" d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clip-rule="evenodd" />
            </svg>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <p className="text-sm">Editar nombre</p>
              <div className="flex flex-col gap-2">
                <input id="width" className="col-span-2 h-10 pl-2 outline-none border border-gray-300 rounded-md" />
                <div className="w-full flex gap-4 pt-3">
                  <button className={`w-full text-sm rounded-md bg-gray-100 px-2 py-2 text-gray-700 font-light cursor-pointer`}>Cancelar</button>
                  <button className={`w-full text-sm rounded-md bg-green-100 px-2 py-2 text-green-700 font-light cursor-pointer`}>Actualizar</button>
                </div>
                <button className={`w-full text-sm rounded-md mt-2 bg-red-100 px-2 py-2 text-red-700 font-light cursor-pointer`}>Eliminar de la lista</button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* <div className='flex items-center gap-4'>
          <div onClick={() => removeMember(member.memberId)} className="ml-auto items-end cursor-pointer bg-red-100 text-red-600 py-1 px-2 text-xs rounded-md">Eliminar</div>{' '}
        </div> */}
      </div>
    </motion.li>
  );
};
