import type { Metadata } from "next";

import config from "@payload-config";
import { getPayload } from "payload";

import FeaturedProducts from "../_components/featured-products";
import Hero from "../_components/hero";
import HeroSection from "../_components/home/Hero";
import TopProductsSection from "../_components/home/TopProductSection";
import CategoriesSection from "../_components/home/CategoriesSection";
import ServicesSection from "../_components/home/ServiceSection";
import BlogSection from "../_components/home/BlogSection";
import Faq from "../_components/home/Faq";
export const metadata: Metadata = {
    description:
        "فروشگاه آنلاین اکریلیک نوین پلکسی، ارائه‌دهنده انواع ورق‌های پلکسی گلاس با کیفیت بالا و قیمت مناسب. تجربه خرید آسان و سریع",
    title: "نوین پلکسی | فروشگاه آنلاین اکریلیک",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
    const payload = await getPayload({ config });

    const heroSection = await payload.findGlobal({
        slug: "hero-section",
    });
    const hero = heroSection.type?.find((f) => f.blockType === "hero");

    const featuredCollections = await payload.find({
        collection: "collections",
        limit: 2,
        sort: "createdAt",
    });

    return (
        <>
            {/* <Hero hero={hero as any} /> */}
            <HeroSection />
            {/* <div className="py-12">
                <ul className="flex flex-col gap-x-6">
                    <FeaturedProducts collections={featuredCollections.docs} />
                </ul>
            </div> */}
            <TopProductsSection />
            <CategoriesSection />
            <ServicesSection />
            <BlogSection />
            <Faq />
        </>
    );
}
