import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

export default function Dashboard(){
        const [user, setUser] = useState<any>(null)
        
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
        
        return <div>
        Work in progress {JSON.stringify(user)}
    </div>
}