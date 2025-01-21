import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

export default function Dashboard(){
        const [user, setUser] = useState<any>(null)
        useEffect(()=>{
            axios.get(BACKEND_URL+'/user/dashboard').then(res => setUser(res.data))
        },[])
        
        return <div>
        Work in progress {JSON.stringify(user)}
    </div>
}