'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const paths = pathname.split('/');
  const eventId = paths[2] ? paths[2] : null; // Check if the index exists
  const currentPage = paths[3] ? paths[3] : null; // Check if the index exists

  {
    /* {latestPathWord && <p>Current pathname: {latestPathWord}</p>} */
  }
  return (
    <div className="absolute bottom-0 mb-5 h-20 rounded-full bg-[#bbbbbb07] shadow-[0_3px_10px_rgb(0,0,0,0.2)] backdrop-blur-sm">
      <div className="flex h-full items-center justify-center">
        <Link className="group inline-flex flex-col items-center justify-center rounded-full px-10 font-medium dark:hover:bg-gray-800" href={`/event/${eventId}/spendings`}>
          <div>
            <svg className={`mb-1 mt-1 fill-current group-hover:text-blue-500 ${currentPage === 'spendings' ? 'text-blue-500' : 'text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" height="1.4em" viewBox="0 0 400 512">
              <path d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8V488c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 352c0 8.8 7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z" />{' '}
            </svg>
          </div>

          <span className={`text-[0.7em] text-gray-500 group-hover:text-blue-500 dark:text-gray-400 ${currentPage === 'spendings' ? 'text-blue-500' : ''}`}>Gastos</span>
        </Link>
        <Link className="group inline-flex flex-col items-center justify-center rounded-full px-10 font-medium dark:hover:bg-gray-800" href={`/event/${eventId}/members`}>
          <div>
            <svg className={`mb-1 mt-1 fill-current group-hover:text-blue-500 ${currentPage === 'members' ? 'text-blue-500' : 'text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" height="1.4em" viewBox="0 0 640 512">
              <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
            </svg>
          </div>

          <span className={`text-[0.7em] group-hover:text-blue-500 ${currentPage === 'users' ? 'text-blue-500' : 'text-gray-500'}`}>Miembros</span>
        </Link>
        <Link className="group inline-flex flex-col items-center justify-center rounded-full px-10 font-medium dark:hover:bg-gray-800" href={`/event/${eventId}/pay-to`}>
          <div>
            <svg className={`mb-1 mt-1 fill-current group-hover:text-blue-500 ${currentPage === 'pay-to' ? 'text-blue-500' : 'text-gray-500'}`} height="1.4em" viewBox="0 -0.5 17 17" role="img">
              <g stroke="none" strokeWidth="1" fill="inherit" fillRule="inherit">
                <g transform="translate(1.000000, 0.000000)" className="cls-1">
                  <ellipse cx="12.473" cy="5.973" rx="3.473" ry="1.973" />
                  <path d="M12.525,9.081 C10.041,9.081 9.052,8.04 9.052,7.437 L9.052,10.02 C9.052,11.11 10.607,11.992 12.525,11.992 C14.445,11.992 16,11.11 16,10.02 L16,7.499 C16,8.103 15.01,9.081 12.525,9.081 L12.525,9.081 Z" />
                  <path d="M12.525,13.072 C10.303,13.072 9.052,12.071 9.052,11.468 L9.052,14.027 C9.052,15.117 10.607,16 12.525,16 C14.445,16 16,15.117 16,14.027 L16,11.437 C16,12.04 14.748,13.072 12.525,13.072 L12.525,13.072 Z" />
                  <ellipse cx="3.937" cy="1.973" rx="3.937" ry="1.973" />
                  <path d="M4.062,5.081 C1.247,5.081 0.125,4.04 0.125,3.437 L0.125,6.02 C0.125,7.11 1.888,7.992 4.062,7.992 C6.238,7.992 8,7.11 8,6.02 L8,3.499 C8,4.103 6.877,5.081 4.062,5.081 L4.062,5.081 Z" />
                  <path d="M4.062,9.072 C1.543,9.072 0.125,8.071 0.125,7.468 L0.125,10.027 C0.125,11.117 1.888,12 4.062,12 C6.238,12 8,11.117 8,10.027 L8,7.437 C8,8.04 6.58,9.072 4.062,9.072 L4.062,9.072 Z" />
                  <path d="M4.062,13.072 C1.543,13.072 0.125,12.071 0.125,11.468 L0.125,14.027 C0.125,15.117 1.888,16 4.062,16 C6.238,16 8,15.117 8,14.027 L8,11.437 C8,12.04 6.58,13.072 4.062,13.072 L4.062,13.072 Z" />
                </g>
              </g>
            </svg>
          </div>
          <span className={`text-[0.7em] text-gray-500 group-hover:text-blue-500 dark:text-gray-400 ${currentPage === 'pay-to' ? 'text-blue-500' : ''}`}>Balance</span>
        </Link>
      </div>
    </div>
  );
}
