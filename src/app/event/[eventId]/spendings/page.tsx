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
    <div className="w-screen max-w-[500px] h-full">
      <main className="flex flex-col items-start w-full h-full ">
        {/* <h1 className="flex items-start self-start text-3xl">
          Gastos del evento
        </h1> */}

        <div className="w-full h-full overflow-y-auto bg-white border border-gray-200 rounded-lg shadow">
          <ul>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
