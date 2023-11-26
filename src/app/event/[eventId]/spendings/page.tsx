import UserList from "@/app/_components/UsersList";
import { Suspense } from "react";

type Params = {
  params: {
    eventId: string;
  };
};
// h-[calc(100%-300px)]
export default function Page({ params: { eventId } }: Params) {
  return (
    <div className=" overflow-auto w-screen max-w-[500px] h-[100vh]">
      <main className="flex flex-col items-start w-full h-full ">
        <h1 className="flex items-start font-bold self-start pt-20 pb-4 text-3xl">
          Gastos del evento
        </h1>

        {/* <div className="w-full h-14 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow">
          <ul>
            <li>hola</li>
            <li>hola</li>
          </ul>
        </div> */}
      </main>
    </div>
  );
}

{
  /* <li key={user.userId} className="py-2 ">
<div className="flex items-center space-x-4 rtl:space-x-reverse">
  <div className="flex-1 min-w-0">
    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
      {user.userName}
    </p>
    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
      Compro carne
    </p>
  </div>
  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
    <FaUserEdit />
  </div>
</div>
</li> */
}
