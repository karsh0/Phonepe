import { useNavigate } from "react-router-dom";
import { LabelledInput } from "../components/LabelledInput";
import { Button } from "../components/Button";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";


export default function Signin(){
    const navigate = useNavigate()
    const emailRef = useRef<HTMLInputElement | null>()
    const passwordRef = useRef<HTMLInputElement | null>()
    
    async function userSignin(){
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        await axios.post(BACKEND_URL+'/user/signin', {
            email, password
        })
        navigate('/dashboard')
    }

    return <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-1/3">
        <div className="w-full h-full flex flex-col gap-5">
        <LabelledInput label="Enter your email address" reference={emailRef}/>
        <LabelledInput label="Enter your password" reference={passwordRef} />
            <Button text="Signin" onClick={userSignin} variant="primary"/>
        </div>
        </div>
    </div>
}