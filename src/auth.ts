import payloadConfig from "@payload-config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import github from "next-auth/providers/github";
import { withPayload } from "payload-authjs";

import { authConfig } from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        github,
        // افزودن احراز هویت با شماره موبایل
        CredentialsProvider({
            name: "Phone OTP",
            async authorize(credentials) {
                const { otp, phone } = credentials;

                // Dynamically import payload only on the server
                const payload = (await import("payload")).default;

                if (!phone || !otp) {
                    return null;
                }

                try {
                    // جستجوی کاربر در پایگاه داده
                    const { docs: users } = await payload.find({
                        collection: "users",
                        where: { phone: { equals: phone } },
                    });

                    if (users.length === 0) {
                        return null;
                    }

                    const user = users[0];

                    // بررسی صحت OTP و تاریخ انقضا
                    // بررسی صحت OTP و تاریخ انقضا
                    if (user.otp && user.otpExpiry) {
                        const currentTime = new Date();
                        const otpExpiry = new Date(user.otpExpiry);

                        if (user.otp === otp && otpExpiry > currentTime) {
                            // برگرداندن اطلاعات کاربر برای احراز هویت
                            return {
                                id: user.id,
                                name: user.name || "",
                                email: user.email || "",
                                phone: user.phone,
                            };
                        }
                    }

                    return null;
                } catch (error) {
                    console.error("Authentication error:", error);
                    return null;
                }
            },
            credentials: {
                otp: { type: "text", label: "OTP" },
                phone: { type: "text", label: "Phone" },
            },
        }),
    ],
});
