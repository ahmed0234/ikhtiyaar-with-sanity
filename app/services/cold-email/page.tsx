import { sanityFetch } from "@/sanity/lib/live";
import { COLD_EMAIL_PAGE_QUERY } from "@/sanity/lib/queries";
import {
  defaultColdEmailContent,
  type ColdEmailPageContent,
} from "@/sanity/schemaTypes/coldEmailPageType";
import { SiteHeader } from "@/components/site-header";
import { SanityFooter } from "@/components/sanity-footer";
import { ColdEmailPageClient } from "@/components/cold-email-page-client";
import { pageMeta, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta(
  "Cold Email for Service Businesses",
  "Reach relevant business owners, property managers, and decision-makers with a clear reason to talk. Built for business-to-business opportunities.",
  "/services/cold-email"
);

export default async function ColdEmailPage() {
  const { data: pageData } = await sanityFetch({ query: COLD_EMAIL_PAGE_QUERY });

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

  const content: ColdEmailPageContent = {
    ...defaultColdEmailContent,
    ...clean,
  } as ColdEmailPageContent;

  return (
    <>
      <SiteHeader />
      <ColdEmailPageClient content={content} />
      <SanityFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Cold Email",
            description:
              "Reach relevant business owners, property managers, and decision-makers with a clear reason to talk. Built for business-to-business opportunities.",
            url: `${SITE_URL}/services/cold-email`,
            provider: { "@type": "Organization", name: "Ikhtiyaar LLC" },
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
