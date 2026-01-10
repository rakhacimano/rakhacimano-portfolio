
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, User, ImageIcon } from "lucide-react";
import { getBlogBySlug, getAllBlogs } from "@/lib/blog";
import ButtonPrimary from "@/components/ButtonPrimary";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate Static Params for SSG
// Force dynamic rendering to ensure fresh data and avoid build-time fetch errors
export const dynamic = "force-dynamic";

export default async function BlogDetail({ params }: PageProps) {
    const { slug } = await params;
    const post = await getBlogBySlug(slug);

    if (!post) {
        return notFound();
    }

    return (
        <article className="min-h-screen bg-white">
            {/* Hero Header */}
            <div className="relative w-full h-[60vh] md:h-[70vh] bg-dark">
                {post.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                        <ImageIcon className="w-20 h-20 text-gray-700" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-20">
                    <div className="max-w-4xl mx-auto w-full">
                        {/* Back Button */}
                        <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-widest">
                            <ArrowLeft size={16} />
                            Back to Insights
                        </Link>

                        <div className="flex flex-wrap items-center gap-4 text-primary font-mono text-sm font-bold uppercase tracking-widest mb-6">
                            <span className="px-3 py-1 border border-primary/50 rounded-full">{post.category}</span>
                            <span className="w-1 h-1 bg-primary rounded-full"></span>
                            <span>{post.readingTime}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 relative bg-gray-800 flex items-center justify-center">
                                {post.author?.avatar ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                        src={post.author.avatar}
                                        alt={post.author?.name || 'Author'}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-lg font-bold text-white">
                                        {(post.author?.name || 'A').charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <div>
                                <p className="text-white font-bold">{post.author?.name || 'Admin'}</p>
                                <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-wide">
                                    <span>{post.author?.role || 'Editor'}</span>
                                    <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="max-w-3xl mx-auto px-6 py-20 md:py-32">
                {/* Lead Text */}
                <p className="text-xl md:text-2xl font-serif italic text-gray-500 mb-12 leading-relaxed border-l-4 border-primary pl-6">
                    {post.excerpt}
                </p>

                {/* HTML Content Render */}
                <div
                    className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-dark prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:w-full prose-strong:text-dark font-sans"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                <div className="mt-20 pt-10 border-t border-gray-100">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Related Topics</h4>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="px-4 py-2 bg-gray-50 text-dark text-xs font-bold uppercase tracking-wide rounded-sm">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-50 py-20 px-6 text-center border-t border-gray-100">
                <h3 className="text-3xl font-black uppercase mb-6">Enjoyed this article?</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">Subscribe for more insights on design systems and future-proof interfaces.</p>
                <ButtonPrimary href="mailto:rakhacimano@gmail.com">
                    Discuss This Topic
                </ButtonPrimary>
            </div>
        </article>
    );
}
