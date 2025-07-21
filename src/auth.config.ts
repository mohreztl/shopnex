import type { NextAuthConfig } from "next-auth";
import type { PayloadAuthjsUser } from "payload-authjs";

import CredentialsProvider from "next-auth/providers/credentials";
import github from "next-auth/providers/github";

import type { User as PayloadUser } from "./payload-types";

declare module "next-auth" {
    interface User extends PayloadAuthjsUser<PayloadUser> {}
}

export const authConfig: NextAuthConfig = {
    callbacks: {
        authorized: ({ auth }) => !!auth?.user,

        // اضافه کردن کالبک‌های JWT و Session
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.phone = user.phone;
            }
            return token;
        },
        session({ session, token }) {
            session.user.id = token.id as string;
            session.user.phone = token.phone as string;
            return session;
        },
    },
    providers: [],
    // تعریف صفحه ورود سفارشی
    pages: {
        signIn: "/login",
    },
};
