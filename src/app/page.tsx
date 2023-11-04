"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import { Fragment, SetStateAction, useState } from "react";

import { FcMindMap } from "react-icons/fc";

export default function Home() {
  const [inputEventName, setInputEventName] = useState<any>("");
  const [inputUserName, setInputUserName] = useState<any>("");
  const [response, setResponse] = useState<string>("");
  const [eventId, setEventId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!inputEventName) {
      alert("esta vacio tonto");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/new-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventName: inputEventName,
          userName: inputUserName,
        }),
      });

      const responseBody = await response.json();

      if (responseBody.status !== "ok") {
        alert(responseBody.msg);
        return;
      }
      setIsOpen(true);

      setResponse(responseBody.eventName);

      setEventId(responseBody.eventId);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  function copyToClipboard(): void {
    // navigator.clipboard.writeText(eventId);
    navigator.clipboard.writeText(`http://localhost:3000/event/${eventId}`);
    toast.success("Link copied!");
  }

  return (
    <>
      <header className="relative flex items-center max-w-[500px] justify-start w-full h-12 gap-3 px-4 text-left bg-slate-100">
        <FcMindMap size={30} />{" "}
        <h2 className="font-semibold"> A quien le debo?</h2>
      </header>
      <div className=" w-screen h-full max-w-[500px] max-h-[700px] pb-6">
        <main className="flex flex-col items-start w-full h-full px-6">
          <h1 className="flex items-start self-start pt-8 text-3xl pb-14">
            New event
          </h1>
          {!response && (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-between w-full h-full"
            >
              <div className="flex flex-col w-full gap-4">
                <div className="w-full">
                  <label
                    htmlFor="helper-text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Event Name
                  </label>
                  <input
                    type="text"
                    id="inputField"
                    name="event name"
                    value={inputEventName}
                    maxLength={20}
                    minLength={3}
                    onChange={(event) => setInputEventName(event.target.value)}
                    required
                    onInvalid={(e) => {
                      const target = e.target as HTMLInputElement;
                      if (target.value.length === 0) {
                        target.setCustomValidity("Must provide a name");
                      } else if (
                        target.value.length > 0 &&
                        target.value.length < 3
                      ) {
                        target.setCustomValidity(`Name too short`);
                      } else {
                        target.setCustomValidity("");
                      }
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></input>
                  <label
                    id="helper-text-explanation"
                    className="text-xs text-gray-500 text dark:text-gray-400"
                  >
                    15 characters maximum .
                  </label>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="helper-text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your nickname
                  </label>
                  <input
                    type="text"
                    id="inputField"
                    name="User name"
                    value={inputUserName}
                    maxLength={20}
                    onChange={(input) => setInputUserName(input.target.value)}
                    required
                    onInvalid={(e) => {
                      const target = e.target as HTMLInputElement;
                      if (target.value.length === 0) {
                        target.setCustomValidity("Must provide a name");
                      } else {
                        target.setCustomValidity("");
                      }
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></input>
                </div>
              </div>
              {!isLoading ? (
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                  Create
                </button>
              ) : (
                <button
                  disabled
                  type="button"
                  className=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center justify-center"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
                </button>
              )}
            </form>
          )}

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {}}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-full p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-6 text-gray-900"
                      >
                        Event created! Please save the link.
                      </Dialog.Title>
                      <div className="mt-2">
                        {/* <p className="text-sm text-gray-500">
                      The ID of <b className="text-blue-600 ">{response}</b> is:{" "}
                      {eventId}
                    </p> */}
                      </div>
                      <Dialog.Description className="py-4 pb-4 text-sm text-gray-500">
                        Make sure to keep the provided link for easy access to
                        the event in the future.
                      </Dialog.Description>

                      <div className="flex items-center justify-between w-full mt-4">
                        <button
                          onClick={copyToClipboard}
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 "
                        >
                          Copy link
                        </button>

                        <Link href={`/event/${eventId}`}>
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-transparent border rounded-md border-grey-800 text-grey-900 hover:bg-gray-100 focus:outline-none focus-visible:ring-2"
                          >
                            Continue
                          </button>
                        </Link>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
          <Toaster richColors />
        </main>
      </div>
    </>
  );
}
