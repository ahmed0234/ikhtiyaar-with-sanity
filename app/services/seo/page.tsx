import { sanityFetch } from "@/sanity/lib/live";
import { SEO_PAGE_QUERY } from "@/sanity/lib/queries";
import {
  defaultSeoContent,
  type SeoPageContent,
} from "@/sanity/schemaTypes/seoPageType";
import { SiteHeader } from "@/components/site-header";
import { SanityFooter } from "@/components/sanity-footer";
import { SeoPageClient } from "@/components/seo-page-client";
import { pageMeta, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta(
  "Search Engine Optimization for Service Businesses",
  "Help people find your business in Google’s regular search results, with useful pages that turn the right visits into inquiries.",
  "/services/seo"
);

export default async function SeoPage() {
  const { data: pageData } = await sanityFetch({ query: SEO_PAGE_QUERY });

  // Merge Sanity data over defaults — empty/null fields never erase built-in copy
  const clean = pageData
    ? Object.fromEntries(
        Object.entries(pageData).filter(
          ([, v]) =>
            v !== null &&
            v !== undefined &&
            v !== "" &&
            (!Array.isArray(v) || v.length > 0)
        )
      )
    : {};

  const content: SeoPageContent = {
    ...defaultSeoContent,
    ...clean,
  } as SeoPageContent;

  return (
    <>
      <SiteHeader />
      <SeoPageClient content={content} />
      <SanityFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Search Engine Optimization",
            description:
              "Help people find your business in Google’s regular search results, with useful pages that turn the right visits into inquiries.",
            url: `${SITE_URL}/services/seo`,
            provider: { "@type": "Organization", name: "Ikhtiyaar LLC" },
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
