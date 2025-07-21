import { Product } from "@/payload-types";
import { StyledRichText } from "../styled-rich-text";

type ProductTabsProps = {
    product: Product;
};

const ProductTabs = ({ product }: ProductTabsProps) => {
    return (
        <div>
            {/* Add your tabs here */}
            <StyledRichText data={product.description} />
        </div>
    );
};

export default ProductTabs;
