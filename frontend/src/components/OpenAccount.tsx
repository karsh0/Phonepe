import { PLusIcon } from "./ui/PlusIcon";

export function OpenAccount(){
    return<div>
        <div className="bg-gray-200 rounded-xl h-52 w-52 p-4 flex flex-col justify-between cursor-pointer">
            <div className="rounded-full w-10 h-10 bg-gray-300 flex justify-center items-center">
            <PLusIcon/>
            </div>
            <div>
                <h2 className="text-2xl font-semibold">Open</h2>
                <span className="text-gray-400">50+ currencies</span>
            </div>
        </div>
    </div>
}