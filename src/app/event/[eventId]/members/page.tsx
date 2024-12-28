import UserList from "@/app/event/[eventId]/members/_components/MembersList";

type PageProps = {
  params: Promise<{ eventId: string }>
};

export default async function Page({ params }: PageProps) {
  
  const { eventId } = await params;

  return (
    <div className=" h-[100vh] w-full overflow-auto ">
      <main className="flex h-full w-full flex-col items-start px-4">
        <h1 className="flex items-start self-start pb-6 pt-12 text-2xl">
          Miembros
        </h1>
        <div className="w-full overflow-y-auto bg-white scroll-fade ">
          <UserList eventId={eventId} />
        </div>
      </main>
    </div>
  );
}
