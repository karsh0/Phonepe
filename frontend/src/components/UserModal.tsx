import { useState } from "react";
import { DownArrow } from "./ui/DownArrow";
import { UserIcon } from "./ui/UserIcon";


export function UserModal(){
    const [toggle, setToggle] = useState(false);
    return <div className="flex gap-4 items-center mr-5">
        <div className="rounded-full w-10 h-10 bg-gray-300 flex justify-center items-center cursor-pointer">
            <UserIcon/>
        </div>
        <div className="relative flex justify-center items-center cursor-pointer" onClick={()=>setToggle(!toggle)}>
            <DownArrow/>
            {
                toggle?                   
            <div className="absolute top-8">
            <ul className="flex flex-col bg-gray-300 rounded-sm">
                <li className="hover:bg-gray-400 px-3 py-2">Profile</li>
                <li className="hover:bg-gray-400 px-3 py-2">SignOut</li>
            </ul>
        </div>: null
                
            }
        </div>
    </div>
}