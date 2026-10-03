import { sanityFetch } from "@/sanity/lib/live";
import { META_ADS_PAGE_QUERY } from "@/sanity/lib/queries";
import {
  defaultMetaAdsContent,
  type MetaAdsPageContent,
} from "@/sanity/schemaTypes/metaAdsPageType";
import { SiteHeader } from "@/components/site-header";
import { SanityFooter } from "@/components/sanity-footer";
import { MetaAdsPageClient } from "@/components/meta-ads-page-client";
import { pageMeta, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta(
  "Meta Ads for Service Businesses",
  "Put your work in front of potential customers on Facebook and Instagram, and give them an easy way to ask about their own project.",
  "/services/meta-ads"
);

export default async function MetaAdsPage() {
  const { data: pageData } = await sanityFetch({ query: META_ADS_PAGE_QUERY });

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

  const content: MetaAdsPageContent = {
    ...defaultMetaAdsContent,
    ...clean,
  } as MetaAdsPageContent;

  return (
    <>
      <SiteHeader />
      <MetaAdsPageClient content={content} />
      <SanityFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Meta Ads",
            description:
              "Put your work in front of potential customers on Facebook and Instagram, and give them an easy way to ask about their own project.",
            url: `${SITE_URL}/services/meta-ads`,
            provider: { "@type": "Organization", name: "Ikhtiyaar LLC" },
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
