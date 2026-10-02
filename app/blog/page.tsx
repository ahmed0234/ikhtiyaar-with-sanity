import { SiteHeader } from "@/components/site-header";
import { SiteFooter, PageCTA } from "@/components/site-footer";
import { sanityFetch } from "@/sanity/lib/live";
import { BLOG_POSTS_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { pageMeta } from "@/lib/seo";
import type { SanityBlogPostCard } from "@/sanity/lib/types";

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

        <section className="section">
          <div className="container">
            {!posts || posts.length === 0 ? (
              <div className="empty-state">
                <span className="eyebrow">GOOD ADVICE TAKES THOUGHT</span>
                <h2>Our first articles are on the way.</h2>
                <p>
                  In the meantime, see what our work has done for other
                  businesses.
                </p>
                <a href="/case-studies" className="button button-dark">
                  Explore the case studies
                </a>
              </div>
            ) : (
              <div className="blog-grid">
                {posts.map((post) => {
                  const imageUrl = post.featuredImage
                    ? urlForImage(post.featuredImage)?.width(800).height(480).url()
                    : null;

                  const dateFormatted = post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Draft";

                  return (
                    <a
                      className="blog-card"
                      href={`/blog/${post.slug}`}
                      key={post._id}
                    >
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={post.featuredImage?.alt || post.title}
                          loading="lazy"
                        />
                      )}

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "0.5rem",
                          marginBottom: "0.25rem",
                        }}
                      >
                        <span className="eyebrow">{dateFormatted}</span>
                        {post.categories?.[0] && (
                          <span
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              background: "#f1f5f9",
                              color: "#475569",
                              padding: "0.15rem 0.6rem",
                              borderRadius: "999px",
                              letterSpacing: "0.02em",
                            }}
                          >
                            {post.categories[0]}
                          </span>
                        )}
                      </div>

                      <h2>{post.title}</h2>
                      <p>{post.excerpt}</p>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: "auto",
                          paddingTop: "0.75rem",
                        }}
                      >
                        <strong>Read article</strong>
                        {post.author && (
                          <span
                            style={{
                              fontSize: "0.85rem",
                              color: "#64748b",
                            }}
                          >
                            By {post.author}
                          </span>
                        )}
                      </div>
                    </a>
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
