import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Input from "./input";
import { SubmitButton } from "./submit-button";

enum LOGIN_VIEW {
    REGISTER = "register",
    SIGN_IN = "sign-in",
}

type Props = {
    setCurrentView: (view: LOGIN_VIEW) => void;
};

const Login = ({ setCurrentView }: Props) => {
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();

    const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        const formData = new FormData(e.currentTarget);
        const phone = formData.get("phone") as string;

        try {
            const res = await fetch("/api/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to send OTP");
            }

            setMessage(data.message);
            setOtpSent(true);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.currentTarget);
        const phone = formData.get("phone") as string;
        const otp = formData.get("otp") as string;

        const result = await signIn("credentials", {
            redirect: false,
            phone,
            otp,
        });

        if (result?.error) {
            setError(result.error);
        } else {
            router.push("/"); // Redirect to home on successful login
        }
    };

    return (
        <div
            className="max-w-sm w-full flex flex-col items-center"
            data-testid="login-page"
        >
            <h1 className="text-large-semi uppercase mb-6">
                {otpSent ? "Enter Verification Code" : "Welcome Back"}
            </h1>
            <p className="text-center text-base-regular text-ui-fg-base mb-8">
                {otpSent
                    ? "A 6-digit code has been sent to your phone."
                    : "Sign in to access an enhanced shopping experience."}
            </p>
            <form
                className="w-full"
                onSubmit={otpSent ? handleLogin : handleSendOtp}
            >
                <div className="flex flex-col w-full gap-y-2">
                    <Input
                        autoComplete="tel"
                        data-testid="phone-input"
                        label="Phone Number"
                        name="phone"
                        required
                        title="Enter a valid phone number."
                        type="tel"
                        readOnly={otpSent}
                    />
                    {otpSent && (
                        <Input
                            autoComplete="one-time-code"
                            data-testid="otp-input"
                            label="OTP"
                            name="otp"
                            required
                            type="text"
                        />
                    )}
                </div>
                {error && (
                    <div
                        className="text-red-500 text-sm mt-2"
                        data-testid="login-error-message"
                    >
                        {error}
                    </div>
                )}
                {message && (
                    <div className="text-green-500 text-sm mt-2">{message}</div>
                )}
                <SubmitButton
                    className="w-full mt-6"
                    data-testid="sign-in-button"
                >
                    {otpSent ? "Sign In" : "Send Code"}
                </SubmitButton>
            </form>
            <span className="text-center text-ui-fg-base text-small-regular mt-6">
                Not a member?{" "}
                <button
                    className="underline"
                    data-testid="register-button"
                    onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
                >
                    Join us
                </button>
                .
            </span>
        </div>
    );
};

export default Login;
