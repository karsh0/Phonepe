import { useState } from "react";
import { DownArrow } from "./ui/DownArrow";
import { UserIcon } from "./ui/UserIcon";
import { useNavigate } from "react-router-dom";


export function UserModal(){
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();
    return <div className="flex gap-8 items-center mr-5">
        <div className="rounded-full w-10 h-10 bg-gray-300 flex justify-center items-center cursor-pointer">
            <UserIcon/>
        </div>
        <div className="relative flex justify-center items-center cursor-pointer" onClick={()=>setToggle(!toggle)}>
            <DownArrow/>
            {
                toggle?                   
            <div className="absolute top-8">
            <ul className="flex flex-col bg-gray-200 rounded-sm">
                <li className="hover:bg-gray-300 px-5 py-2">Profile</li>
                <li className="hover:bg-gray-300 px-5 py-2" onClick={()=>{
                localStorage.setItem('token','')
                navigate('/signin')
                }}>SignOut</li>
            </ul>
        </div>: null
                
            }
        </div>
    </div>
}