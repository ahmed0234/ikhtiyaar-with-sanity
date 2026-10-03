import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter, PageCTA } from "@/components/site-footer";
import { sanityFetch } from "@/sanity/lib/live";
import { BLOG_POSTS_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { pageMeta } from "@/lib/seo";
import type { SanityBlogPostCard } from "@/sanity/lib/types";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = pageMeta(
  "Practical Marketing Advice for Service Businesses",
  "Plain-language advice to help your business get found, bring in better inquiries, and turn more opportunities into work.",
  "/blog",
);

export default async function BlogPage() {
  const { data: posts } = await sanityFetch<SanityBlogPostCard[]>({
    query: BLOG_POSTS_QUERY,
  });

  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="inner-hero">
          <div className="container">
            <span className="eyebrow">THE IKHTIYAAR BLOG</span>
            <h1>
              A little clarity.
              <br />
              <em>A better next step.</em>
            </h1>
            <p>
              Straightforward advice on getting found, bringing in inquiries,
              and making your marketing work harder.
            </p>
          </div>
        </section>

        {/* ── ARTICLES GRID ─────────────────────────────────────────────────── */}
        <section className="section" style={{ background: "#f8fbfe", padding: "4rem 0 6rem" }}>
          <div className="container">
            {!posts || posts.length === 0 ? (
              <div className="empty-state">
                <span className="eyebrow">GOOD ADVICE TAKES THOUGHT</span>
                <h2>Our first articles are on the way.</h2>
                <p>
                  In the meantime, see what our work has done for other
                  businesses.
                </p>
                <Link href="/case-studies" className="button button-dark">
                  Explore the case studies
                </Link>
              </div>
            ) : (
              <div className="blog-grid">
                {posts.map((post) => {
                  const imageUrl = post.featuredImage
                    ? urlForImage(post.featuredImage)?.width(800).height(500).url()
                    : null;

                  const dateFormatted = post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Recently";

                  const readingTime =
                    post.estimatedReadingTime && post.estimatedReadingTime > 0
                      ? post.estimatedReadingTime
                      : 1;

                  return (
                    <Link
                      className="blog-card"
                      href={`/blog/${post.slug}`}
                      key={post._id}
                      aria-label={`Read article: ${post.title}`}
                    >
                      {/* Framed Image Container */}
                      <div className="blog-card-image-wrap">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={post.featuredImage?.alt || post.title}
                            loading="lazy"
                            className="blog-card-img"
                          />
                        ) : (
                          <div className="blog-card-placeholder">
                            <span>IKHTIYAAR</span>
                          </div>
                        )}

                        {post.categories?.[0] && (
                          <span className="blog-card-badge">
                            {post.categories[0]}
                          </span>
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="blog-card-content">
                        <div className="blog-card-meta">
                          <span className="blog-meta-item">
                            <Calendar size={13} />
                            <span>{dateFormatted}</span>
                          </span>
                          <span className="blog-meta-dot">·</span>
                          <span className="blog-meta-item">
                            <Clock size={13} />
                            <span>{readingTime} min read</span>
                          </span>
                        </div>

                        <h2 className="blog-card-title">{post.title}</h2>
                        {post.excerpt && (
                          <p className="blog-card-excerpt">{post.excerpt}</p>
                        )}

                        {/* Card Footer Bar */}
                        <div className="blog-card-footer">
                          <div className="blog-card-author">
                            <div className="blog-author-avatar">
                              {post.author ? post.author.slice(0, 2).toUpperCase() : "IK"}
                            </div>
                            <span className="blog-author-name">
                              {post.author || "Ikhtiyaar Team"}
                            </span>
                          </div>

                          <span className="blog-card-cta">
                            <span>Read article</span>
                            <ArrowRight size={15} className="blog-cta-arrow" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <PageCTA />
      </main>
      <SiteFooter />
    </>
  );
}
