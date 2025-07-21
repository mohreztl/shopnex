import { Product } from "@/payload-types";

type RelatedProductsProps = {
    product: Product;
};

const RelatedProducts = ({ product }: RelatedProductsProps) => {
    // TODO: Fetch related products
    return (
        <div>
            <h2 className="text-2xl font-bold">Related Products</h2>
            {/* Add your related products grid here */}
        </div>
    );
};

export default RelatedProducts;
