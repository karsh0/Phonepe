import { useNavigate } from "react-router-dom";
import { LabelledInput } from "../components/LabelledInput";
import { Button } from "../components/Button";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface SigninResponse {
    token: string; 
}

export default function Signin() {
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function userSignin() {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) {
            alert("Please fill in both fields.");
            return;
        }

        try {
            const response = await axios.post<SigninResponse>(`${BACKEND_URL}/user/signin`, {
                email,
                password,
            });

            const token = response.data.token; 
            if(!token){
                alert('error with signin')
            }
            localStorage.setItem("token", token);
            navigate("/dashboard");
        } catch (error: any) {
            console.error("Error during sign-in:", error);
            alert(
                error.response?.data?.message || 
                "Failed to sign in. Please check your credentials and try again."
            );
        }
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-1/3">
                <div className="w-full h-full flex flex-col gap-5">
                    <LabelledInput label="Enter your email address" reference={emailRef} />
                    <LabelledInput label="Enter your password" reference={passwordRef} />
                    <Button text="Signin" onClick={userSignin} variant="primary" />
                </div>
            </div>
        </div>
    );
}
