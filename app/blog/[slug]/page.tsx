import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter, PageCTA } from "@/components/site-footer";
import { sanityFetch } from "@/sanity/lib/live";
import { BLOG_POST_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { PortableTextRenderer } from "@/components/portable-text-renderer";
import { SITE_URL } from "@/lib/seo";
import type { SanityBlogPostDetail } from "@/sanity/lib/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await sanityFetch<SanityBlogPostDetail>({
    query: BLOG_POST_QUERY,
    params: { slug },
    stega: false, // Disable stega to prevent invisible characters in <head> tags
  });

  if (!post) {
    return {
      title: "Article Not Found | Ikhtiyaar LLC",
      robots: { index: false, follow: false },
    };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const ogImageUrl =
    post.seoImage || post.featuredImage
      ? urlForImage(post.seoImage || post.featuredImage)
          ?.width(1200)
          .height(630)
          .url()
      : undefined;

  return {
    title: `${title} | Ikhtiyaar LLC`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: post } = await sanityFetch<SanityBlogPostDetail>({
    query: BLOG_POST_QUERY,
    params: { slug },
  });

  if (!post) {
    notFound();
  }

  const featuredImageUrl = post.featuredImage
    ? urlForImage(post.featuredImage)?.width(1400).height(780).url()
    : null;

  const dateFormatted = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const updatedDateFormatted = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author || "Ikhtiyaar Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Ikhtiyaar LLC",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/ikhtiyaar-logo.png`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    ...(featuredImageUrl ? { image: featuredImageUrl } : {}),
  };

  return (
    <>
      <SiteHeader />
      <main id="main" className="section" style={{ paddingTop: "2.5rem", paddingBottom: "5rem" }}>
        <div className="container" style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.25rem" }}>
          {/* Breadcrumb Navigation */}
          <div style={{ marginBottom: "2rem" }}>
            <a
              className="breadcrumb dark"
              href="/blog"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
            >
              ← Back to all articles
            </a>
          </div>

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              {post.categories.map((cat) => (
                <span
                  key={cat}
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    background: "#e0f2fe",
                    color: "#0369a1",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "4px",
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Article Title */}
          <h1
            style={{
              fontSize: "clamp(2.1rem, 4vw, 3.25rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#0f172a",
              marginBottom: "1.25rem",
            }}
          >
            {post.title}
          </h1>

          {/* Metadata Row: Author, Date, Reading Time */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              paddingBottom: "1.75rem",
              borderBottom: "1px solid #e2e8f0",
              color: "#64748b",
              fontSize: "0.95rem",
            }}
          >
            {post.author && (
              <span style={{ fontWeight: 600, color: "#1e293b" }}>
                By {post.author}
              </span>
            )}
            {dateFormatted && <span>{dateFormatted}</span>}
            {updatedDateFormatted && (
              <span style={{ fontStyle: "italic", fontSize: "0.85rem" }}>
                (Updated: {updatedDateFormatted})
              </span>
            )}
            {post.estimatedReadingTime && (
              <span>· {post.estimatedReadingTime} min read</span>
            )}
          </div>

          {/* Featured Image */}
          {featuredImageUrl && (
            <figure style={{ margin: "2.5rem 0" }}>
              <img
                src={featuredImageUrl}
                alt={post.featuredImage?.alt || post.title}
                style={{
                  width: "100%",
                  maxHeight: "560px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
                }}
              />
              {post.featuredImage?.caption && (
                <figcaption
                  style={{
                    textAlign: "center",
                    fontSize: "0.875rem",
                    color: "#64748b",
                    marginTop: "0.6rem",
                    fontStyle: "italic",
                  }}
                >
                  {post.featuredImage.caption}
                </figcaption>
              )}
            </figure>
          )}

          {/* Lead Paragraph / Excerpt */}
          {post.excerpt && (
            <div
              style={{
                fontSize: "1.25rem",
                lineHeight: 1.65,
                color: "#1e293b",
                fontWeight: 500,
                marginBottom: "2.5rem",
                paddingBottom: "1.5rem",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              {post.excerpt}
            </div>
          )}

          {/* Rich Body Content (Portable Text) */}
          <div className="article-body">
            <PortableTextRenderer value={post.content} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div
              style={{
                marginTop: "3.5rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <strong style={{ fontSize: "0.85rem", color: "#475569", marginRight: "0.5rem" }}>
                Topics:
              </strong>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.8rem",
                    background: "#f8fafc",
                    color: "#475569",
                    border: "1px solid #e2e8f0",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "6px",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author / Editorial Box */}
          <div
            style={{
              marginTop: "3rem",
              padding: "1.75rem",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#0f172a",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "1.1rem",
                flexShrink: 0,
              }}
            >
              IK
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>
                Published by {post.author || "Ikhtiyaar LLC"}
              </h3>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.9rem", color: "#64748b", lineHeight: 1.5 }}>
                Providing clear, straightforward marketing advice and inquiry generation systems for service businesses.
              </p>
            </div>
          </div>
        </div>
      </main>

      <PageCTA />
      <SiteFooter />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
