import axios from "axios";
import { Button } from "../components/Button";
import { UserIcon } from "../components/ui/UserIcon";
import { User } from "./contacts/ContactsPage";
import { BACKEND_URL } from "../config";
import { useRef } from "react";

export function SendMoneyModal({ onClose, selectedUser }: {onClose: ()=> void, selectedUser: User}) {

    const amountRef = useRef<HTMLInputElement | null>(null)
    async function sendMoney() {
        try {
            const amount = Number(amountRef.current?.value);
            
            // Validate amount before making request
            if (isNaN(amount) || amount <= 0) {
                alert("Enter a valid amount");
                return;
            }
    
            // API Request
            const response = await axios.post(
                `${BACKEND_URL}/account/transfer`,
                {
                    to: selectedUser.userId,
                    amount: amount
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("token") || "",
                    },
                }
            );
    
            // Log and alert success
            console.log("Transaction Successful:", response.data);
            alert("Payment successful");
    
            // Close the modal after successful transaction
            onClose();
        } catch (error) {
            console.log(error)
            alert("Transaction failed! Please try again.");
        }
    }
    

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col gap-4 w-72 p-4 bg-white rounded-xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold"
        >
          ✖
        </button>

         <div className="flex mt-4 mx-auto justify-center items-center w-10 h-10 rounded-full bg-gray-200">
         <UserIcon/>
         </div>
        <p className="text-center font-semibold text-xl">{selectedUser.username}</p>

        <div className="flex mx-20 justify-center items-center rounded-md px-3 py-2">
          <span className="mr-2 text-2xl font-semibold">₹</span>
          <input
            type="text"
            className="max-w-full outline-none bg-transparent text-4xl font-semibold"
            placeholder="00"
            ref={amountRef}
          />
        </div>

        <div className="text-center">
          <Button text="Pay" rounded={true}  onClick={sendMoney}/>
        </div>
      </div>
    </div>
  );
}
