import UserList from "@/app/event/[eventId]/users/_components/UsersList";
import { Suspense } from "react";

type Params = {
  params: {
    eventId: string;
  };
};

export default function Page({ params: { eventId } }: Params) {
  return (
    <div className=" h-[100vh] w-screen max-w-[500px] overflow-auto">
      <main className="flex h-full w-full flex-col items-start p-4">
        <h1 className="flex items-start self-start pb-4 pt-20 text-3xl font-bold">
          Proximamente
        </h1>
        {/* <div className="w-full h-full p-4 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow">
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
        </div> */}
      </main>
    </div>
  );
}
