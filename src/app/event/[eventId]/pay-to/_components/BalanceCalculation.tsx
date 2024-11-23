'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useEffect, useState } from 'react';

type Member = {
  memberName: string;
  memberId: number;
};

export default function BalanceCalculation(eventId: any) {
  // const [memberId, setMemberId] = useState('1398');
  const [memberIdSelected, setMemberIdSelected] = useState<string | null>(null);
  const [allMembers, setAllMembers] = useState<Member[] | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  const handleMemberSelect = (value: any) => {
    setMemberIdSelected(value);
  };

  useEffect(() => {
    const getMemberbalance = async () => {
      if (memberIdSelected) {
        try {
          const response = await fetch(`/api/event/${eventId.eventId}/members/${memberIdSelected}/balance`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const responseBody = await response.json();

          if (responseBody.message === 'OK') {
            setBalance(responseBody.data);
          }
        } catch (error) {
          console.error('Error fetching member data:', error);
        }
      }
    };
    getMemberbalance();
  }, [memberIdSelected]);

  useEffect(() => {
    async function getAllMembers() {
      const response = await fetch(`/api/event/${eventId.eventId}/members`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseBody: ApiResponse<Member[]> = await response.json();

      if (responseBody.message === 'OK') {
        setAllMembers(responseBody.data.map((member: Member) => member));
      }
    }
    getAllMembers();
  }, [eventId]);

  return (
    <>
      <Select onValueChange={handleMemberSelect}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Selecciona una persona" />
        </SelectTrigger>
        <SelectContent>
          {allMembers?.map((member) => (
            <SelectItem key={member.memberId} value={String(member.memberId)}>
              {member.memberName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <br></br>
      {balance ? <h1>Tu balance es: {balance}</h1> : <h1>Tu balance es: Selecciona una persona</h1>}
    </>
  );
}
