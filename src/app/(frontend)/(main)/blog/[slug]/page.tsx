import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Post } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Clock, User, ArrowLeft, Share2, BookOpen, Tag } from "lucide-react";

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const payload = await getPayload({ config });
    const { docs: posts } = await payload.find({
        collection: "posts",
        where: {
            slug: {
                equals: params.slug,
            },
        },
        limit: 1,
    });

    const post = posts[0];

    if (!post) {
        return {
            title: "مقاله یافت نشد | NovinPlexi",
        };
    }

    return {
        title: `${post.title} | NovinPlexi`,
        description: post.meta?.description || post.title,
        openGraph: {
            title: post.title,
            description: post.meta?.description || post.title,
            images:
                post.heroImage && typeof post.heroImage === "object"
                    ? [post.heroImage.url]
                    : [],
        },
    };
}

const BlogPostPage = async ({ params }: Props) => {
    const payload = await getPayload({ config });

    const { docs: posts } = await payload.find({
        collection: "posts",
        where: {
            and: [
                {
                    slug: {
                        equals: params.slug,
                    },
                },
                {
                    _status: {
                        equals: "published",
                    },
                },
            ],
        },
        limit: 1,
    });

    const post = posts[0];

    if (!post) {
        notFound();
    }

    // Get related posts
    const { docs: relatedPosts } = await payload.find({
        collection: "posts",
        where: {
            and: [
                {
                    id: {
                        not_equals: post.id,
                    },
                },
                {
                    _status: {
                        equals: "published",
                    },
                },
            ],
        },
        limit: 3,
        sort: "-publishedAt",
    });

    const heroImage =
        typeof post.heroImage === "object" ? post.heroImage : null;
    const author = post.populatedAuthors?.[0];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
            {/* Hero Section */}
            <section className="relative py-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5"></div>

                {/* Back Button */}
                <div className="relative max-w-4xl mx-auto mb-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>بازگشت به وبلاگ</span>
                    </Link>
                </div>

                {/* Article Header */}
                <div className="relative max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-6 mb-6 text-sm text-gray-600">
                            {author && (
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-purple-600" />
                                    <span>{author.name}</span>
                                </div>
                            )}
                            {post.publishedAt && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-purple-600" />
                                    <span>
                                        {new Date(
                                            post.publishedAt
                                        ).toLocaleDateString("fa-IR")}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-purple-600" />
                                <span>۵ دقیقه مطالعه</span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {post.meta?.description && (
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                {post.meta.description}
                            </p>
                        )}
                    </div>

                    {/* Hero Image */}
                    {heroImage?.url && (
                        <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-8">
                            <Image
                                src={heroImage.url}
                                alt={heroImage.alt || post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    )}
                </div>
            </section>

            {/* Article Content */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-purple-100">
                        {/* Share Buttons */}
                        <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100">
                            <div className="flex items-center gap-4">
                                <Share2 className="w-5 h-5 text-purple-600" />
                                <span className="text-gray-600">
                                    اشتراک‌گذاری:
                                </span>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                                        <span className="text-sm">T</span>
                                    </button>
                                    <button className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                                        <span className="text-sm">W</span>
                                    </button>
                                    <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                                        <span className="text-sm">L</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Article Content */}
                        <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-800 prose-ul:text-gray-700 prose-ol:text-gray-700">
                            <RichText data={post.content as any} />
                        </div>

                        {/* Categories */}
                        {post.categories && post.categories.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-gray-100">
                                <div className="flex items-center gap-4 flex-wrap">
                                    <div className="flex items-center gap-2">
                                        <Tag className="w-5 h-5 text-purple-600" />
                                        <span className="text-gray-600">
                                            دسته‌بندی‌ها:
                                        </span>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        {post.categories.map((category) => {
                                            if (typeof category === "object") {
                                                return (
                                                    <Link
                                                        key={category.id}
                                                        href={`/blog?category=${category.id}`}
                                                        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
                                                    >
                                                        {category.title}
                                                    </Link>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="py-16 px-6 bg-white/50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
                            مقالات مرتبط
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost) => (
                                <RelatedPostCard
                                    key={relatedPost.id}
                                    post={relatedPost}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

const RelatedPostCard = ({ post }: { post: Post }) => {
    const heroImage =
        typeof post.heroImage === "object" ? post.heroImage : null;

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
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                    {post.meta?.description && (
                        <p className="text-gray-600 text-sm line-clamp-3">
                            {post.meta.description}
                        </p>
                    )}
                </div>
            </article>
        </Link>
    );
};

export default BlogPostPage;
