"use client";

import { Product } from "@/payload-types";
import { useCart } from "react-use-cart";
import { useState } from "react";

type AddToCartProps = {
    variant: Product["variants"][0];
};

const AddToCart = ({ variant }: AddToCartProps) => {
    const { addItem } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        if (!variant) {
            // TODO: Show an error message
            return;
        }
        setIsAdding(true);
        addItem(
            {
                ...variant,
                id: variant.id,
                price: variant.price,
                name: variant.options.map((o) => o.value).join(" "),
            },
            1
        );
        setIsAdding(false);
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={!variant || isAdding}
            className="w-full bg-blue-600 text-white py-2 rounded-md disabled:bg-gray-400"
        >
            {isAdding ? "Adding..." : "Add to Cart"}
        </button>
    );
};

export default AddToCart;
