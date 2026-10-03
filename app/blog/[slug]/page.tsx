import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter, PageCTA } from "@/components/site-footer";
import { sanityFetch } from "@/sanity/lib/live";
import { BLOG_POST_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { PortableTextRenderer } from "@/components/portable-text-renderer";
import { ArticleShareButton } from "@/components/article-share-button";
import { SITE_URL } from "@/lib/seo";
import type { SanityBlogPostDetail } from "@/sanity/lib/types";
import { Calendar, Clock, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

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

  const readingTime =
    post.estimatedReadingTime && post.estimatedReadingTime > 0
      ? post.estimatedReadingTime
      : 1;

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
      <main
        id="main"
        className="section"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #f8fbfe 300px, #ffffff 100%)",
          paddingTop: "2rem",
          paddingBottom: "6rem",
        }}
      >
        <article className="article-main-container">
          {/* Top Bar: Back Link + Share Button */}
          <div className="article-top-bar">
            <Link href="/blog" className="article-back-link">
              <ArrowLeft size={15} />
              <span>Back to all articles</span>
            </Link>
            <ArticleShareButton title={post.title} />
          </div>

          {/* Categories Badges */}
          {post.categories && post.categories.length > 0 && (
            <div className="article-categories">
              {post.categories.map((cat) => (
                <span key={cat} className="article-cat-pill">
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Article Title */}
          <h1 className="article-title">{post.title}</h1>

          {/* Editorial Lead Paragraph / Excerpt */}
          {post.excerpt && <p className="article-lead-text">{post.excerpt}</p>}

          {/* Author & Meta Bar */}
          <div className="article-meta-bar">
            <div className="article-author-info">
              <div className="article-author-avatar">
                {post.author ? post.author.slice(0, 2).toUpperCase() : "IK"}
              </div>
              <div>
                <div className="article-author-name">
                  {post.author || "Ikhtiyaar Team"}
                </div>
                <div className="article-author-role">Marketing & Strategy</div>
              </div>
            </div>

            <div className="article-meta-divider" />

            <div className="article-meta-details">
              {dateFormatted && (
                <span className="article-meta-item">
                  <Calendar size={14} />
                  <span>{dateFormatted}</span>
                </span>
              )}
              {updatedDateFormatted && (
                <span className="article-meta-item" style={{ fontStyle: "italic", fontSize: "0.825rem" }}>
                  (Updated: {updatedDateFormatted})
                </span>
              )}
              <span className="article-meta-dot">·</span>
              <span className="article-meta-item">
                <Clock size={14} />
                <span>{readingTime} min read</span>
              </span>
            </div>
          </div>

          {/* Featured Image Frame */}
          {featuredImageUrl && (
            <figure className="article-cover-frame">
              <img
                src={featuredImageUrl}
                alt={post.featuredImage?.alt || post.title}
                className="article-cover-img"
              />
              {post.featuredImage?.caption && (
                <figcaption className="article-cover-caption">
                  {post.featuredImage.caption}
                </figcaption>
              )}
            </figure>
          )}

          {/* Rich Content Body (Portable Text) */}
          <div className="article-content-body">
            <PortableTextRenderer value={post.content} />
          </div>

          {/* Topic Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="article-tags-wrap">
              <span className="article-tags-label">Topics:</span>
              <div className="article-tags-list">
                {post.tags.map((tag) => (
                  <span key={tag} className="article-tag-chip">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Editorial Card */}
          <div className="article-author-card">
            <div className="article-author-card-avatar">
              {post.author ? post.author.slice(0, 2).toUpperCase() : "IK"}
            </div>
            <div className="article-author-card-body">
              <div className="article-author-card-badge">PUBLISHED BY</div>
              <h3>{post.author || "Ikhtiyaar LLC"}</h3>
              <p>
                Providing clear, straightforward marketing advice and inquiry
                generation systems for service businesses that want more good
                jobs and fewer quiet weeks.
              </p>
              <div className="article-author-links">
                <Link href="/about" className="article-author-link">
                  About our company →
                </Link>
                <Link href="/case-studies" className="article-author-link">
                  See client results →
                </Link>
                <Link href="/#contact" className="article-author-link">
                  Work with us →
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Banner back to Blog */}
          <div className="article-nav-banner">
            <div>
              <h4>Looking for more marketing insights?</h4>
              <p>Explore all our articles and practical guides for service businesses.</p>
            </div>
            <Link href="/blog" className="button button-blue" style={{ whiteSpace: "nowrap" }}>
              <span>View all articles</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </article>
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
