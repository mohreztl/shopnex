import LoginTemplate from "@/app/(frontend)/_templates/login-template";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign in",
    description: "Sign in to your account.",
};

export default function Login() {
    return <LoginTemplate />;
}
