import config from "@payload-config";
import { getPayload } from "payload";

export async function getAllCollections() {
    const payload = await getPayload({ config });

    const collections = await payload.find({
        collection: "collections",
    });

    return { collections: collections.docs };
}
