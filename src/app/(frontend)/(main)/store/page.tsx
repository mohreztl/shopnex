import { getAllProducts } from "@/app/api/services/product";
import { Metadata } from "next";
import { getAllCollections } from "@/app/api/services/collection";
import CategoryFilter from "../../_components/filters/category-filter";

export const metadata: Metadata = {
    title: "Store",
    description: "Explore all of our products.",
};

const StorePage = async () => {
    const { products } = await getAllProducts();
    const { collections } = await getAllCollections();

    return (
        <div className="flex">
            <div className="w-1/4 p-4">
                <h2 className="text-2xl font-bold">Filters</h2>
                <CategoryFilter collections={collections} />
                {/* Add other filter components here */}
            </div>
            <div className="w-3/4 p-4">
                <div className="grid grid-cols-3 gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="border p-4">
                            <h3 className="text-lg font-bold">
                                {product.title}
                            </h3>
                            {/* Add product image and price here */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StorePage;
