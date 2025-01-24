import { Contact } from "./Contact";

export function ContactSidebar({allUsers}:{allUsers: []}){
    return <div>
        <div className="w-80 h-full flex flex-col px-5 py-5 rounded-2xl gap-4 bg-gray-50 ">
        <span className="text-3xl font-semibold">Contacts</span>
           <div className="flex flex-col">
           {allUsers.map(x =>(
                <Contact user={x}/>
            ))}
           </div>
        </div>
    </div>
}