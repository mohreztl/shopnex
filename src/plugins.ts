import type { Post } from "@/payload-types";
import type { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import type { Plugin } from "payload";

import { getServerSideURL } from "@/utils/getURL";

// import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
// import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
// import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
// import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from "@payloadcms/plugin-seo";
// import { searchPlugin } from '@payloadcms/plugin-search'
import { cjPlugin } from "@shopnex/cj-plugin";
import { importExportPlugin } from "@shopnex/import-export-plugin";
import { storePlugin } from "@shopnex/store-plugin";
import { stripePlugin } from "@shopnex/stripe-plugin";

import { paymentCanceled } from "./webhooks/payment-canceled";
import { paymentSucceeded } from "./webhooks/payment-succeeded";
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
const generateTitle: GenerateTitle<Post> = ({ doc }) => {
    return doc?.title
        ? `${doc.title} | Payload Website Template`
        : "Payload Website Template";
};

const generateURL: GenerateURL<Post> = ({ doc }) => {
    const url = getServerSideURL();

    return doc?.slug ? `${url}/${doc.slug}` : url;
};
export const plugins: Plugin[] = [
    seoPlugin({
        generateTitle,
        generateURL,
    }),
    stripePlugin({
        isTestKey: Boolean(process.env.NEXT_PUBLIC_STRIPE_IS_TEST_KEY),
        logs: true,
        paymentCollectionSlug: "payments",
        rest: false,
        stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
        stripeWebhooksEndpointSecret:
            process.env.STRIPE_WEBHOOKS_SIGNING_SECRET,
        webhooks: {
            "payment_intent.canceled": paymentCanceled,
            "payment_intent.succeeded": paymentSucceeded,
        },
    }),
    cjPlugin({
        cjApiKey: process.env.CJ_PASSWORD || "",
        cjEmailAddress: process.env.CJ_EMAIL_ADDRESS || "",
        cjRefreshToken: process.env.CJ_REFRESH_TOKEN,
    }),
    storePlugin({}),
    importExportPlugin({
        collections: ["products", "orders,posts"],
        disableJobsQueue: true,
        importCollections: [
            {
                collectionSlug: "products",
            },
            {
                collectionSlug: "orders",
            },
            {
                collectionSlug: "posts",
            },
        ],
    }),
];
