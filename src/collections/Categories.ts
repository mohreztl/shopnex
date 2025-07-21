import type { CollectionConfig } from "payload";

import { slugField } from "@/fields/slugs";

import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Categories: CollectionConfig = {
    slug: "categories",
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    admin: {
        useAsTitle: "title",
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
        },
        ...slugField(),
    ],
    labels: {
        plural: "دسته بندی ها",
        singular: "دسته بندی ",
    },
};
