"use client";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdPersonRemove } from "react-icons/md";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { motion } from "framer-motion";

export default function UserList({ id }: any) {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const inputRef = useRef<any>();
  const [usersList, setUsersList] = useState<string[]>([
    "curcio",
    "tomi",
    "john",
  ]);

  // useEffect(() => {
  //   async function fetchData() {
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

  //     if (result.status === "ok") {
  //       setUsers(result.data.users);
  //     }
  //   }

  //   fetchData();
  // }, [id]);

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
    setUsersList((prevUsersList) => [...prevUsersList, newName]);
    setNewName("");
    inputRef.current.focus();
    console.log(inputRef.current);
  };

  const cancelSubmit = () => {
    setIsEditing(false);
    setNewName("");
  };

  return (
    <>
      {users ? (
        <ul role="list" className="divide-y divide-gray-200 ">
          {usersList.map((user: any, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="py-4 px-2 "
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <p className=" text-base font-medium text-gray-900 truncate ">
                  {user}
                </p>
                <FaUserEdit className="fill-slate-500 cursor-pointer" />
                <MdPersonRemove className="fill-red-500 cursor-pointer" />
                {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 "></div> */}
              </div>
            </motion.li>
          ))}
          <li
            className="py-5 px-2 "
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
                    className="text-sm font-medium text-gray-500 truncate border-none outline-none py-2 w-full"
                  />
                  {newName.length > 2 ? (
                    <button
                      onMouseDown={handleSubmit}
                      type="submit"
                      className="px-5 py-2 text-sm font-medium text-center whitespace-nowrap text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
                    >
                      Add
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-3 py-2 text-xs font-medium text-center whitespace-nowrap text-gray-800 bg-gray-100 rounded-lg"
                    >
                      Too short
                    </button>
                  )}
                </>
              ) : (
                <MdOutlineAddCircleOutline
                  className="fill-green-500 cursor-pointer"
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
