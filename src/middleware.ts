import NextAuth from "next-auth";

import { authConfig } from "./auth.config";

// Remove non-edge-compatible providers for middleware
const { providers, ...authConfigWithoutProviders } = authConfig;
const edgeAuthConfig = {
    ...authConfigWithoutProviders,
    providers: [],
};

export const { auth: middleware } = NextAuth(edgeAuthConfig);

export const config = {
    matcher: ["/admin/:path*", "/checkout/:path*"],
};
