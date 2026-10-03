import { sanityFetch } from "@/sanity/lib/live";
import { RIDGEWELL_CASE_STUDY_QUERY } from "@/sanity/lib/queries";
import {
  defaultRidgewellCaseStudyContent,
  type RidgewellCaseStudyContent,
} from "@/sanity/schemaTypes/ridgewellCaseStudyType";
import { SiteHeader } from "@/components/site-header";
import { SanityFooter } from "@/components/sanity-footer";
import { RidgewellCaseStudyClient } from "@/components/ridgewell-case-study-client";
import { pageMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta(
  "Ridgewell Landscape & Design Case Study",
  "Ridgewell's result shows why we look beyond clicks. The number that matters is what those inquiries turn into for the business.",
  "/case-studies/ridgewell-landscape-design"
);

export default async function RidgewellCaseStudyPage() {
  const { data: pageData } = await sanityFetch({
    query: RIDGEWELL_CASE_STUDY_QUERY,
  });

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

  const content: RidgewellCaseStudyContent = {
    ...defaultRidgewellCaseStudyContent,
    ...clean,
  } as RidgewellCaseStudyContent;

  return (
    <>
      <SiteHeader />
      <RidgewellCaseStudyClient content={content} />
      <SanityFooter />
    </>
  );
}
