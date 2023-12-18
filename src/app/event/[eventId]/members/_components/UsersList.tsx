"use client";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdPersonRemove } from "react-icons/md";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { motion } from "framer-motion";

export default function UserList({ eventId }: any) {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const inputRef = useRef<any>();
  const [usersList, setUsersList] = useState<Members[]>([]);

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
    const responseBody: ApiResponse<Members[]> = await response.json();
    if (responseBody.status === "ok") {
      setUsersList(responseBody.data.map((member: Members) => member));
    }
  }

  async function addMember(name: string) {
    const response = await fetch(`/api/event/${eventId}/members`, {
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

  async function removeMember(memberId: number) {
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
      {usersList.length > 0 ? (
        <ul role="list" className="divide-y divide-gray-200 ">
          {usersList.map((user: Members, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="px-2 py-4 "
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <p className=" truncate text-base font-medium text-gray-900 ">
                  {user.memberName}
                </p>
                <FaUserEdit className="cursor-pointer fill-slate-500" />
                <MdPersonRemove
                  onClick={() => removeMember(user.memberId)}
                  className="cursor-pointer fill-red-500"
                />
                {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 "></div> */}
              </div>
            </motion.li>
          ))}
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
      ) : (
        <p>No users found.</p>
      )}
    </>
  );
}

{
  /* <div className="flex items-center space-x-4">
  <p className="text-sm font-medium text-gray-900 truncate ">
    {user.userName}
  </p>
  <p className="text-sm text-gray-500 truncate ">edit</p>
</div> */
}

// export default async function UserList({ id }: any) {
//   async function fetchData(id: any) {
//     const response = await fetch(
//       `http://192.168.0.128:3000/api/event/${id}/users`,
//       {
//         cache: "no-store",
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const result = await response.json();

//     if (result.status === "ok") return result.data.users;
//   }

//   const users = await fetchData(id);
