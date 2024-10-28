import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@taqi20/blog-common"
import { ChangeEvent, useState } from "react"
import axios from 'axios'
import { BACKEND_URL } from "../config"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {

    const navigate = useNavigate();
    const [emailError, setEmailError] = useState("");
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function sendRequest() {

        if (!validateEmail(postInputs.email)) {
            setEmailError("Please Enter a Valid Email Address");
            return;
        }
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data.token;

            localStorage.setItem("token", `Bearer ` + jwt);
            const name = response.data.name
            localStorage.setItem("firstName", name)
            navigate("/blogs")
        } catch (e) {
            alert(`Error while ${type === "signup" ? "signing up" : "signing in"}`);
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div>
                    <div className="text-4xl font-bold">
                        {type === "signin" ? "Log in to account" : "Create an account"}
                    </div>
                    <div className="text-slate-400 text-center">
                        {type === "signin" ? "Don't have an account ?" : "Already have an account ?"}
                        <Link to={type === "signin" ? "/signup" : "/signin"} className="pl-2 underline">{type === "signin" ? "Sign up" : "Sign in"}</Link>
                    </div>
                </div>
                <div className="mt-4">
                    {type === "signup" ? <LabelledInput label="Name" placeholder="Enter your name" onChange={(e) => {
                        /*
                        setPostInputs(c => ({
                            ...c,
                            name: e.target.value
                        })) 
                        */
                        //Both above and below are same thing
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} /> : null}
                    <LabelledInput label="Email" placeholder="name@email.com" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        });
                        setEmailError("");
                    }} />

                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    <LabelledInput label="Password" type={"password"} placeholder="password" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />

                    <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{type === "signin" ? "Sign in" : "Sign up"}</button>
                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div className="mt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder={placeholder} required />
    </div>
}