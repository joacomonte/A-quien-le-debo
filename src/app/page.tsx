'use client';

import { ibm } from '@/app/fonts'
import { useState } from 'react';
import { FcMindMap } from 'react-icons/fc';
import { CustomDialog } from './_globalComponents/CustomDialog';
import Image from 'next/image';

export default function Home() {
  const [inputEventName, setInputEventName] = useState<any>('');
  const [inputUserName, setInputUserName] = useState<any>('');
  const [eventId, setEventId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!inputEventName) {
      alert('esta vacio tonto');
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.BASE_URL}/api/new-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName: inputEventName,
          userName: inputUserName,
        }),
      });
      const responseBody: ApiResponse<EventAndMemberResponse> = await response.json();
      setIsDialogOpen(true);
      setEventId(responseBody.data.eventId);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="relative flex h-12 w-full items-center justify-start gap-3 bg-slate-100 text-left">
      <Image src="/diosito.png" alt="Event Created Icon" width={18} height={40} />

      <h2 className="font-medium">Paga Diosito</h2>
      </header>
      <div className=" h-full w-full pb-6">
        <main className="flex h-full w-full flex-col items-start px-6">
          <h1 className="flex items-start self-start pb-14 pt-8 text-3xl">Nuevo Evento</h1>
          <form onSubmit={handleSubmit} className="flex h-full w-full flex-col justify-between">
            <div className="flex w-full flex-col gap-4">
              <div className="w-full">
                <label htmlFor="helper-text" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Nombre del evento
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
                      target.setCustomValidity('Must provide a name');
                    } else if (target.value.length > 0 && target.value.length < 3) {
                      target.setCustomValidity(`Name too short`);
                    } else {
                      target.setCustomValidity('');
                    }
                  }}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                ></input>
                <label id="helper-text-explanation" className="text text-xs text-gray-500 dark:text-gray-400">
                  15 caracteres máximo. .
                </label>
              </div>
              <div className="w-full">
                <label htmlFor="helper-text" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Tu apodo
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
                      target.setCustomValidity('Must provide a name');
                    } else {
                      target.setCustomValidity('');
                    }
                  }}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                ></input>
              </div>
            </div>
            {!isLoading ? (
              <button
              type="submit"
              className={`w-full rounded-xl bg-blue-500 px-4 py-4 text-white cursor-pointer hover:bg-blue-700 shadow-lg`}
            >
              Crear evento
            </button>
            ) : (
              <button disabled type="button" className=" mr-2 inline-flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg aria-hidden="true" role="status" className="mr-3 inline h-4 w-4 animate-spin text-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Cargando...
              </button>
            )}
          </form>
          <CustomDialog isOpen={isDialogOpen} eventIdProp={eventId} />
        </main>
      </div>
    </>
  );
}
