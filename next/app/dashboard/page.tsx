import getUsers from '../api/user';

export default async function Dashboard() {
  const users = await getUsers();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-(family-name:--font-geist-sans) text-[#333333]">
        Users
      </h1>
      <ol className="list-decimal list-inside font-(family-name:--font-geist-sans)">
        {users.map(user => (
          <li key={user.id} className="mb-2">
            {user.name} {user.email}
          </li>
        ))}
      </ol>
    </div>
  );
}
