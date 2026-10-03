import { defineArrayMember, defineField, defineType } from "sanity";

// --------------------------------------------------------------------------
// Default content — exact copy from existing /case-studies page
// Used as initialValue so Live Preview immediately shows the existing copy.
// --------------------------------------------------------------------------
export const defaultCaseStudiesContent = {
  _id: "caseStudiesPage",
  _type: "caseStudiesPage",

  // Hero
  heroEyebrow: "CASE STUDIES",
  heroHeadingLine1: "Real businesses.",
  heroHeadingLine2: "Results worth talking about.",
  heroIntro:
    "Different businesses. Different ways to get found. Here's what the work produced.",

  // Case Studies List
  cases: [
    {
      _key: "case-ridgewell",
      clientName: "Ridgewell Landscape & Design",
      service: "Google Ads",
      headline: "A $4,000 ad spend. $200,000 in revenue.",
      intro:
        "Ridgewell's result shows why we look beyond clicks. The number that matters is what those inquiries turn into for the business.",
      buttonText: "Read the case study",
      buttonHref: "/case-studies/ridgewell-landscape-design",
      visualType: "image",
      backgroundColor: "#092c40",
      statBadge: "Ridgewell Landscape & Design",
      statNumber: "$200,000",
      statLabel: "in client revenue",
    },
    {
      _key: "case-casey",
      clientName: "Casey Insurance Group",
      service: "Search Engine Optimization",
      headline: "A growing source of visits. More than 100 leads.",
      intro:
        "Casey Insurance Group's search presence now brings an average of 2,000 organic visitors a month, with more than 100 leads generated through our SEO work.",
      buttonText: "Read the case study",
      buttonHref: "/case-studies/casey-insurance-group",
      visualType: "statCard",
      backgroundColor: "#092c40",
      statBadge: "Casey Insurance Group",
      statNumber: "2,000",
      statLabel: "average monthly organic visitors",
    },
  ],

  // Page CTA
  ctaEyebrow: "LET'S TALK ABOUT YOUR BUSINESS",
  ctaHeading: "What would better inquiries mean for you?",
  ctaBody:
    "Tell us what you do, where you work, and what you want more of. We'll figure out whether we can help.",
  ctaButtonText: "Let's look at what's possible",
  ctaButtonHref: "/#contact",
};

// --------------------------------------------------------------------------
// Schema definition
// --------------------------------------------------------------------------
export const caseStudiesPageType = defineType({
  name: "caseStudiesPage",
  title: "Case Studies Page (/case-studies)",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section", default: true },
    { name: "cases", title: "Case Studies List" },
    { name: "cta", title: "Page CTA" },
  ],
  fields: [
    // ── HERO ──────────────────────────────────────────────────────────────────
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      group: "hero",
      initialValue: defaultCaseStudiesContent.heroEyebrow,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroHeadingLine1",
      title: "Hero Heading (Line 1)",
      type: "string",
      group: "hero",
      initialValue: defaultCaseStudiesContent.heroHeadingLine1,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroHeadingLine2",
      title: "Hero Heading (Line 2 - Italic / Emphasis)",
      type: "string",
      group: "hero",
      initialValue: defaultCaseStudiesContent.heroHeadingLine2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroIntro",
      title: "Hero Intro Paragraph",
      type: "text",
      rows: 3,
      group: "hero",
      initialValue: defaultCaseStudiesContent.heroIntro,
      validation: (rule) => rule.required(),
    }),

    // ── CASE STUDIES LIST ─────────────────────────────────────────────────────
    defineField({
      name: "cases",
      title: "Case Studies",
      type: "array",
      group: "cases",
      initialValue: defaultCaseStudiesContent.cases,
      of: [
        defineArrayMember({
          type: "object",
          name: "caseStudyItem",
          title: "Case Study Item",
          fields: [
            defineField({
              name: "clientName",
              title: "Client / Business Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "service",
              title: "Service Badge (Eyebrow)",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "headline",
              title: "Headline",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "intro",
              title: "Intro / Summary",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "buttonText",
              title: "Button Text",
              type: "string",
              initialValue: "Read the case study",
            }),
            defineField({
              name: "buttonHref",
              title: "Button Link",
              type: "string",
              description:
                "URL to case study page, e.g. /case-studies/ridgewell-landscape-design",
            }),
            defineField({
              name: "visualType",
              title: "Visual Display Type",
              type: "string",
              options: {
                list: [
                  { title: "Featured Image", value: "image" },
                  { title: "Stat Card (Dark Background)", value: "statCard" },
                ],
                layout: "radio",
              },
              initialValue: "image",
              description:
                "Choose whether to display a featured image or a text/stats card with dark background.",
            }),
            defineField({
              name: "image",
              title: "Case Study Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  type: "string",
                  title: "Alternative Text",
                }),
              ],
              description:
                "Upload or replace the image for this case study. Used when Visual Display Type is 'Featured Image' (or if an image is provided).",
            }),
            defineField({
              name: "backgroundColor",
              title: "Stat Card Background Color (hex)",
              type: "string",
              description:
                "Custom background color for the stat card (e.g. #092c40). Defaults to #092c40.",
            }),
            defineField({
              name: "statBadge",
              title: "Stat Card — Top Badge / Business Name",
              type: "string",
              description:
                "e.g. Casey Insurance Group (shown when Visual Display Type is Stat Card)",
            }),
            defineField({
              name: "statNumber",
              title: "Stat Card — Big Number",
              type: "string",
              description: "e.g. 2,000",
            }),
            defineField({
              name: "statLabel",
              title: "Stat Card — Subtitle / Metric Label",
              type: "string",
              description: "e.g. average monthly organic visitors",
            }),
          ],
          preview: {
            select: {
              title: "clientName",
              subtitle: "headline",
              media: "image",
            },
          },
        }),
      ],
    }),

    // ── PAGE CTA ──────────────────────────────────────────────────────────────
    defineField({
      name: "ctaEyebrow",
      title: "Page CTA Eyebrow",
      type: "string",
      group: "cta",
      initialValue: defaultCaseStudiesContent.ctaEyebrow,
    }),
    defineField({
      name: "ctaHeading",
      title: "Page CTA Heading",
      type: "string",
      group: "cta",
      initialValue: defaultCaseStudiesContent.ctaHeading,
    }),
    defineField({
      name: "ctaBody",
      title: "Page CTA Body",
      type: "text",
      rows: 3,
      group: "cta",
      initialValue: defaultCaseStudiesContent.ctaBody,
    }),
    defineField({
      name: "ctaButtonText",
      title: "Page CTA Button Text",
      type: "string",
      group: "cta",
      initialValue: defaultCaseStudiesContent.ctaButtonText,
    }),
    defineField({
      name: "ctaButtonHref",
      title: "Page CTA Button Link",
      type: "string",
      group: "cta",
      initialValue: defaultCaseStudiesContent.ctaButtonHref,
    }),
  ],
  preview: {
    select: { title: "heroHeadingLine1", subtitle: "heroIntro" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title ? `Case Studies (${title})` : "Case Studies Page",
        subtitle: subtitle ? subtitle.slice(0, 80) : "/case-studies",
      };
    },
  },
});

export type CaseStudiesPageContent = typeof defaultCaseStudiesContent;
