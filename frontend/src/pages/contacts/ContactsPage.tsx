import { useEffect, useState } from "react";
import { ContactSidebar } from "../../components/contacts/ContactSidebar";
import { Logo } from "../../components/Logo";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatBox } from "../../components/chats/ChatBox";

interface Contact{
    username: string
}

interface ContactResponse{
    users: Contact[]
}

export function ContactPage(){
    const [allUsers, setAllUsers] = useState<any>([])

    useEffect(()=>{
        axios.get<ContactResponse>(BACKEND_URL+'/user/bulk',{
        }).then((response) => setAllUsers(response.data.users))
    },[])

    return <div className="w-screen h-screen px-10 py-5 flex flex-col gap-4">
        <Logo/>
        <div className="w-full h-full flex justify-between">
        <ContactSidebar allUsers={allUsers}/>
        <ChatBox/>
        </div>
    </div>
}