/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AddMemberItem from './AddMemberItem';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function MembersList({ eventId }: any) {
  const [membersList, setMemberList] = useState<Member[] | null>(null);

  useEffect(() => {
    getAllMembers();
  }, []);

  async function getAllMembers() {
    const response = await fetch(`/api/event/${eventId}/members`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json'},
    });
    const responseBody: ApiResponse<Member[]> = await response.json();
    if (responseBody.message === 'OK') {
      setMemberList(responseBody.data);
    }
  }

  // TODO relplace with useOptimistic hook
  // Creates the member locally with a temp name 'deleting+name' the gets the data from the db and updates
  async function removeMember(memberId: number) {
    const updatedList: any = membersList?.map((user) =>
      user.memberId === memberId ? { ...user, memberName: 'Deleting...' } : user
    );
    setMemberList(updatedList);

    const response = await fetch(`/api/event/${eventId}/members`, {
      cache: 'no-store',
      method: 'DELETE',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify( {memberId: memberId}),
    });

    console.log(response);
    getAllMembers();
  }

  return (
    <div className='w-full pb-[90px]'>
      {/* loading or null state */}
      {!membersList && <p className='px-2 py-5 '>Cargando...</p>}

      {/* if membersList has data */}
      {membersList && (
        <ul role='list' className='divide-y divide-gray-200 '>
          {/* If memberList empty */}
          {!membersList.length && (
            <p className='px-2 py-5'>
              No members found. Please add new members.
            </p>
          )}

          {/* If memberList has members */}
          {membersList.map((member) => (
            <MemberItem
              key={member.memberId}
              member={member}
              removeMember={removeMember}
            />
          ))}

          {/*  this is the add new member li */}
          <li className='px-2 py-5 '>
            <AddMemberItem eventId={eventId} onListUpdate={getAllMembers} />
          </li>
        </ul>
      )}
    </div>
  );
}

interface MemberItemProps {
  member: Member;
  removeMember: (memberId: number) => void;
}

// Define the MemberItem component
const MemberItem: React.FC<MemberItemProps> = ({ member, removeMember }) => {
  return (
    <motion.li
      key={member.memberId}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='px-2 py-4'>
      <div className='flex items-center justify-between space-x-4 rtl:space-x-reverse'>
        <p className='truncate text-base font-regular text-gray-800'>
          {member.memberName}
        </p>

        <Popover>
          <PopoverTrigger asChild>
            <div className='h-5 w-5 text-gray-400 cursor-pointer'>
              <svg
                className='fill-current'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                <g
                  id='SVGRepo_tracerCarrier'
                  strokeLinecap='round'
                  strokeLinejoin='round'></g>
                <g id='SVGRepo_iconCarrier'>
                  {' '}
                  <path
                    d='M5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10Z'
                    fill='#inherit'></path>
                  <path
                    d='M12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z'
                    fill='#inherit'></path>{' '}
                  <path
                    d='M21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12Z'
                    fill='#inherit'></path>{' '}
                </g>
              </svg>{' '}
            </div>
          </PopoverTrigger>
          <PopoverContent className='w-80'>
            <div className='grid gap-4'>
              <p className='text-sm'>Editar nombre</p>
              <div className='flex gap-2'>
                <input
                  id='width'
                  className='col-span-2 h-10 pl-2 w-full outline-none border border-gray-300 rounded-md'
                />
                <button
                  className={` text-sm rounded-md bg-green-100 px-3  text-green-700 font-light cursor-pointer`}>
                  <svg
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    stroke='currentColor'
                    className='size-5'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='m4.5 12.75 6 6 9-13.5'
                    />
                  </svg>
                </button>
              </div>
              <button
                className={`w-full text-sm rounded-md mt-2 bg-red-100 px-2 py-2 text-red-500 cursor-pointer`}>
                Eliminar de la lista
              </button>
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
