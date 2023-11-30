"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const paths = pathname.split("/");
  const eventId = paths[2] ? paths[2] : null; // Check if the index exists
  const currentPage = paths[3] ? paths[3] : null; // Check if the index exists
  console.log(currentPage);

  {
    /* {latestPathWord && <p>Current pathname: {latestPathWord}</p>} */
  }
  return (
    <div className="h-max-16 z-10 h-16 w-full max-w-[500px] border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700">
      <div className="mx-auto grid h-full max-w-lg grid-cols-3">
        <Link
          className="group inline-flex flex-col items-center justify-center px-5 font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
          href={`/event/${eventId}/spendings`}
        >
          <div>
            <svg
              className={`mb-1 mt-1 fill-current group-hover:text-blue-500 ${
                currentPage === "spendings" ? "text-blue-500" : "text-gray-500"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              height="1.4em"
              viewBox="0 0 400 512"
            >
              <path d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8V488c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 352c0 8.8 7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z" />{" "}
            </svg>
          </div>

          <span
            className={`text-[0.5em] text-gray-500 group-hover:text-blue-500 dark:text-gray-400 ${
              currentPage === "spendings" ? "text-blue-500" : ""
            }`}
          >
            Spendings
          </span>
        </Link>

        <Link
          className="group inline-flex flex-col items-center justify-center px-5 font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
          href={`/event/${eventId}/users`}
        >
          <div>
            <svg
              className={`mb-1 mt-1 fill-current group-hover:text-blue-500 ${
                currentPage === "users" ? "text-blue-500" : "text-gray-500"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              height="1.4em"
              viewBox="0 0 640 512"
            >
              <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
            </svg>
          </div>

          <span
            className={`text-[0.5em] group-hover:text-blue-500 ${
              currentPage === "users" ? "text-blue-500" : "text-gray-500"
            }`}
          >
            Members
          </span>
        </Link>

        <Link
          className="group inline-flex flex-col items-center justify-center px-5 font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
          href={`/event/${eventId}/pay-to`}
        >
          <div>
            <svg
              className={`mb-1 mt-1 fill-current group-hover:text-blue-500 ${
                currentPage === "pay-to" ? "text-blue-500" : "text-gray-500"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              height="1.4em"
            >
              <path d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l44.9 74.7c-16.1 17.6-28.6 38.5-36.6 61.5c-1.9-1.8-3.5-3.9-4.9-6.3L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152zM432 224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm0 240a24 24 0 1 0 0-48 24 24 0 1 0 0 48zM368 321.6V328c0 8.8 7.2 16 16 16s16-7.2 16-16v-6.4c0-5.3 4.3-9.6 9.6-9.6h40.5c7.7 0 13.9 6.2 13.9 13.9c0 5.2-2.9 9.9-7.4 12.3l-32 16.8c-5.3 2.8-8.6 8.2-8.6 14.2V384c0 8.8 7.2 16 16 16s16-7.2 16-16v-5.1l23.5-12.3c15.1-7.9 24.5-23.6 24.5-40.6c0-25.4-20.6-45.9-45.9-45.9H409.6c-23 0-41.6 18.6-41.6 41.6z" />
            </svg>
          </div>
          <span
            className={`text-[0.5em] text-gray-500 group-hover:text-blue-500 dark:text-gray-400 ${
              currentPage === "pay-to" ? "text-blue-500" : ""
            }`}
          >
            Pay to?
          </span>
        </Link>
      </div>
    </div>
  );
}
