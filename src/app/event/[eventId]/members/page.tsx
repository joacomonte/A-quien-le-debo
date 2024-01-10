import UserList from "@/app/event/[eventId]/members/_components/MembersList";
import { Suspense } from "react";

type Params = {
  params: {
    eventId: string;
  };
};

export default async function Page({ params: { eventId } }: Params) {
  console.log("entrep");

  return (
    <div className=" h-[100vh] w-screen max-w-[500px] overflow-auto">
      <main className="flex h-full w-full flex-col items-start p-4">
        <h1 className="flex items-start self-start pb-4 pt-20 text-3xl font-bold">
          Miembros
        </h1>
        <div className="w-full overflow-y-auto rounded-lg border border-gray-200 bg-white px-3 shadow">
          <Suspense
            fallback={
              <ul role="list" className="divide-y divide-gray-200 ">
                <li className="py-3 ">
                  <div className="flex items-center space-x-4">
                    <p className="truncate text-sm font-medium text-gray-900 ">
                      Loading...
                    </p>
                  </div>
                </li>
              </ul>
            }
          >
            <UserList eventId={eventId} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
