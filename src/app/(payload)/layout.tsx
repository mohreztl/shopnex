import type { Metadata } from "next";

import "@payloadcms/next/css";

import type { ServerFunctionClient } from "payload";
import type React from "react";

/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from "@payload-config";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";

import "./custom.scss";
import { importMap } from "./admin/importMap.js";

type Args = {
    children: React.ReactNode;
};

export const metadata: Metadata = {
    description:
        "فروشگاه آنلاین اکریلیک نوین پلکسی، ارائه‌دهنده انواع ورق‌های پلکسی گلاس با کیفیت بالا و قیمت مناسب. تجربه خرید آسان و سریع",
    title: "نوین پلکسی | فروشگاه آنلاین اکریلیک",
};
// biome-ignore lint/complexity/useArrowFunction: <explanation>
const serverFunction: ServerFunctionClient = async function (args) {
    "use server";
    return handleServerFunctions({
        ...args,
        config,
        importMap,
    });
};

const Layout = ({ children }: Args) => (
    <RootLayout
        config={config}
        importMap={importMap}
        serverFunction={serverFunction}
    >
        {children}
    </RootLayout>
);

export default Layout;
