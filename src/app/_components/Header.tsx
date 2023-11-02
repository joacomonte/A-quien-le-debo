export default async function Header({ id }: any) {
  const response = await fetch(`/api/event/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ eventId: id }),
  });

  const result = await response.json();
  const eventName = result.name;

  return (
    <div className="flex justify-center">
      {eventName && <h4 className="">The event name is: {eventName}</h4>}
    </div>
  );
}

Header.refetchInterval = null;
