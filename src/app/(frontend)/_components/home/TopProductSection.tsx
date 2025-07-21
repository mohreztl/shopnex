import React from "react";
import config from "@payload-config";
import { getPayload } from "payload";
import FeaturedProducts from "../featured-products";
import TopProductSectionClient from "./TopProductSectionClient";

const TopProductSection = async () => {
    const payload = await getPayload({ config });
    const products = await payload.find({
        collection: "products",
        limit: 6,
        sort: "createdAt",
    });
    console.log("TopProductSection products", products.docs);
    return (
        <>
            <TopProductSectionClient products={products.docs} />
        </>
    );
};

export default TopProductSection;
