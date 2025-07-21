"use client";

import { Product } from "@/payload-types";
import { useState } from "react";

type VariantSelectorProps = {
    product: Product;
    selectedVariant: Product["variants"][0];
    setSelectedVariant: (variant: Product["variants"][0]) => void;
};

const VariantSelector = ({
    product,
    selectedVariant,
    setSelectedVariant,
}: VariantSelectorProps) => {
    const handleVariantChange = (optionName: string, value: string) => {
        const newVariant = product.variants?.find((variant) => {
            const option = variant.options?.find(
                (o) => o.option === optionName
            );
            return option && option.value === value;
        });

        if (newVariant) {
            setSelectedVariant(newVariant);
        }
    };

    return (
        <div className="space-y-4">
            {product.variantOptions?.map((option) => (
                <div key={option.id}>
                    <h3 className="text-sm font-medium text-gray-700">
                        {option.option}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {option.value?.map((value) => {
                            const isSelected = selectedVariant?.options?.some(
                                (o) =>
                                    o.option === option.option &&
                                    o.value === value
                            );

                            if (option.option.toLowerCase() === "color") {
                                return (
                                    <button
                                        key={value}
                                        onClick={() =>
                                            handleVariantChange(
                                                option.option,
                                                value
                                            )
                                        }
                                        className={`w-8 h-8 rounded-full border-2 ${
                                            isSelected
                                                ? "border-blue-500"
                                                : "border-transparent"
                                        }`}
                                        style={{
                                            backgroundColor:
                                                value.toLowerCase(),
                                        }}
                                        title={value}
                                    />
                                );
                            }

                            return (
                                <button
                                    key={value}
                                    onClick={() =>
                                        handleVariantChange(
                                            option.option,
                                            value
                                        )
                                    }
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isSelected
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    {value}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
            <div className="mt-6">
                <span className="text-2xl font-bold text-gray-900">
                    ${selectedVariant?.price}
                </span>
            </div>
        </div>
    );
};

export default VariantSelector;
