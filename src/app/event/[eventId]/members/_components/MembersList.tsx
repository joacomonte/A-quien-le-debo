/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdPersonRemove } from "react-icons/md";
import { motion } from "framer-motion";
import AddMemberItem from "./AddMemberItem";

export default function MembersList({ eventId }: any) {
  const [membersList, setMemberList] = useState<Member[] | null>(null);

  useEffect(() => {
    getAllMembers();
  }, []);

  async function getAllMembers() {
    const response = await fetch(`/api/event/${eventId}/members`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseBody: ApiResponse<Member[]> = await response.json();
    if (responseBody.message === "OK") {
      setMemberList(responseBody.data);
    }
  }

  // TODO relplace with useOptimistic hook
  // Creates the member locally with a temp name 'deleting+name' the gets the data from the db and updates
  async function removeMember(memberId: number) {
    const updatedList: any = membersList?.map((user) =>
      user.memberId === memberId
        ? { ...user, memberName: "Deleting..." }
        : user,
    );
    setMemberList(updatedList);

    const response = await fetch(`/api/event/${eventId}/members`, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
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
          {!membersList.length && (
            <p className="px-2 py-5">
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
  removeMember: (memberId: number) => void; // Adjust the type of memberId if necessary
}

// Define the MemberItem component
const MemberItem: React.FC<MemberItemProps> = ({ member, removeMember }) => {
  return (
    <motion.li
      key={member.memberId} // It's better to use a unique id than index for key
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-2 py-4"
    >
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <p className="truncate text-base font-thin text-gray-800">
          {member.memberName}
        </p>
        <FaUserEdit className="cursor-pointer fill-slate-500" />
        <MdPersonRemove
          onClick={() => removeMember(member.memberId)}
          className="cursor-pointer fill-red-500"
        />
      </div>
    </motion.li>
  );
};
