import { Description, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import Link from "next/link";
import { FC, Fragment, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "sonner";

interface CustomDialogProps {
  isOpen: boolean;
  eventIdProp: string;
}

export const CustomDialog: FC<CustomDialogProps> = ({
  isOpen,
  eventIdProp,
}) => {
  const linkToCopy: string = `${process.env.BASE_URL}/event/${eventIdProp}/spendings`;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900"
                >
                  Event created! Please save the link.
                </DialogTitle>
                <div className="mt-2">
                  {/* <p className="text-sm text-gray-500">
                  The ID of <b className="text-blue-600 ">{response}</b> is:{" "}
                  {eventId}
                </p> */}
                </div>
                <Description className="py-4 pb-4 text-sm text-gray-500">
                  Make sure to keep the provided link for easy access to the
                  event in the future.
                </Description>

                <div className="mt-4 flex w-full items-center justify-between">
                  <CopyToClipboard
                    text={linkToCopy}
                    onCopy={(text: string, bool: boolean) => {
                      bool
                        ? toast.success("Link copied!")
                        : toast.error("Ups!, copy link manually please");
                    }}
                  >
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 "
                    >
                      Copy link
                    </button>
                  </CopyToClipboard>

                  <Link href={`/event/${eventIdProp}/members`}>
                    <button
                      type="button"
                      className="border-grey-800 text-grey-900 inline-flex justify-center rounded-md border bg-transparent px-4 py-2 text-sm font-medium hover:bg-gray-100 focus:outline-none focus-visible:ring-2"
                    >
                      Continue
                    </button>
                  </Link>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
