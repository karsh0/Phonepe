import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { LabelledInput } from "../components/LabelledInput";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";


export default function Signup(){
    const navigate = useNavigate()
    const emailRef = useRef<HTMLInputElement | null>()
    const passwordRef = useRef<HTMLInputElement | null>()

    async function userSignup() {
        try {
            const email = emailRef.current?.value;
            const password = passwordRef.current?.value;
    
            if (!email || !password) {
                alert("Email and password are required");
                return;
            }
    
            await axios.post(`${BACKEND_URL}/user/signup`, { email, password });
            navigate('/signin');
        } catch (err) {
            console.error(err);
            alert("Signup failed. Please try again.");
        }
    }

    return <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-1/3">
        <div className="w-full h-full flex flex-col gap-5">
            <LabelledInput label="Enter your email address" reference={emailRef}/>
            <LabelledInput label="Enter your password" reference={passwordRef} />
            <Button text="Signup" onClick={userSignup} variant="primary"/>
        </div>
        </div>
    </div>
}