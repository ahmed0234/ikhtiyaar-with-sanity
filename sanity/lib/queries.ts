import { groq } from "next-sanity";

// Query root landing page content (singleton document)
export const LANDING_PAGE_QUERY = groq`
  *[_type == "landingPage" || _id == "landingPage"][0] {
    _id,
    heroHeadingLine1,
    heroHeadingLine2,
    heroDescription,
    heroCtaButtonText,
    heroCtaSecondaryText,
    heroProofTitle,
    heroProofSubtitle,
    heroTrust1,
    heroTrust2,
    resultsEyebrow,
    resultsHeading,
    resultsDescription,
    resultsProjectName,
    resultsProjectLocation,
    resultsBadgeEyebrow,
    resultsBadgeTitle,
    stat1Value,
    stat1Label,
    stat2Value,
    stat2Label,
    resultsDisclaimer,
    resultsCtaText,
    ownershipEyebrow,
    ownershipHeading,
    ownershipParagraph1,
    ownershipParagraph2,
    ownershipButtonText,
    outcomesEyebrow,
    outcomesHeading,
    outcomesSubtitle,
    finalEyebrow,
    finalHeading,
    finalDescription,
    finalButtonText,
    finalMicroCopy
  }
`;

// Query all published blog posts for index listing (/Ahmed/blogs)
export const BLOG_POSTS_QUERY = groq`
  *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage {
      asset->,
      alt,
      caption,
      hotspot
    },
    author,
    publishedAt,
    updatedAt,
    categories,
    tags,
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180)
  }
`;

// Query single blog post by slug (/Ahmed/blog/[slug])
export const BLOG_POST_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage {
      asset->,
      alt,
      caption,
      hotspot
    },
    author,
    publishedAt,
    updatedAt,
    categories,
    tags,
    content[] {
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    },
    seoTitle,
    seoDescription,
    seoImage {
      asset->
    },
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180)
  }
`;

// Query slugs for static generation
export const BLOG_SLUGS_QUERY = groq`
  *[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current }
`;
