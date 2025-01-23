import { useRef, useState } from "react";
import { LabelledInput } from "./LabelledInput";
import { Button } from "./Button";
import { CrossIcon } from "./ui/CrossIcon";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum AccountEnum {
  SAVING = "saving",
  CURRENT = "current",
  BUSINESS = "business",
}


export function OpenAccountModal({toggle,setToggle}: {toggle: boolean;setToggle: (value: boolean) => void;}) {

    async function handleCreateAccount() {
    try{
        const response = await axios.post(BACKEND_URL+'/account/create',  {
            accountName: AccountName,
            accountType: AccountType,
            password: passwordRef.current?.value
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
        if(response.data){
            setToggle(false)
        }
    }catch(err){
        console.log(err);
        alert('Please check your inputs')
    }

}

  const [AccountType, setAccountType] = useState<AccountEnum>(AccountEnum.SAVING);
  const [AccountName, setAccountName] = useState("SBI Bank");
  const passwordRef = useRef<HTMLInputElement>();

  return (
    toggle && (
      <div className="w-screen h-screen bg-[#5f259f] bg-opacity-60 fixed top-0 left-0 flex justify-center items-center">
        <div className="bg-gray-200 w-1/3 p-10 rounded-xl relative">
          <form className="flex flex-col gap-3">
            <div
              className="absolute top-5 right-10 cursor-pointer"
              onClick={() => setToggle(false)}
            >
              <CrossIcon />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xl font-semibold">Select Account</span>
              <select
                name=""
                onChange={(e) => setAccountName(e.target.value)}
                className="px-3 py-3 rounded-md"
              >
                <option value={"SBI Bank"}>State Bank of India</option>
                <option value={"Union Bank"}>Union Bank</option>
                <option value={"Kotak Bank"}>Kotak Bank</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xl font-semibold">Select Account Type</span>
              <select
                name=""
                onChange={(e) => setAccountType(e.target.value as AccountEnum)}
                className="px-3 py-3 rounded-md"
              >
                <option value={AccountEnum.SAVING}>Saving</option>
                <option value={AccountEnum.CURRENT}>Current</option>
                <option value={AccountEnum.BUSINESS}>Business</option>
              </select>
            </div>
            <LabelledInput
              label="Enter your Password"
              placeholder="Enter password"
              reference={passwordRef}
              className="text-xl font-semibold"
            />
            <Button text="Create Account" rounded={true} onClick={handleCreateAccount} />
          </form>
        </div>
      </div>
    )
  );
}
