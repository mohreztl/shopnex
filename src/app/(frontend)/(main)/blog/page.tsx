import { Metadata } from "next";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Post } from "@/payload-types";
import Image from "next/image";
import { Clock, User, ArrowRight, Search, Filter } from "lucide-react";

export const metadata: Metadata = {
    title: "وبلاگ | NovinPlexi",
    description: "آخرین مقالات و اخبار NovinPlexi",
};

const BlogPage = async ({
    searchParams,
}: {
    searchParams: { page?: string; search?: string; category?: string };
}) => {
    const payload = await getPayload({ config });
    const page = parseInt(searchParams.page || "1");
    const limit = 9;
    const search = searchParams.search || "";
    const category = searchParams.category || "";

    const {
        docs: posts,
        totalPages,
        hasNextPage,
        hasPrevPage,
    } = await payload.find({
        collection: "posts",
        limit,
        page,
        where: {
            and: [
                {
                    _status: {
                        equals: "published",
                    },
                },
                ...(search
                    ? [
                          {
                              or: [
                                  {
                                      title: {
                                          contains: search,
                                      },
                                  },
                                  {
                                      "meta.description": {
                                          contains: search,
                                      },
                                  },
                              ],
                          },
                      ]
                    : []),
                ...(category
                    ? [
                          {
                              categories: {
                                  in: [category],
                              },
                          },
                      ]
                    : []),
            ],
        },
        sort: "-publishedAt",
    });

    const { docs: categories } = await payload.find({
        collection: "categories",
        limit: 100,
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
            {/* Hero Section */}
            <section className="relative py-20 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
                <div className="relative max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                        وبلاگ NovinPlexi
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        آخرین مقالات، راهنماها و اخبار دنیای پلکسی گلاس و
                        محصولات نوین
                    </p>

                    {/* Search and Filter Bar */}
                    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="جستجو در مقالات..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    defaultValue={search}
                                />
                            </div>
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <select className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
                                    <option value="">همه دسته‌بندی‌ها</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {posts.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                                <Search className="w-12 h-12 text-purple-400" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                مقاله‌ای یافت نشد
                            </h3>
                            <p className="text-gray-600">
                                متأسفانه مقاله‌ای با این جستجو پیدا نکردیم
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Featured Post */}
                            {page === 1 && posts.length > 0 && (
                                <div className="mb-16">
                                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                                        مقاله ویژه
                                    </h2>
                                    <FeaturedPostCard post={posts[0]} />
                                </div>
                            )}

                            {/* Posts Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {(page === 1 ? posts.slice(1) : posts).map(
                                    (post) => (
                                        <PostCard key={post.id} post={post} />
                                    )
                                )}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4 mt-16">
                                    {hasPrevPage && (
                                        <Link
                                            href={`/blog?page=${page - 1}${search ? `&search=${search}` : ""}${category ? `&category=${category}` : ""}`}
                                            className="px-6 py-3 bg-white border border-purple-200 rounded-xl hover:bg-purple-50 transition-colors"
                                        >
                                            قبلی
                                        </Link>
                                    )}

                                    <div className="flex gap-2">
                                        {Array.from(
                                            { length: totalPages },
                                            (_, i) => i + 1
                                        ).map((pageNum) => (
                                            <Link
                                                key={pageNum}
                                                href={`/blog?page=${pageNum}${search ? `&search=${search}` : ""}${category ? `&category=${category}` : ""}`}
                                                className={`w-12 h-12 flex items-center justify-center rounded-xl transition-colors ${
                                                    pageNum === page
                                                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                                        : "bg-white border border-purple-200 hover:bg-purple-50"
                                                }`}
                                            >
                                                {pageNum}
                                            </Link>
                                        ))}
                                    </div>

                                    {hasNextPage && (
                                        <Link
                                            href={`/blog?page=${page + 1}${search ? `&search=${search}` : ""}${category ? `&category=${category}` : ""}`}
                                            className="px-6 py-3 bg-white border border-purple-200 rounded-xl hover:bg-purple-50 transition-colors"
                                        >
                                            بعدی
                                        </Link>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

const FeaturedPostCard = ({ post }: { post: Post }) => {
    const heroImage =
        typeof post.heroImage === "object" ? post.heroImage : null;
    const author = post.populatedAuthors?.[0];

    return (
        <Link href={`/blog/${post.slug}`} className="group block">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="md:flex">
                    <div className="md:w-1/2 relative h-64 md:h-auto">
                        {heroImage?.url ? (
                            <Image
                                src={heroImage.url}
                                alt={heroImage.alt || post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                                <span className="text-white text-6xl font-bold">
                                    {post.title.charAt(0)}
                                </span>
                            </div>
                        )}
                        <div className="absolute top-4 right-4">
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                ویژه
                            </span>
                        </div>
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4">
                            {author && (
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-purple-600" />
                                    <span className="text-sm text-gray-600">
                                        {author.name}
                                    </span>
                                </div>
                            )}
                            {post.publishedAt && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-purple-600" />
                                    <span className="text-sm text-gray-600">
                                        {new Date(
                                            post.publishedAt
                                        ).toLocaleDateString("fa-IR")}
                                    </span>
                                </div>
                            )}
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors">
                            {post.title}
                        </h2>
                        {post.meta?.description && (
                            <p className="text-gray-600 mb-6 line-clamp-3">
                                {post.meta.description}
                            </p>
                        )}
                        <div className="flex items-center text-purple-600 font-semibold group-hover:gap-3 transition-all">
                            <span>ادامه مطلب</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const PostCard = ({ post }: { post: Post }) => {
    const heroImage =
        typeof post.heroImage === "object" ? post.heroImage : null;
    const author = post.populatedAuthors?.[0];

    return (
        <Link href={`/blog/${post.slug}`} className="group block">
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                    {heroImage?.url ? (
                        <Image
                            src={heroImage.url}
                            alt={heroImage.alt || post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                            <span className="text-white text-4xl font-bold">
                                {post.title.charAt(0)}
                            </span>
                        </div>
                    )}
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                        {author && (
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-purple-600" />
                                <span className="text-sm text-gray-600">
                                    {author.name}
                                </span>
                            </div>
                        )}
                        {post.publishedAt && (
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-purple-600" />
                                <span className="text-sm text-gray-600">
                                    {new Date(
                                        post.publishedAt
                                    ).toLocaleDateString("fa-IR")}
                                </span>
                            </div>
                        )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                    {post.meta?.description && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                            {post.meta.description}
                        </p>
                    )}
                    <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
                        <span>ادامه مطلب</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default BlogPage;
