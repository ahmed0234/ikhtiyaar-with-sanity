import { sanityFetch } from "@/sanity/lib/live";
import { CHATGPT_ADS_PAGE_QUERY } from "@/sanity/lib/queries";
import {
  defaultChatgptAdsContent,
  type ChatgptAdsPageContent,
} from "@/sanity/schemaTypes/chatgptAdsPageType";
import { SiteHeader } from "@/components/site-header";
import { SanityFooter } from "@/components/sanity-footer";
import { ChatgptAdsPageClient } from "@/components/chatgpt-ads-page-client";
import { pageMeta, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta(
  "ChatGPT Ads for Service Businesses",
  "Explore whether advertising in ChatGPT could help your business reach the right people. Start with a clear offer and a sensible test.",
  "/services/chatgpt-ads"
);

export default async function ChatgptAdsPage() {
  const { data: pageData } = await sanityFetch({ query: CHATGPT_ADS_PAGE_QUERY });

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

  const content: ChatgptAdsPageContent = {
    ...defaultChatgptAdsContent,
    ...clean,
  } as ChatgptAdsPageContent;

  return (
    <>
      <SiteHeader />
      <ChatgptAdsPageClient content={content} />
      <SanityFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "ChatGPT Ads",
            description:
              "Explore whether advertising in ChatGPT could help your business reach the right people. Start with a clear offer and a sensible test.",
            url: `${SITE_URL}/services/chatgpt-ads`,
            provider: { "@type": "Organization", name: "Ikhtiyaar LLC" },
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
