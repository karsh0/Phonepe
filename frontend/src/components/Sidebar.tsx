import { Link } from "react-router-dom";

export function Sidebar(){
    return <div className="w-1/4 py-10">
                <ul className="flex flex-col gap-4 px-10 mt-8 ">
                  <li className="text-xl font-semibold cursor-pointer">Home</li>
                  <li className="text-xl font-semibold cursor-pointer"><Link to={'/contacts'}>Contacts</Link></li>
                  <li className="text-xl font-semibold cursor-pointer">Cards</li>
                  <li className="text-xl font-semibold cursor-pointer">Manage</li>
                  <li className="text-xl font-semibold cursor-pointer">Earn</li>
                </ul>
              </div>
}