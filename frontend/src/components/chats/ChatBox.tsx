import { useRef, useState } from "react";
import { Button } from "../Button";
import { UserIcon } from "../ui/UserIcon";
import { User } from "../../pages/contacts/ContactsPage";
import { SendMoneyModal } from "../../pages/SendMoneyModal";

export function ChatBox({selectedUser, ws}:{selectedUser: User | null, ws:WebSocket | null}){
    if (!selectedUser) {
        return (
            <div className="w-full h-full flex justify-center items-center">
            <span className="text-lg font-semibold text-gray-500">
              Select a user to start chatting
            </span>
          </div>
        );
      }
      
      const messageRef = useRef<HTMLInputElement | null>(null)

      function sendMessage(){
        ws?.send(JSON.stringify({
          type: "SEND_MESSAGE",
          payload:{
            message: messageRef.current?.value,
            roomId: '679c9cf008beede68fc66714-679c9d1c08beede68fc66725'
          }
        }))
      }


      const [moneyModal, setMoneyModal] = useState(false)
      
    return <div className="w-full h-full flex flex-col justify-between p-5">
       <div className="flex gap-5 items-center px-3 cursor-pointer rounded-xl"           >
             <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
               <UserIcon />
             </div>
             <span className="text-xl font-semibold">{selectedUser.username}</span>
           </div>
        
        <div className="w-full flex gap-2 items-end ">
            <input type="text" placeholder="Start your chat here" className="w-2/3 px-3 py-3 border-black border-[1px] rounded-md" ref={messageRef} />
            <Button text="Send" onClick={sendMessage}/>
            <Button onClick={()=> setMoneyModal(true)} text="Pay Money" variant="primary"/>
        </div>

        {moneyModal && <SendMoneyModal selectedUser={selectedUser}  onClose={()=> setMoneyModal(false)}/>}
    </div>
}