// components/TopProductsSection.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    FiShoppingCart,
    FiHeart,
    FiEye,
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";
import FeaturedProducts from "../featured-products";
import Link from "next/link";
import Image from "next/image";

interface TopProductSectionClientProps {
    products: any[];
}

const TopProductSectionClient: React.FC<TopProductSectionClientProps> = ({
    products,
}) => {
    const [activeTab, setActiveTab] = useState("all");

    // داده‌های نمونه برای محصولات
    // const products = [
    //     {
    //         id: 1,
    //         title: "تابلو نئون اکریلیک",
    //         description:
    //             "تابلو تبلیغاتی با نورپردزی نئون و قابلیت سفارشی سازی متن",
    //         price: "1,290,000 تومان",
    //         category: "signage",
    //         isNew: true,
    //         discount: 15,
    //     },
    //     {
    //         id: 2,
    //         title: "پارتیشن اداری شفاف",
    //         description: "پارتیشن ضد خش با ضخامت 10mm مناسب برای فضاهای اداری",
    //         price: "2,450,000 تومان",
    //         category: "display",
    //         isNew: false,
    //         discount: 0,
    //     },
    //     {
    //         id: 3,
    //         title: "میز کنسول مدرن",
    //         description: "میز کنسول اکریلیک با پایه استیل ضد زنگ و طراحی منحنی",
    //         price: "3,850,000 تومان",
    //         category: "furniture",
    //         isNew: true,
    //         discount: 10,
    //     },
    //     {
    //         id: 4,
    //         title: "ویترین فروشگاهی",
    //         description: "ویترین تمام شفاف با قابلیت نورپردزی RGB و قفل امنیتی",
    //         price: "4,200,000 تومان",
    //         category: "display",
    //         isNew: false,
    //         discount: 5,
    //     },
    //     {
    //         id: 5,
    //         title: "حروف برجسته سه بعدی",
    //         description: "حروف برجسته برای تابلوهای مغازه با نورپردزی LED",
    //         price: "950,000 تومان",
    //         category: "signage",
    //         isNew: true,
    //         discount: 20,
    //     },
    //     {
    //         id: 6,
    //         title: "پایه نگهدارنده محصول",
    //         description: "پایه نمایش محصول با قابلیت تنظیم زاویه و ارتفاع",
    //         price: "320,000 تومان",
    //         category: "display",
    //         isNew: false,
    //         discount: 0,
    //     },
    // ];

    // فیلتر کردن محصولات بر اساس دسته‌بندی
    // const filteredProducts =
    //     activeTab === "all"
    //         ? products
    //         : products.filter((product) => product.category === activeTab);

    // // // دسته‌بندی‌ها
    const categories = [
        { id: "all", name: "همه محصولات" },
        { id: "signage", name: "تابلوها" },
        { id: "display", name: "ویترین‌ها" },
        { id: "furniture", name: "مبلمان" },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
            <div className=" mx-auto px-4">
                {/* عنوان بخش */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        محصولات{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                            پرفروش
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-600 max-w-2xl mx-auto"
                    >
                        پرطرفدارترین محصولات اکریلیک با کیفیت عالی و طراحی منحصر
                        به فرد
                    </motion.p>
                </div>
                {/* تب‌های دسته‌بندی */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveTab(category.id)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                                activeTab === category.id
                                    ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/30"
                                    : "bg-white text-gray-700 hover:bg-blue-50 border border-blue-100"
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </motion.div>
                {/* لیست محصولات */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <Link href={`/products/${product.handle}`}>
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300"
                            >
                                {/* تصویر محصول */}
                                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                                    {product.variants?.[0]?.gallery?.[0]
                                        ?.image && (
                                        <Image
                                            src={
                                                typeof product.variants[0]
                                                    .gallery[0].image ===
                                                "string"
                                                    ? product.variants[0]
                                                          .gallery[0].image
                                                    : product.variants[0]
                                                          .gallery[0].image.url
                                            }
                                            alt={product.title}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    )}
                                    {/* دکمه‌های اکشن */}
                                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-blue-50 transition-colors">
                                            <FiHeart className="text-gray-700" />
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-blue-50 transition-colors">
                                            <FiEye className="text-gray-700" />
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center shadow-md hover:from-blue-700 hover:to-indigo-800 transition-all">
                                            <FiShoppingCart className="text-white" />
                                        </button>
                                    </div>
                                </div>

                                {/* محتوای محصول */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900 mb-1">
                                                {product.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4">
                                                {product.title}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="font-bold text-lg text-gray-900">
                                                {product.variants[0].price}
                                            </span>
                                        </div>

                                        <button className="text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all shadow hover:shadow-lg">
                                            افزودن به سبد
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
                ;{/* دکمه مشاهده همه */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-center mt-16"
                >
                    <button className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-700 font-bold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 group">
                        مشاهده همه محصولات
                        <FiChevronLeft className="mr-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>

            {/* دکوراسیون پس‌زمینه */}
            <div className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-blue-100/50 to-transparent"></div>
            <div className="absolute top-1/4 right-10 -z-10 w-64 h-64 rounded-full bg-blue-200/30 blur-3xl"></div>
            <div className="absolute bottom-1/3 left-10 -z-10 w-48 h-48 rounded-full bg-indigo-200/30 blur-3xl"></div>
        </section>
    );
};

export default TopProductSectionClient;
