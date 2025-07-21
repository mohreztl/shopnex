import type { Metadata } from "next";

import { getStoreSettings } from "@/app/api/services/store-settings";

// import Footer from "../_templates/footer";
import Nav from "../_templates/nav";
import Footer from "../_components/home/Footer"

export const metadata: Metadata = {
    description:
        "فروشگاه آنلاین اکریلیک نوین پلکسی، ارائه‌دهنده انواع ورق‌های پلکسی گلاس با کیفیت بالا و قیمت مناسب. تجربه خرید آسان و سریع",
    title: "نوین پلکسی | فروشگاه آنلاین اکریلیک",
};

export default async function PageLayout(props: { children: React.ReactNode }) {
    const storeSettings = await getStoreSettings();
    return (
        <>
            <Nav storeSettings={storeSettings} />
            {props.children}
            
            {/* <Footer storeSettings={storeSettings} /> */}
            <Footer/>
            {/* <FloatingContactButton/> */}
        </>
    );
}
