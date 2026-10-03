import { sanityFetch } from "@/sanity/lib/live";
import { CASEY_CASE_STUDY_QUERY } from "@/sanity/lib/queries";
import {
  defaultCaseyCaseStudyContent,
  type CaseyCaseStudyContent,
} from "@/sanity/schemaTypes/caseyCaseStudyType";
import { SiteHeader } from "@/components/site-header";
import { SanityFooter } from "@/components/sanity-footer";
import { CaseyCaseStudyClient } from "@/components/casey-case-study-client";
import { pageMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta(
  "Casey Insurance Group Case Study",
  "Casey Insurance Group's search presence now brings an average of 2,000 organic visitors a month, with more than 100 leads generated through our SEO work.",
  "/case-studies/casey-insurance-group"
);

export default async function CaseyCaseStudyPage() {
  const { data: pageData } = await sanityFetch({
    query: CASEY_CASE_STUDY_QUERY,
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

  const content: CaseyCaseStudyContent = {
    ...defaultCaseyCaseStudyContent,
    ...clean,
  } as CaseyCaseStudyContent;

  return (
    <>
      <SiteHeader />
      <CaseyCaseStudyClient content={content} />
      <SanityFooter />
    </>
  );
}
