import { sanityFetch } from "@/sanity/lib/live";
import { AEO_PAGE_QUERY } from "@/sanity/lib/queries";
import {
  defaultAeoContent,
  type AeoPageContent,
} from "@/sanity/schemaTypes/aeoPageType";
import { SiteHeader } from "@/components/site-header";
import { SanityFooter } from "@/components/sanity-footer";
import { AeoPageClient } from "@/components/aeo-page-client";
import { pageMeta, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta(
  "AEO for Service Businesses",
  "Make your expertise easier to understand when people use search engines and AI tools to ask questions about your services.",
  "/services/aeo"
);

export default async function AeoPage() {
  const { data: pageData } = await sanityFetch({ query: AEO_PAGE_QUERY });

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

  const content: AeoPageContent = {
    ...defaultAeoContent,
    ...clean,
  } as AeoPageContent;

  return (
    <>
      <SiteHeader />
      <AeoPageClient content={content} />
      <SanityFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "AEO",
            description:
              "Make your expertise easier to understand when people use search engines and AI tools to ask questions about your services.",
            url: `${SITE_URL}/services/aeo`,
            provider: { "@type": "Organization", name: "Ikhtiyaar LLC" },
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
