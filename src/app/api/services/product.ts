import config from "@payload-config";
import { getPayload } from "payload";

export async function getProductByHandle(handle: string) {
    const payload = await getPayload({ config });

    const products = await payload.find({
        collection: "products",
        where: {
            handle: {
                equals: handle,
            },
        },
    });

    if (products.docs.length === 0) {
        return { product: null };
    }

    return { product: products.docs[0] };
}

export async function getAllProducts() {
    const payload = await getPayload({ config });

    const products = await payload.find({
        collection: "products",
    });

    return { products: products.docs };
}
