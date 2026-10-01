import { defineField, defineType } from "sanity";
import { defaultLandingPageContent } from "../initial-data";

export const landingPageType = defineType({
  name: "landingPage",
  title: "Landing Page (Root /)",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section", default: true },
    { name: "results", title: "Ridgewell Results & Stats" },
    { name: "ownership", title: "Ownership (Stop Racing Leads)" },
    { name: "outcomes", title: "Outcomes" },
    { name: "finalCta", title: "Final CTA" },
  ],
  fields: [
    // ----------------------------------------------------
    // HERO SECTION (Screenshot 1)
    // ----------------------------------------------------
    defineField({
      name: "heroHeadingLine1",
      title: "Hero Heading (Line 1)",
      type: "string",
      group: "hero",
      initialValue: defaultLandingPageContent.heroHeadingLine1,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroHeadingLine2",
      title: "Hero Heading (Line 2 - Blue Accent)",
      type: "string",
      group: "hero",
      initialValue: defaultLandingPageContent.heroHeadingLine2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description (Red-box copy)",
      type: "text",
      rows: 3,
      group: "hero",
      initialValue: defaultLandingPageContent.heroDescription,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroCtaButtonText",
      title: "Hero Primary Button Text",
      type: "string",
      group: "hero",
      initialValue: defaultLandingPageContent.heroCtaButtonText,
    }),
    defineField({
      name: "heroCtaSecondaryText",
      title: "Hero Secondary Link Text",
      type: "string",
      group: "hero",
      initialValue: defaultLandingPageContent.heroCtaSecondaryText,
    }),
    defineField({
      name: "heroProofTitle",
      title: "Hero Proof Text (e.g. $1M+ revenue)",
      type: "string",
      group: "hero",
      initialValue: defaultLandingPageContent.heroProofTitle,
    }),
    defineField({
      name: "heroProofSubtitle",
      title: "Hero Proof Subtitle",
      type: "string",
      group: "hero",
      initialValue: defaultLandingPageContent.heroProofSubtitle,
    }),
    defineField({
      name: "heroTrust1",
      title: "Hero Trust Badge 1",
      type: "string",
      group: "hero",
      initialValue: defaultLandingPageContent.heroTrust1,
    }),
    defineField({
      name: "heroTrust2",
      title: "Hero Trust Badge 2",
      type: "string",
      group: "hero",
      initialValue: defaultLandingPageContent.heroTrust2,
    }),

    // ----------------------------------------------------
    // RIDGEWELL RESULTS & STATS (Screenshot 2)
    // ----------------------------------------------------
    defineField({
      name: "resultsEyebrow",
      title: "Results Eyebrow",
      type: "string",
      group: "results",
      initialValue: defaultLandingPageContent.resultsEyebrow,
    }),
    defineField({
      name: "resultsHeading",
      title: "Results Main Heading (Red-box copy)",
      type: "string",
      group: "results",
      initialValue: defaultLandingPageContent.resultsHeading,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "resultsDescription",
      title: "Results Description",
      type: "text",
      rows: 3,
      group: "results",
      initialValue: defaultLandingPageContent.resultsDescription,
    }),
    defineField({
      name: "resultsBadgeEyebrow",
      title: "Client Image Badge Eyebrow",
      type: "string",
      group: "results",
      initialValue: defaultLandingPageContent.resultsBadgeEyebrow,
    }),
    defineField({
      name: "resultsBadgeTitle",
      title: "Client Image Badge Heading",
      type: "string",
      group: "results",
      initialValue: defaultLandingPageContent.resultsBadgeTitle,
    }),
    defineField({
      name: "stat1Value",
      title: "Stat 1 Number / Value (Red-box copy: 80+)",
      type: "string",
      group: "results",
      initialValue: defaultLandingPageContent.stat1Value,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "stat1Label",
      title: "Stat 1 Label (e.g. homeowner inquiries in two months)",
      type: "string",
      group: "results",
      initialValue: defaultLandingPageContent.stat1Label,
    }),
    defineField({
      name: "stat2Value",
      title: "Stat 2 Number / Value (Red-box copy: $200k)",
      type: "string",
      group: "results",
      initialValue: defaultLandingPageContent.stat2Value,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "stat2Label",
      title: "Stat 2 Label (e.g. in client-reported revenue)",
      type: "string",
      group: "results",
      initialValue: defaultLandingPageContent.stat2Label,
    }),
    defineField({
      name: "resultsDisclaimer",
      title: "Results Disclaimer Note",
      type: "text",
      rows: 2,
      group: "results",
      initialValue: defaultLandingPageContent.resultsDisclaimer,
    }),
    defineField({
      name: "resultsCtaText",
      title: "Results Link Text",
      type: "string",
      group: "results",
      initialValue: defaultLandingPageContent.resultsCtaText,
    }),

    // ----------------------------------------------------
    // OWNERSHIP SECTION (Screenshot 3)
    // ----------------------------------------------------
    defineField({
      name: "ownershipEyebrow",
      title: "Ownership Eyebrow",
      type: "string",
      group: "ownership",
      initialValue: defaultLandingPageContent.ownershipEyebrow,
    }),
    defineField({
      name: "ownershipHeading",
      title: "Ownership Heading (Red-box copy: Stop racing five other contractors...)",
      type: "string",
      group: "ownership",
      initialValue: defaultLandingPageContent.ownershipHeading,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ownershipParagraph1",
      title: "Ownership Paragraph 1",
      type: "text",
      rows: 2,
      group: "ownership",
      initialValue: defaultLandingPageContent.ownershipParagraph1,
    }),
    defineField({
      name: "ownershipParagraph2",
      title: "Ownership Paragraph 2",
      type: "text",
      rows: 2,
      group: "ownership",
      initialValue: defaultLandingPageContent.ownershipParagraph2,
    }),
    defineField({
      name: "ownershipButtonText",
      title: "Ownership Button Text",
      type: "string",
      group: "ownership",
      initialValue: defaultLandingPageContent.ownershipButtonText,
    }),

    // ----------------------------------------------------
    // OUTCOMES SECTION
    // ----------------------------------------------------
    defineField({
      name: "outcomesEyebrow",
      title: "Outcomes Eyebrow",
      type: "string",
      group: "outcomes",
      initialValue: defaultLandingPageContent.outcomesEyebrow,
    }),
    defineField({
      name: "outcomesHeading",
      title: "Outcomes Heading",
      type: "string",
      group: "outcomes",
      initialValue: defaultLandingPageContent.outcomesHeading,
    }),
    defineField({
      name: "outcomesSubtitle",
      title: "Outcomes Subtitle",
      type: "text",
      rows: 2,
      group: "outcomes",
      initialValue: defaultLandingPageContent.outcomesSubtitle,
    }),

    // ----------------------------------------------------
    // FINAL CTA SECTION (Screenshot 4)
    // ----------------------------------------------------
    defineField({
      name: "finalEyebrow",
      title: "Final CTA Eyebrow",
      type: "string",
      group: "finalCta",
      initialValue: defaultLandingPageContent.finalEyebrow,
    }),
    defineField({
      name: "finalHeading",
      title: "Final CTA Heading (Red-box copy: Got room for a few more good jobs?)",
      type: "string",
      group: "finalCta",
      initialValue: defaultLandingPageContent.finalHeading,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "finalDescription",
      title: "Final CTA Description",
      type: "text",
      rows: 2,
      group: "finalCta",
      initialValue: defaultLandingPageContent.finalDescription,
    }),
    defineField({
      name: "finalButtonText",
      title: "Final CTA Button Text",
      type: "string",
      group: "finalCta",
      initialValue: defaultLandingPageContent.finalButtonText,
    }),
    defineField({
      name: "finalMicroCopy",
      title: "Final CTA Micro-copy Note",
      type: "string",
      group: "finalCta",
      initialValue: defaultLandingPageContent.finalMicroCopy,
    }),
  ],
  preview: {
    select: {
      title: "heroHeadingLine1",
      subtitle: "heroHeadingLine2",
    },
    prepare({ title, subtitle }) {
      return {
        title: title ? `${title} ${subtitle || ""}` : "Root Landing Page",
        subtitle: "Root / Content",
      };
    },
  },
});
