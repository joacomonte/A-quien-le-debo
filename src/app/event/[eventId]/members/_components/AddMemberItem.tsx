"use client";

import { SetStateAction, useRef, useState } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { Toaster, toast } from "sonner";
import { motion, useAnimation } from "framer-motion";

interface AddMemberItemProps {
  eventId: string;
  onListUpdate: () => void;
}

export default function AddMemberItem({
  eventId,
  onListUpdate,
}: AddMemberItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [newName, setNewName] = useState("");

  const inputRef = useRef<any>();

  const divAnimation = useAnimation();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const shakeAnimation = {
    x: [-10, 10, -10, 5, -3, 3, 0],
    transition: {
      duration: 0.7,
    },
  };

  const handleClick = () => {
    divAnimation.start(shakeAnimation);
  };

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setNewName(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const validateName = (name: string): boolean => {
    if (name.length < 3) {
      handleClick();
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation;
    inputRef.current.focus();
    if (validateName(newName)) {
      addMember(newName);
    }
  };

  const cancelSubmit = () => {
    setIsEditing(false);
    setNewName("");
  };

  async function addMember(name: string) {
    try {
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
      const resJSON = await response.json();

      if (resJSON.status === "Duplicated") {
        toast.warning(`Member ${name} already exists`);
      } else if (resJSON.status === "OK") {
        onListUpdate();
        setNewName("");
      } else {
        toast.error(resJSON.message);
      }
    } catch (error) {
      toast.error("Server failed :(... try later please");
      console.error("Error adding member:", error);
    }
  }

  return (
    <div
      className="flex h-[36px] items-center space-x-1 hover:cursor-pointer rtl:space-x-reverse"
      onClick={!isEditing ? handleEdit : undefined}
    >
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
              className="whitespace-nowrap rounded-lg bg-green-300 px-5 py-2 text-center text-sm font-medium text-gray-700 hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-green-400"
            >
              Add
            </button>
          ) : (
            <motion.button
              disabled
              animate={divAnimation}
              whileTap={{ scale: 0.9 }}
              className="whitespace-nowrap rounded-lg bg-gray-100 px-3 py-2 text-center text-xs font-medium text-gray-800"
            >
              Too short
            </motion.button>
          )}
        </>
      ) : (
        <MdOutlineAddCircleOutline
          className="transform cursor-pointer fill-green-500 transition-transform hover:scale-110"
          size={22}
        />
      )}
      <Toaster richColors position="top-center" />
    </div>
  );
}
