import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBalance(Math.floor(response.data.balance));
      })
      .catch((error) => {
        console.error("Error fetching balance:", error);
      });
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <Appbar />
      <main className="flex-grow p-4">
        <Balance value={balance} />
        <Users />
      </main>
    </div>
  );
}
