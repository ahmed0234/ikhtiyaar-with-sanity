import { defineArrayMember, defineField, defineType } from "sanity";

// --------------------------------------------------------------------------
// Default content — exact copy from content/case-studies.ts and content/case-details.ts
// for the "ridgewell-landscape-design" case study.
// --------------------------------------------------------------------------
export const defaultRidgewellCaseStudyContent = {
  _id: "ridgewellCaseStudy",
  _type: "ridgewellCaseStudy",

  // Hero
  breadcrumbText: "All case studies",
  breadcrumbHref: "/case-studies",
  clientName: "Ridgewell Landscape & Design",
  service: "Google Ads",
  heroEyebrow: "Ridgewell Landscape & Design · Google Ads",
  headline: "A $4,000 ad spend. $200,000 in revenue.",
  intro:
    "Ridgewell's result shows why we look beyond clicks. The number that matters is what those inquiries turn into for the business.",

  // Metrics row
  metrics: [
    {
      _key: "m-1",
      value: "~$4K",
      label: "Advertising spend",
    },
    {
      _key: "m-2",
      value: "$200K",
      label: "Client revenue",
    },
    {
      _key: "m-3",
      value: "~50×",
      label: "Revenue relative to ad spend",
    },
  ],

  // Section: The Business Behind The Numbers
  contextEyebrow: "THE BUSINESS BEHIND THE NUMBERS",
  contextHeading: "What mattered for Ridgewell Landscape & Design",
  contextBody:
    "Ridgewell Landscape & Design works in a market where a single well-matched project can carry meaningful value. The campaign needed to connect the business with people looking for the kind of work it could deliver. Click volume alone would not tell that story.",

  // Objective Callout Box
  objectiveLabel: "The objective",
  objectiveText:
    "Connect local demand with a clear route to an estimate, then judge the advertising against the revenue the business produced.",

  // Section: What The Work Produced
  producedHeading: "What the work produced",
  producedBody:
    "We ran Google Ads for Ridgewell Landscape & Design. With around $4,000 in advertising spend, the business generated $200,000 in revenue. That works out to approximately $50 in revenue for each $1 spent on ads.",

  // Detail image alt
  imageAlt: "Completed Ridgewell outdoor living and landscape project",

  // Section: Understanding The Numbers
  interpretHeading: "Understanding the numbers",
  interpretBody:
    "Using the approximate figures supplied, $200,000 divided by $4,000 is about 50. That is a revenue-to-ad-spend ratio of roughly 50:1. It is not a profit multiple: labor, materials, management fees, overhead, and other costs still need to be accounted for.",

  // Section: Process / How We Approach
  processTitle: "How we approach a campaign like this",
  processNote:
    "The results below are Ridgewell’s reported results. These steps explain our campaign-management approach; they are not a dated account of every change made in this campaign.",
  processSteps: [
    {
      _key: "ps-1",
      title: "Start with the economics",
      text: "We begin with the services, service area, and value of a worthwhile job. That gives a campaign a commercial target: inquiries that could become work worth taking on.",
    },
    {
      _key: "ps-2",
      title: "Match the search to the service",
      text: "We separate distinct customer needs so an ad can speak to the job being requested. Search terms help reveal where the traffic matches the service and where spend needs tightening.",
    },
    {
      _key: "ps-3",
      title: "Make the route to an estimate clear",
      text: "A relevant page should show the work, establish trust, and make calling or requesting an estimate simple. The message needs to stay consistent from the search to the page.",
    },
    {
      _key: "ps-4",
      title: "Connect marketing with what happened next",
      text: "Inquiry tracking starts the picture. Feedback about estimates and completed jobs makes it more useful. Revenue gives the campaign a business outcome beyond click and lead counts.",
    },
  ],

  // Section: What This Means For Your Business
  takeawayHeading: "What this means for your business",
  takeawayBody:
    "The lesson is not that every contractor should expect this return. It is that advertising should be assessed against the value of the work it helps bring in. A useful plan starts with your market, job values, and ability to turn inquiries into customers.",
  lessonBody:
    "For a business taking on valuable landscape and design projects, the right inquiry can be worth far more than a long list of unrelated calls. A useful campaign needs to be judged alongside the work it brings in.",

  // Explore Service Text Link
  serviceLinkText: "Explore Google Ads",
  serviceLinkHref: "/services/google-ads",

  // Result Note Aside
  resultNote:
    "Spend is approximate. Revenue is not profit; the ratio excludes management fees and the cost of completing the work. Individual results vary.",

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
export const ridgewellCaseStudyType = defineType({
  name: "ridgewellCaseStudy",
  title: "Ridgewell Case Study (/case-studies/ridgewell-landscape-design)",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section", default: true },
    { name: "metrics", title: "Metrics & Highlights" },
    { name: "article", title: "Story & Objective" },
    { name: "results", title: "Results & Image" },
    { name: "process", title: "Process Steps" },
    { name: "takeaway", title: "Takeaway & Notes" },
    { name: "cta", title: "Page CTA" },
  ],
  fields: [
    // ── HERO ──────────────────────────────────────────────────────────────────
    defineField({
      name: "breadcrumbText",
      title: "Breadcrumb Link Text",
      type: "string",
      group: "hero",
      initialValue: defaultRidgewellCaseStudyContent.breadcrumbText,
    }),
    defineField({
      name: "breadcrumbHref",
      title: "Breadcrumb URL",
      type: "string",
      group: "hero",
      initialValue: defaultRidgewellCaseStudyContent.breadcrumbHref,
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow (e.g. Client · Service)",
      type: "string",
      group: "hero",
      initialValue: defaultRidgewellCaseStudyContent.heroEyebrow,
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      group: "hero",
      initialValue: defaultRidgewellCaseStudyContent.headline,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Intro Paragraph",
      type: "text",
      rows: 3,
      group: "hero",
      initialValue: defaultRidgewellCaseStudyContent.intro,
      validation: (rule) => rule.required(),
    }),

    // ── METRICS ROW ───────────────────────────────────────────────────────────
    defineField({
      name: "metrics",
      title: "Metrics (3 columns at top)",
      type: "array",
      group: "metrics",
      initialValue: defaultRidgewellCaseStudyContent.metrics,
      of: [
        defineArrayMember({
          type: "object",
          name: "metricItem",
          title: "Metric Item",
          fields: [
            defineField({
              name: "value",
              title: "Value / Number (e.g. ~$4K, $200K, ~50×)",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Metric Label (e.g. Client revenue)",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),

    // ── STORY & OBJECTIVE ─────────────────────────────────────────────────────
    defineField({
      name: "contextEyebrow",
      title: "Context Section Eyebrow",
      type: "string",
      group: "article",
      initialValue: defaultRidgewellCaseStudyContent.contextEyebrow,
    }),
    defineField({
      name: "contextHeading",
      title: "Context Section Heading",
      type: "string",
      group: "article",
      initialValue: defaultRidgewellCaseStudyContent.contextHeading,
    }),
    defineField({
      name: "contextBody",
      title: "Context Paragraph",
      type: "text",
      rows: 4,
      group: "article",
      initialValue: defaultRidgewellCaseStudyContent.contextBody,
    }),
    defineField({
      name: "objectiveLabel",
      title: "Objective Box Label",
      type: "string",
      group: "article",
      initialValue: defaultRidgewellCaseStudyContent.objectiveLabel,
    }),
    defineField({
      name: "objectiveText",
      title: "Objective Box Text",
      type: "text",
      rows: 3,
      group: "article",
      initialValue: defaultRidgewellCaseStudyContent.objectiveText,
    }),

    // ── RESULTS & IMAGE ───────────────────────────────────────────────────────
    defineField({
      name: "producedHeading",
      title: "'What The Work Produced' Heading",
      type: "string",
      group: "results",
      initialValue: defaultRidgewellCaseStudyContent.producedHeading,
    }),
    defineField({
      name: "producedBody",
      title: "'What The Work Produced' Paragraph",
      type: "text",
      rows: 4,
      group: "results",
      initialValue: defaultRidgewellCaseStudyContent.producedBody,
    }),
    defineField({
      name: "image",
      title: "Case Detail Image (Full width project image)",
      type: "image",
      group: "results",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
        }),
      ],
      description:
        "Featured project image displayed in the story. Defaults to /ridgewell-project.webp if omitted.",
    }),
    defineField({
      name: "interpretHeading",
      title: "'Understanding The Numbers' Heading",
      type: "string",
      group: "results",
      initialValue: defaultRidgewellCaseStudyContent.interpretHeading,
    }),
    defineField({
      name: "interpretBody",
      title: "'Understanding The Numbers' Paragraph",
      type: "text",
      rows: 4,
      group: "results",
      initialValue: defaultRidgewellCaseStudyContent.interpretBody,
    }),

    // ── PROCESS STEPS ─────────────────────────────────────────────────────────
    defineField({
      name: "processTitle",
      title: "Process Section Heading",
      type: "string",
      group: "process",
      initialValue: defaultRidgewellCaseStudyContent.processTitle,
    }),
    defineField({
      name: "processNote",
      title: "Process Section Subtitle / Note",
      type: "text",
      rows: 3,
      group: "process",
      initialValue: defaultRidgewellCaseStudyContent.processNote,
    }),
    defineField({
      name: "processSteps",
      title: "Process Steps (Numbered 01, 02...)",
      type: "array",
      group: "process",
      initialValue: defaultRidgewellCaseStudyContent.processSteps,
      of: [
        defineArrayMember({
          type: "object",
          name: "processStep",
          title: "Process Step",
          fields: [
            defineField({
              name: "title",
              title: "Step Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "text",
              title: "Step Description",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
    }),

    // ── TAKEAWAY & NOTES ──────────────────────────────────────────────────────
    defineField({
      name: "takeawayHeading",
      title: "'What This Means For Your Business' Heading",
      type: "string",
      group: "takeaway",
      initialValue: defaultRidgewellCaseStudyContent.takeawayHeading,
    }),
    defineField({
      name: "takeawayBody",
      title: "Takeaway Paragraph",
      type: "text",
      rows: 4,
      group: "takeaway",
      initialValue: defaultRidgewellCaseStudyContent.takeawayBody,
    }),
    defineField({
      name: "lessonBody",
      title: "Secondary Lesson Paragraph",
      type: "text",
      rows: 4,
      group: "takeaway",
      initialValue: defaultRidgewellCaseStudyContent.lessonBody,
    }),
    defineField({
      name: "serviceLinkText",
      title: "Service Link Text",
      type: "string",
      group: "takeaway",
      initialValue: defaultRidgewellCaseStudyContent.serviceLinkText,
    }),
    defineField({
      name: "serviceLinkHref",
      title: "Service Link URL",
      type: "string",
      group: "takeaway",
      initialValue: defaultRidgewellCaseStudyContent.serviceLinkHref,
    }),
    defineField({
      name: "resultNote",
      title: "Disclaimer / Result Note (Aside)",
      type: "text",
      rows: 3,
      group: "takeaway",
      initialValue: defaultRidgewellCaseStudyContent.resultNote,
    }),

    // ── PAGE CTA ──────────────────────────────────────────────────────────────
    defineField({
      name: "ctaEyebrow",
      title: "Page CTA Eyebrow",
      type: "string",
      group: "cta",
      initialValue: defaultRidgewellCaseStudyContent.ctaEyebrow,
    }),
    defineField({
      name: "ctaHeading",
      title: "Page CTA Heading",
      type: "string",
      group: "cta",
      initialValue: defaultRidgewellCaseStudyContent.ctaHeading,
    }),
    defineField({
      name: "ctaBody",
      title: "Page CTA Body",
      type: "text",
      rows: 3,
      group: "cta",
      initialValue: defaultRidgewellCaseStudyContent.ctaBody,
    }),
    defineField({
      name: "ctaButtonText",
      title: "Page CTA Button Text",
      type: "string",
      group: "cta",
      initialValue: defaultRidgewellCaseStudyContent.ctaButtonText,
    }),
    defineField({
      name: "ctaButtonHref",
      title: "Page CTA Button Link",
      type: "string",
      group: "cta",
      initialValue: defaultRidgewellCaseStudyContent.ctaButtonHref,
    }),
  ],
  preview: {
    select: { title: "headline", subtitle: "intro" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title || "Ridgewell Case Study",
        subtitle: subtitle ? subtitle.slice(0, 80) : "/case-studies/ridgewell-landscape-design",
      };
    },
  },
});

export type RidgewellCaseStudyContent = typeof defaultRidgewellCaseStudyContent;
