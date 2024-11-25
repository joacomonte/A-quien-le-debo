import { Description, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import Link from 'next/link';
import { FC, Fragment } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast, Toaster } from 'sonner';
import Image from 'next/image';

interface CustomDialogProps {
  isOpen: boolean;
  eventIdProp: string;
}

export const CustomDialog: FC<CustomDialogProps> = ({ isOpen, eventIdProp }) => {
  const linkToCopy: string = `${process.env.BASE_URL}/event/${eventIdProp}/spendings`;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Image className="mx-auto pt-2 pb-6" src="/icon_event_created.png" alt="Event Created Icon" width={80} height={80} />

                <DialogTitle as="h3" className="text-xl text-center font-medium leading-6 text-gray-900">
                  <p>Evento creado! </p>
                  <p>Por favor guardá el link.</p>
                </DialogTitle>
                <div className="mt-2">
                  {/* <p className="text-sm text-gray-500">
                  The ID of <b className="text-blue-600 ">{response}</b> is:{" "}
                  {eventId}
                </p> */}
                </div>
                <Description className="py-4 pb-4 text-sm text-center text-gray-500">Guardá el link para poder volver a entrar al evento mas tarde.</Description>

                <div className="mt-4 flex w-full items-center justify-between">
                  <CopyToClipboard
                    text={linkToCopy}
                    onCopy={(text: string, bool: boolean) => {
                      bool ? toast.success('Link copiado :)') : toast.error('Ups!, un error. Copialo manualmente');
                    }}
                  >
                    <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 ">
                      Copiar link
                    </button>
                  </CopyToClipboard>

                  <Link href={`/event/${eventIdProp}/members`}>
                    <button type="button" className="border-grey-800 text-grey-900 inline-flex justify-center rounded-md border bg-transparent px-4 py-2 text-sm font-medium hover:bg-gray-100 focus:outline-none focus-visible:ring-2">
                      Ir al evento
                    </button>
                  </Link>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
      <Toaster
        richColors
        position="top-center"
        duration={1200}
        toastOptions={{
          style: {
            fontSize: '1.1rem', // Increase font size

          },
        }}
      />
    </Transition>
  );
};
