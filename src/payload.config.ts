import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { en } from "@payloadcms/translations/languages/en";
import { fa } from "@payloadcms/translations/languages/fa";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import { authjsPlugin } from "payload-authjs";
import sharp from "sharp";

import { populatePolicies as createDefaultPolicies } from "./app/api/services/policies";
import { authConfig } from "./auth.config";
import { Carts } from "./collections/Carts";
import { Categories } from "./collections/Categories";
import { Collections } from "./collections/Collections";
import { GiftCards } from "./collections/GiftCards";
import { Locations } from "./collections/Locations";
import { Media } from "./collections/Media";
import { Orders } from "./collections/Orders";
import { Payments } from "./collections/Payments";
import { Policies } from "./collections/Policies";
import { Posts } from "./collections/Posts";
import { Products } from "./collections/Products/Products";
import { Shipping } from "./collections/Shipping";
import { Users } from "./collections/Users/users";
import { sendOTPHandler } from "./endpoints/send-otp";
import { Footer } from "./globals/Footer";
import { HeroSection } from "./globals/HeroSection";
import StoreSettings from "./globals/StoreSettings";
import { plugins } from "./plugins";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const catalog = [Collections, Products];

export default buildConfig({
    admin: {
        components: {
            Nav: "@/admin/components/Nav/Nav.tsx",
            views: {
                dashboard: {
                    Component: "@/admin/components/Dashboard/Dashboard",
                },
            },
        },
        importMap: {
            autoGenerate: false,
            baseDir: path.resolve(dirname),
        },
        meta: {
            titleSuffix: "-نوین پلکسی",
        },
        suppressHydrationWarning: true,
        user: Users.slug,
    },

    collections: [
        Orders,
        ...catalog,
        Users,
        Media,
        Policies,
        GiftCards,
        Payments,
        Locations,
        Shipping,
        Carts,
        Posts,
        Categories,
    ],

    db: sqliteAdapter({
        client: {
            url: process.env.DATABASE_URI || "",
        },
    }),
    editor: lexicalEditor(),
    endpoints: [
        {
            handler: (req) => {
                return Response.json({ status: "OK" });
            },
            method: "get",
            path: "/healthz",
        },
        {
            handler: sendOTPHandler,
            method: "post",
            path: "/send-otp",
        },
    ],

    globals: [StoreSettings, HeroSection, Footer],
    i18n: {
        supportedLanguages: { en, fa },
    },
    onInit: async (payload) => {
        await createDefaultPolicies(payload);
    },

    plugins: [
        ...plugins,
        authjsPlugin({
            authjsConfig: authConfig,
            // storage-adapter-placeholder
        }),
    ],
    secret: process.env.PAYLOAD_SECRET || "",
    sharp,
    telemetry: false,
    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },
});
