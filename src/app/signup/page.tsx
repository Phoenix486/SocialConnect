"use client";
import Link from "next/link";
import React, { useRef } from "react";
import {BASE_URL, HOME_URL} from "@/constants";
import InputBox from "@/components/shared/InputBox";
import {Button} from "@/components/shared/Button";
import {useRouter} from "next/navigation";

type FormInputs = {
    name: string;
    email: string;
    password: string;
};

const SignupPage = () => {
    const router = useRouter();
    const register = async () => {
        const res = await fetch(BASE_URL + "/Auth/register", {
            method: "POST",
            body: JSON.stringify({
                username: data.current.name,
                email: data.current.email,
                password: data.current.password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            alert(res.statusText);
            return;
        }
        if(res.ok) {
            const response = await res.json();
            alert("User Registered!");
            router.push(`/api/auth/signin?callbackUrl=${HOME_URL}`);
            console.log({response});
        }
    };
    const data = useRef<FormInputs>({
        name: "",
        email: "",
        password: "",
    });
    return (
        <div className="flex flex-col items-center justify-between p-4">
            <div className="p-2 text-slate-600">
                Sign up
            </div>
            <div className="p-2 flex flex-col gap-2">
                <InputBox
                    autoComplete="off"
                    name="name"
                    labelText="UserName"
                    placeholder="username"
                    required
                    onChange={(e) => (data.current.name = e.target.value)}
                />
                <InputBox
                    name="email"
                    labelText="Email"
                    placeholder="user@example.com"
                    required
                    onChange={(e) => (data.current.email = e.target.value)}
                />
                <InputBox
                    name="password"
                    labelText="Password"
                    placeholder="password"
                    type="password"
                    required
                    onChange={(e) => (data.current.password = e.target.value)}
                />
                <div className="flex justify-between items-center gap-2">
                    <Link className="" href={"/"}>
                        Cancel
                    </Link>
                    <Button onClick={register}>Register</Button>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;