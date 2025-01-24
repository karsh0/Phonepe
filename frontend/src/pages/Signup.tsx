import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { LabelledInput } from "../components/LabelledInput";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Logo } from "../components/Logo";


export default function Signup(){
    const navigate = useNavigate()
    const usernameRef = useRef<HTMLInputElement | null>()
    const passwordRef = useRef<HTMLInputElement | null>()

    async function userSignup() {
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
    
            if (!username || !password) {
                alert("username and password are required");
                return;
            }
    
            await axios.post(`${BACKEND_URL}/user/signup`, { username, password });
            navigate('/signin');
        } catch (err) {
            console.error(err);
            alert("Signup failed. Please try again.");
        }
    }

    return <div className="h-screen px-10 py-5 flex flex-col gap-36">
        <Logo/>
        <div className="flex items-center justify-center">
        <div className="w-1/3">
        <div className="w-full h-full flex flex-col gap-5">
            <LabelledInput label="Enter your username" reference={usernameRef}/>
            <LabelledInput label="Enter your password" reference={passwordRef} />
            <Button text="Signup" onClick={userSignup} variant="primary" rounded={true}/>
        </div>
        </div>
    </div>
    </div>
}