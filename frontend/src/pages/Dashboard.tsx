import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import { OpenAccount } from "../components/OpenAccount";
import { Button } from "../components/Button";
import { Logo } from "../components/Logo";
import { UserModal } from "../components/UserModal";
import { OpenAccountModal } from "../components/OpenAccountModal";
import { AccountCard } from "../components/AccountCard";

interface Account {
  accountName: string;
  accountType: string;
  accountNumber: number;
  balance: number;
  _id: string;
}

interface DashboardResponse {
  user: Account[];
  message: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<Account[]>([]);
  const [AccountToggle, setAccountToggle] = useState(false);

  useEffect(() => {
    async function main() {
      try {
        const response = await axios.get<DashboardResponse>(
          `${BACKEND_URL}/user/dashboard`,
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );
        setUser(response.data.user);
        console.log(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    main();
  }, [AccountToggle]);

  return (
    <div className="w-screen relative">
      <OpenAccountModal
        toggle={AccountToggle}
        setToggle={setAccountToggle} 
      />
      <div className="w-screen px-10 py-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Logo />
          <UserModal />
        </div>
        <div className="flex">
          <div className="w-1/4 py-10">
            <Button text="Send Money" variant="primary" />
            <ul className="flex flex-col gap-4 px-10 mt-8">
              <li className="text-xl font-semibold">Home</li>
              <li className="text-xl font-semibold">Cards</li>
              <li className="text-xl font-semibold">Manage</li>
              <li className="text-xl font-semibold">Earn</li>
            </ul>
          </div>
          <div>
            <h1 className="text-3xl font-semibold mb-5">Account</h1>
            <div className="flex gap-4"> 
            <div onClick={() => setAccountToggle(true)}>
              <OpenAccount />
            </div>
            <div className="flex gap-4 flex-wrap">
              {user && user.length > 0 ? (
                user.map((x, index) => (
                  <AccountCard
                    key={index}
                    accountName={x.accountName}
                    accountType={x.accountType}
                  />
                ))
              ) : (
                <p className="text-lg font-medium text-gray-500">
                  No accounts found.
                </p>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
