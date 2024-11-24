import UserList from "@/app/event/[eventId]/members/_components/MembersList";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{ eventId: string }>
};

export default async function Page({ params }: PageProps) {
  
  const { eventId } = await params;

  return (
    <div className=" h-[100vh] w-screen max-w-[500px] overflow-auto">
      <main className="flex h-full w-full flex-col items-start p-4">
        <h1 className="flex items-start self-start pb-6 pt-8 text-4xl font-thin">
          Miembros
        </h1>
        <div className="w-full overflow-y-auto rounded-lg border border-gray-200 bg-white px-3 shadow">
          {/* <Suspense
            fallback={
              <ul role="list" className="divide-y divide-gray-200 ">
                <li className="px-2 py-5">
                  <div className="flex items-center space-x-4">
                    <p className="truncate text-sm font-medium text-gray-900 ">
                      Loading...
                    </p>
                  </div>
                </li>
              </ul>
            }
          > */}
          <UserList eventId={eventId} />

          {/* </Suspense> */}
        </div>
        <div className="mb-[100px]"> </div>
      </main>
    </div>
  );
}
