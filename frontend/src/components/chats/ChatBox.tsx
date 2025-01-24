import { useRef } from "react";
import { Button } from "../Button";

export function ChatBox(){
    const messageRef = useRef<HTMLInputElement | null>(null)
    return <div className="w-full h-full flex flex-col justify-between p-5">
        <p className="h-full flex justify-center items-center text-2xl font-medium text-gray-500 mt-10">
                Start your conversation now.
            </p>
        <div className="w-full flex gap-2 items-end ">
            <input type="text" placeholder="Start your chat here" className="w-2/3 px-3 py-3 border-black border-[1px] rounded-md" ref={messageRef} />
            <Button text="Send"/>
            <Button text="Pay Money" variant="primary"/>
        </div>
    </div>
}