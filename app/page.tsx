import { sanityFetch } from "@/sanity/lib/live";
import { LANDING_PAGE_QUERY } from "@/sanity/lib/queries";
import { defaultLandingPageContent } from "@/sanity/initial-data";
import { HomePageClient } from "@/components/home-page-client";
import { SiteHeader } from "@/components/site-header";

export default async function Home() {
  const { data: pageData } = await sanityFetch({
    query: LANDING_PAGE_QUERY,
  });

  // Filter out null, undefined, empty string, or empty array values so unpopulated Sanity fields never erase existing copy
  const cleanPageData = pageData
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

  // Merge Sanity data with default landing page content as fallback
  const content = {
    ...defaultLandingPageContent,
    ...cleanPageData,
  };

  return (
    <>
      <SiteHeader />
      <HomePageClient content={content} />
    </>
  );
}

