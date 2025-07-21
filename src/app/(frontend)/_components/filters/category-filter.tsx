"use client";

import { Collection } from "@/payload-types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type CategoryFilterProps = {
    collections: Collection[];
};

const CategoryFilter = ({ collections }: CategoryFilterProps) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.delete("category");
        selectedCategories.forEach((category) => {
            params.append("category", category);
        });
        router.replace(`${pathname}?${params.toString()}`);
    }, [selectedCategories, pathname, router, searchParams]);

    const handleCheckboxChange = (categoryId: string) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    return (
        <div>
            <h3 className="text-lg font-bold">Categories</h3>
            <ul>
                {collections.map((collection) => (
                    <li key={collection.id}>
                        <label>
                            <input
                                type="checkbox"
                                value={collection.id}
                                onChange={() =>
                                    handleCheckboxChange(
                                        collection.id.toString()
                                    )
                                }
                            />
                            {collection.title}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryFilter;
