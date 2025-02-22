import { useNavigate } from "react-router-dom";
import { LabelledInput } from "../components/LabelledInput";
import { Button } from "../components/Button";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Logo } from "../components/Logo";

interface SigninResponse {
    token: string; 
}

export default function Signin() {
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function userSignin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !password) {
            alert("Please fill in both fields.");
            return;
        }

        try {
            const response = await axios.post<SigninResponse>(`${BACKEND_URL}/user/signin`, {
                username,
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

    return <div className="h-screen px-10 py-5 flex flex-col gap-36">
            <Logo/>
            <div className="flex items-center justify-center">
            <div className="w-1/3">
                <div className="w-full h-full flex flex-col gap-5">
                    <LabelledInput label="Enter your username" reference={usernameRef} />
                    <LabelledInput label="Enter your password" reference={passwordRef} />
                    <Button text="Signin" onClick={userSignin} variant="primary" rounded={true} />
                </div>
            </div>
        </div>
        </div>
}
