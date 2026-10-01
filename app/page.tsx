import { sanityFetch } from "@/sanity/lib/live";
import { LANDING_PAGE_QUERY } from "@/sanity/lib/queries";
import { defaultLandingPageContent } from "@/sanity/initial-data";
import { HomePageClient } from "@/components/home-page-client";

export default async function Home() {
  const { data: pageData } = await sanityFetch({
    query: LANDING_PAGE_QUERY,
  });

  // Merge Sanity data with default landing page content as fallback
  const content = {
    ...defaultLandingPageContent,
    ...(pageData || {}),
  };

  return <HomePageClient content={content} />;
}
