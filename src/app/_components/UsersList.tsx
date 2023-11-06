export default async function UserList({ id }: any) {
  async function fetchData(id: any) {
    const response = await fetch(
      `http://192.168.0.128:3000/api/event/${id}/users`,
      {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (result.status === "ok") return result.data.users;
  }

  const users = await fetchData(id);

  return (
    <>
      {users ? (
        <ul role="list" className="divide-y divide-gray-200 ">
          {users.map((user: any) => (
            <li key={user.userId} className="py-3 ">
              <div className="flex items-center space-x-4">
                <p className="text-sm font-medium text-gray-900 truncate ">
                  {user.userName}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </>
  );
}
