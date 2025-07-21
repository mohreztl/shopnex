import type { CollectionConfig } from "payload";

import { admins, adminsOrSelf, anyone } from "@/access/roles";

import { groups } from "../groups";

export const Users: CollectionConfig = {
    slug: "users",
    access: {
        create: anyone,
        delete: admins,
        read: adminsOrSelf,
        update: admins,
    },
    admin: {
        group: groups.customers,
        useAsTitle: "phone",
    },
    labels: {
        plural: "کاربران",
        singular: "کاربران",
    },

    auth: {
        /**
     * Enable API Key Strategy
     *
     
     */

        disableEmailPasswordStrategy: true,
        disableLocalStrategy: true,
        disableOAuthStrategy: true,
        useAPIKey: true,
    },
    fields: [
        // Email added by default
        {
            name: "firstName",
            type: "text",
            label: "First Name",
        },
        {
            name: "lastName",
            type: "text",
            label: "Last Name",
        },
        {
            name: "phone",
            type: "text",

            unique: true,
            validate: (val: null | string | string[] | undefined) => {
                if (typeof val === "string") {
                    return /^09\d{9}$/.test(val)
                        ? true
                        : "شماره همراه معتبر نیست";
                }
                return "شماره همراه معتبر نیست";
            },
        },
        {
            name: "otp",
            type: "text",
        },
        {
            name: "otpExpiry",
            type: "date",
        },
        {
            name: "isVerified",
            type: "checkbox",
            defaultValue: false,
        },
        {
            name: "emailVerified",
            type: "date",
            admin: {
                position: "sidebar",
            },
        },
        {
            name: "roles",
            type: "select",
            defaultValue: ["customer"],
            hasMany: true,
            options: [
                {
                    label: "admin",
                    value: "admin",
                },
                {
                    label: "customer",
                    value: "customer",
                },
            ],
            saveToJWT: true,
        },
    ],
};
