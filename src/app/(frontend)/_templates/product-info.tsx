"use client";

import { Heading, Text } from "@medusajs/ui";
import { RichText } from "@payloadcms/richtext-lexical/react";
import _ from "lodash";
import Link from "next/link";
import { useState } from "react";

import AddToCart from "../_components/products/add-to-cart";
import VariantSelector from "../_components/products/variant-selector";
import { Product } from "@/payload-types";

type ProductInfoProps = {
    product: Product;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
    const [selectedVariant, setSelectedVariant] = useState(
        product.variants?.[0]
    );

    return (
        <div id="product-info">
            <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
                {product.collections &&
                    product.collections.length > 0 &&
                    typeof product.collections[0] === "object" && (
                        <Link
                            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
                            href={`/collections/${product.collections[0].handle}`}
                        >
                            {product.collections[0].title}
                        </Link>
                    )}
                <Heading
                    className="text-3xl leading-10 text-ui-fg-base"
                    data-testid="product-title"
                    level="h2"
                >
                    {product.title}
                </Heading>

                <RichText data={product.description as any} />
                <VariantSelector
                    product={product}
                    selectedVariant={selectedVariant}
                    setSelectedVariant={setSelectedVariant}
                />
                <AddToCart variant={selectedVariant} />
                {/* <Text
                    className="text-medium text-ui-fg-subtle whitespace-pre-line"
                    data-testid="product-description"
                >
                    {_.get(
                        product,
                        "description.root.children[0].children[0].text",
                        ""
                    )}
                </Text> */}
            </div>
        </div>
    );
};

export default ProductInfo;
