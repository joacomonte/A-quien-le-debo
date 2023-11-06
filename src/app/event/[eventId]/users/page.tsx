import UserList from "@/app/_components/UsersList";
import { Suspense } from "react";

type Params = {
  params: {
    eventId: string;
  };
};

export default function Page({ params: { eventId } }: Params) {
  return (
    <div className=" w-screen h-full max-w-[500px] pb-14 px-4">
      <main className="flex flex-col items-start w-full h-full pb-4">
        <h1 className="flex items-start self-start pt-8 text-3xl pb-14">
          Members
        </h1>
        <div className="w-full h-full p-4 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow">
          <Suspense
            fallback={
              <ul role="list" className="divide-y divide-gray-200 ">
                <li className="py-3 ">
                  <div className="flex items-center space-x-4">
                    <p className="text-sm font-medium text-gray-900 truncate ">
                      Loading...
                    </p>
                  </div>
                </li>
              </ul>
            }
          >
            <UserList id={eventId} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
