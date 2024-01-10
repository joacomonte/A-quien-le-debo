"use client";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdPersonRemove } from "react-icons/md";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { motion } from "framer-motion";

export default function MembersList({ eventId }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const inputRef = useRef<any>();
  const [membersList, setMemberList] = useState<Member[] | null>(null);

  useEffect(() => {
    getAllMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getAllMembers() {
    const response = await fetch(`/api/event/${eventId}/members`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseBody: ApiResponse<Member[]> = await response.json();
    if (responseBody.status === "ok") {
      setMemberList(responseBody.data);
    }
  }

  // TODO relplace with useOptimistic hook
  // Creates the member locally with a temp name 'adding+name' the gets the data from the db and updates
  async function addMember(name: string) {
    if (membersList) {
      setMemberList([
        ...membersList,
        {
          memberId: 0,
          memberName: `adding ${name}`,
        },
      ]);
    }

    await fetch(`/api/event/${eventId}/members`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberName: name,
      }),
    });
    getAllMembers();
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setNewName(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation;
    // setUsersList((prevUsersList) => [...prevUsersList, newName]);
    setNewName("");
    inputRef.current.focus();
    addMember(newName);
  };

  const cancelSubmit = () => {
    setIsEditing(false);
    setNewName("");
  };

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
          <li
            className="px-2 py-5 "
            onClick={!isEditing ? handleEdit : undefined}
          >
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {isEditing ? (
                <>
                  <input
                    value={newName}
                    ref={inputRef}
                    onChange={handleChange}
                    onBlur={cancelSubmit}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="w-full truncate border-none py-2 text-sm font-medium text-gray-500 outline-none"
                  />
                  {newName.length > 2 ? (
                    <button
                      onMouseDown={handleSubmit}
                      type="submit"
                      className="whitespace-nowrap rounded-lg bg-green-700 px-5 py-2 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
                    >
                      Add
                    </button>
                  ) : (
                    <button
                      disabled
                      className="whitespace-nowrap rounded-lg bg-gray-100 px-3 py-2 text-center text-xs font-medium text-gray-800"
                    >
                      Too short
                    </button>
                  )}
                </>
              ) : (
                <MdOutlineAddCircleOutline
                  className="cursor-pointer fill-green-500"
                  size={22}
                />
              )}
            </div>
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
        <p className="truncate text-base font-medium text-gray-900">
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
