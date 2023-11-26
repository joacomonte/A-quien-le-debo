"use client";
import { SetStateAction, useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdPersonRemove } from "react-icons/md";
import { MdOutlineAddCircleOutline } from "react-icons/md";

export default function UserList({ id }: any) {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [usersList, setUsersList] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://192.168.0.128:3000/api/event/${id}/users`,
        {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (result.status === "ok") {
        setUsers(result.data.users);
      }
    }

    fetchData();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setNewName(e.target.value);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    alert(`se creo ${newName}`);
    setIsEditing(false);
    setNewName(""); // Reset the newName state
  };

  const cancelSubmit = () => {
    setIsEditing(false);
    setNewName(""); // Reset the newName state
  };

  return (
    <>
      {users ? (
        <ul role="list" className="divide-y divide-gray-200 ">
          {users.map((user: any) => (
            <li key={user.userId} className="py-2 ">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <p className="text-sm font-medium text-gray-900 truncate ">
                  {user.userName}
                </p>
                <FaUserEdit className="fill-slate-500 cursor-pointer" />
                <MdPersonRemove className="fill-red-500 cursor-pointer" />
                {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 "></div> */}
              </div>
            </li>
          ))}
          <li className="py-2" onClick={!isEditing ? handleEdit : undefined}>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={newName}
                    onChange={handleChange}
                    onBlur={cancelSubmit}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    size={newName.length || 1}
                    className="text-sm font-medium text-gray-500 truncate border-none outline-none w-auto"
                  />
                  <MdOutlineAddCircleOutline
                    className="fill-green-800 cursor-pointer"
                    onClick={handleSubmit}
                  />
                  <p className="text-[12px] font-medium text-gray-500">enter</p>
                </>
              ) : (
                <p className="text-sm font-medium text-gray-500 truncate">
                  Input new member
                </p>
              )}

              {/* Conditional rendering for other elements */}
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
