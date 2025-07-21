import { getProductByHandle } from "@/app/api/services/product";
import ProductInfo from "@/app/(frontend)/_templates/product-info";
import ProductTabs from "@/app/(frontend)/_components/products/product-tabs";
import RelatedProducts from "@/app/(frontend)/_components/products/related-products";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
    params: { handle: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { product } = await getProductByHandle(params.handle);

    if (!product) {
        notFound();
    }

    return {
        title: `${product.title} | NovinPlexi`,
        description: `${product.title}`,
        openGraph: {
            title: `${product.title} | NovinPlexi`,
            description: `${product.title}`,
            images: product.variants?.[0]?.gallery?.map((g) => g.image.url),
        },
    };
}

const ProductTemplate = async ({ params }: Props) => {
    const { product } = await getProductByHandle(params.handle);

    if (!product) {
        return notFound();
    }

    return (
        <>
            <div className="content-container flex flex-col small:flex-row small:items-start py-6 relative">
                <div className="flex flex-col small:sticky small:top-20 w-full py-8 small:py-0 small:max-w-[344px] medium:max-w-[400px] flex-1">
                    {/* <ImageGallery images={product.variants.flatMap((v) => v.gallery.map((g) => g.image))} /> */}
                </div>
                <div className="flex flex-col small:sticky small:top-20 w-full py-8 small:py-0 small:max-w-[344px] medium:max-w-[400px] flex-1">
                    <ProductInfo product={product} />
                    <ProductTabs product={product} />
                </div>
            </div>
            <div className="content-container my-16 px-6 small:px-8 small:my-32">
                <RelatedProducts product={product} />
            </div>
        </>
    );
};

export default ProductTemplate;
