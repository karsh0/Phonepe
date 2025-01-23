import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import { OpenAccount } from "../components/OpenAccount";
import { Button } from "../components/Button";
import { Logo } from "../components/Logo";
import { UserModal } from "../components/UserModal";
import { OpenAccountModal } from "../components/OpenAccountModal";

export default function Dashboard(){
        const [user, setUser] = useState<any>(null)
        const [AccountToggle, setAccountToggle] = useState(false)

        interface DashboardResponse {
            userId: string;
            message: string;
        }
        
        useEffect(()=>{
            async function main(){
                const response = await axios.get<DashboardResponse>(BACKEND_URL+'/user/dashboard',{
                    headers:{
                        authorization: localStorage.getItem('token')
                    }
                })
                setUser(response.data.userId)
            }
            main()
        },[])
        
        return <div className="w-screen relative">
            <OpenAccountModal/>
            <div className="w-screen px-10 py-5 flex flex-col gap-4">
            <div className="flex justify-between items-center">
            <Logo/>
            <UserModal/>
            </div>
        <div className="flex gap-14">
            <div className="w-1/4 py-10">
                <Button text="Send Money" rounded={true} variant="primary"/>
                <ul className="flex flex-col gap-4 px-10 mt-8">
                    <li className="text-xl font-semibold">Home</li>
                    <li className="text-xl font-semibold">Cards</li>
                    <li className="text-xl font-semibold">Manage</li>
                    <li className="text-xl font-semibold">Earn</li>
                </ul>
            </div>
            <div>
                <h1 className="text-3xl font-semibold mb-5">Account</h1>
                <div onClick={()=> setAccountToggle(!AccountToggle)}>
                <OpenAccount />
                </div>
            </div>
        </div>
    </div>
        </div>
}