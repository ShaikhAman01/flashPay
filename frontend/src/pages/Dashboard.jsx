import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <Appbar />
      <main className="flex-grow p-4">
        <Balance />
        <Users />
      </main>
    </div>
  )
}