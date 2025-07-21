import type { Metadata } from "next";

import "./globals.css";

import type React from "react";

import { Providers } from "./_providers/providers";
import FloatingContactButton from "./_components/home/FloatingContactButton";

export const metadata: Metadata = {
    description:
        "فروشگاه آنلاین اکریلیک نوین پلکسی، ارائه‌دهنده انواع ورق‌های پلکسی گلاس با کیفیت بالا و قیمت مناسب. تجربه خرید آسان و سریع",
    title: "نوین پلکسی | فروشگاه آنلاین اکریلیک",
};

export default function RootLayout(props: { children: React.ReactNode }) {
    const { children } = props;

    return (
        <html data-mode="light" lang="fa" dir="rtl">
            <body>
                <Providers>
                    <main className="relative">
                        {children}
                        <FloatingContactButton />
                    </main>
                </Providers>
            </body>
        </html>
    );
}
