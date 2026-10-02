import { sanityFetch } from "@/sanity/lib/live";
import { GOOGLE_ADS_PAGE_QUERY } from "@/sanity/lib/queries";
import {
  defaultGoogleAdsContent,
  type GoogleAdsPageContent,
} from "@/sanity/schemaTypes/googleAdsPageType";
import { SiteHeader } from "@/components/site-header";
import { SanityFooter } from "@/components/sanity-footer";
import { GoogleAdsPageClient } from "@/components/google-ads-page-client";
import { pageMeta, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta(
  "Google Ads for Service Businesses",
  "Turn searches for your services into calls from people in your area. We build and manage Google Ads around the jobs you actually want.",
  "/services/google-ads"
);

export default async function GoogleAdsPage() {
  const { data: pageData } = await sanityFetch({ query: GOOGLE_ADS_PAGE_QUERY });

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

  const content: GoogleAdsPageContent = {
    ...defaultGoogleAdsContent,
    ...clean,
  } as GoogleAdsPageContent;

  return (
    <>
      <SiteHeader />
      <GoogleAdsPageClient content={content} />
      <SanityFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Google Ads",
            description:
              "Turn searches for your services into calls from people in your area. We build and manage Google Ads around the jobs you actually want.",
            url: `${SITE_URL}/services/google-ads`,
            provider: { "@type": "Organization", name: "Ikhtiyaar LLC" },
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
