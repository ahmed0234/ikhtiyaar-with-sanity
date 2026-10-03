import { defineArrayMember, defineField, defineType } from "sanity";

// --------------------------------------------------------------------------
// Default content — exact copy from content/case-studies.ts and content/case-details.ts
// for the "casey-insurance-group" case study.
// --------------------------------------------------------------------------
export const defaultCaseyCaseStudyContent = {
  _id: "caseyCaseStudy",
  _type: "caseyCaseStudy",

  // Hero
  breadcrumbText: "All case studies",
  breadcrumbHref: "/case-studies",
  clientName: "Casey Insurance Group",
  service: "Search Engine Optimization",
  heroEyebrow: "Casey Insurance Group · Search Engine Optimization",
  headline: "A growing source of visits. More than 100 leads.",
  intro:
    "Casey Insurance Group's search presence now brings an average of 2,000 organic visitors a month, with more than 100 leads generated through our SEO work.",

  // Metrics row
  metrics: [
    {
      _key: "m-1",
      value: "2K",
      label: "Average monthly organic visitors",
    },
    {
      _key: "m-2",
      value: "100+",
      label: "Leads generated",
    },
    {
      _key: "m-3",
      value: "SEO",
      label: "The service behind the result",
    },
  ],

  // Section: The Business Behind The Numbers
  contextEyebrow: "THE BUSINESS BEHIND THE NUMBERS",
  contextHeading: "What mattered for Casey Insurance Group",
  contextBody:
    "Insurance buyers often need to understand their options before they are ready to speak with someone. Search can introduce an agency during that research. A useful website needs to help the visitor understand the next step, not simply attract a visit and leave them guessing.",

  // Objective Callout Box
  objectiveLabel: "The objective",
  objectiveText:
    "Build a source of relevant visits through unpaid search and turn that attention into inquiries for Casey Insurance Group.",

  // Section: What The Work Produced
  producedHeading: "What the work produced",
  producedBody:
    "We handled SEO for Casey Insurance Group to help people find its website through unpaid search results. The site averages around 2,000 organic visitors per month, and the work has generated more than 100 leads.",

  // Detail image alt
  imageAlt: "Casey Insurance Group search presence and results",

  // Section: Understanding The Numbers
  interpretHeading: "Understanding the numbers",
  interpretBody:
    "The website averages around 2,000 organic visitors per month. The 100+ leads are a cumulative result, not 100 leads every month. These are different measures and timeframes, so we do not calculate a conversion rate from them.",

  // Section: Process / How We Approach
  processTitle: "How we approach SEO for a service business",
  processNote:
    "The traffic and lead figures below are Casey’s reported results. This process explains the SEO framework we use, rather than claiming a complete historical list of changes to Casey’s website.",
  processSteps: [
    {
      _key: "ps-1",
      title: "Make important pages discoverable",
      text: "We review whether search engines can reach and understand the pages that explain the business. Clear structure and internal links help people and search engines find useful information.",
    },
    {
      _key: "ps-2",
      title: "Organize content around customer needs",
      text: "Service content should answer what someone needs to know before contacting the business. The goal is relevant coverage of real services, not a large collection of repetitive keyword pages.",
    },
    {
      _key: "ps-3",
      title: "Connect information with an inquiry",
      text: "A helpful article or service page should make it obvious who can help and how to contact them. Clear calls to action give an interested reader a next step.",
    },
    {
      _key: "ps-4",
      title: "Review traffic and leads together",
      text: "Organic visits show that people are finding the website. Leads show that some visitors are taking action. Looking at both helps keep SEO connected to business value.",
    },
  ],

  // Section: What This Means For Your Business
  takeawayHeading: "What this means for your business",
  takeawayBody:
    "SEO can become a useful source of ongoing discovery when a website addresses real customer needs. The aim is a better connection between the questions people ask and the help the business can provide.",
  lessonBody:
    "More people finding a website is useful only when the right people take a next step. Looking at visitors and inquiries together gives a clearer picture of how search supports a service business.",

  // Explore Service Text Link
  serviceLinkText: "Explore Search Engine Optimization",
  serviceLinkHref: "/services/seo",

  // Result Note Aside
  resultNote:
    "The 100+ leads are a cumulative figure. Organic traffic averages around 2,000 visitors per month. Individual results vary.",

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
export const caseyCaseStudyType = defineType({
  name: "caseyCaseStudy",
  title: "Casey Insurance Group Case Study (/case-studies/casey-insurance-group)",
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
      initialValue: defaultCaseyCaseStudyContent.breadcrumbText,
    }),
    defineField({
      name: "breadcrumbHref",
      title: "Breadcrumb URL",
      type: "string",
      group: "hero",
      initialValue: defaultCaseyCaseStudyContent.breadcrumbHref,
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow (e.g. Client · Service)",
      type: "string",
      group: "hero",
      initialValue: defaultCaseyCaseStudyContent.heroEyebrow,
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      group: "hero",
      initialValue: defaultCaseyCaseStudyContent.headline,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Intro Paragraph",
      type: "text",
      rows: 3,
      group: "hero",
      initialValue: defaultCaseyCaseStudyContent.intro,
      validation: (rule) => rule.required(),
    }),

    // ── METRICS ROW ───────────────────────────────────────────────────────────
    defineField({
      name: "metrics",
      title: "Metrics (3 columns at top)",
      type: "array",
      group: "metrics",
      initialValue: defaultCaseyCaseStudyContent.metrics,
      of: [
        defineArrayMember({
          type: "object",
          name: "metricItem",
          title: "Metric Item",
          fields: [
            defineField({
              name: "value",
              title: "Value / Number (e.g. 2K, 100+, SEO)",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Metric Label (e.g. Leads generated)",
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
      initialValue: defaultCaseyCaseStudyContent.contextEyebrow,
    }),
    defineField({
      name: "contextHeading",
      title: "Context Section Heading",
      type: "string",
      group: "article",
      initialValue: defaultCaseyCaseStudyContent.contextHeading,
    }),
    defineField({
      name: "contextBody",
      title: "Context Paragraph",
      type: "text",
      rows: 4,
      group: "article",
      initialValue: defaultCaseyCaseStudyContent.contextBody,
    }),
    defineField({
      name: "objectiveLabel",
      title: "Objective Box Label",
      type: "string",
      group: "article",
      initialValue: defaultCaseyCaseStudyContent.objectiveLabel,
    }),
    defineField({
      name: "objectiveText",
      title: "Objective Box Text",
      type: "text",
      rows: 3,
      group: "article",
      initialValue: defaultCaseyCaseStudyContent.objectiveText,
    }),

    // ── RESULTS & IMAGE ───────────────────────────────────────────────────────
    defineField({
      name: "producedHeading",
      title: "'What The Work Produced' Heading",
      type: "string",
      group: "results",
      initialValue: defaultCaseyCaseStudyContent.producedHeading,
    }),
    defineField({
      name: "producedBody",
      title: "'What The Work Produced' Paragraph",
      type: "text",
      rows: 4,
      group: "results",
      initialValue: defaultCaseyCaseStudyContent.producedBody,
    }),
    defineField({
      name: "image",
      title: "Case Detail Image (optional project/results image)",
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
        "Optional image displayed inside the story. If left empty, no image is rendered.",
    }),
    defineField({
      name: "interpretHeading",
      title: "'Understanding The Numbers' Heading",
      type: "string",
      group: "results",
      initialValue: defaultCaseyCaseStudyContent.interpretHeading,
    }),
    defineField({
      name: "interpretBody",
      title: "'Understanding The Numbers' Paragraph",
      type: "text",
      rows: 4,
      group: "results",
      initialValue: defaultCaseyCaseStudyContent.interpretBody,
    }),

    // ── PROCESS STEPS ─────────────────────────────────────────────────────────
    defineField({
      name: "processTitle",
      title: "Process Section Heading",
      type: "string",
      group: "process",
      initialValue: defaultCaseyCaseStudyContent.processTitle,
    }),
    defineField({
      name: "processNote",
      title: "Process Section Subtitle / Note",
      type: "text",
      rows: 3,
      group: "process",
      initialValue: defaultCaseyCaseStudyContent.processNote,
    }),
    defineField({
      name: "processSteps",
      title: "Process Steps (Numbered 01, 02...)",
      type: "array",
      group: "process",
      initialValue: defaultCaseyCaseStudyContent.processSteps,
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
      initialValue: defaultCaseyCaseStudyContent.takeawayHeading,
    }),
    defineField({
      name: "takeawayBody",
      title: "Takeaway Paragraph",
      type: "text",
      rows: 4,
      group: "takeaway",
      initialValue: defaultCaseyCaseStudyContent.takeawayBody,
    }),
    defineField({
      name: "lessonBody",
      title: "Secondary Lesson Paragraph",
      type: "text",
      rows: 4,
      group: "takeaway",
      initialValue: defaultCaseyCaseStudyContent.lessonBody,
    }),
    defineField({
      name: "serviceLinkText",
      title: "Service Link Text",
      type: "string",
      group: "takeaway",
      initialValue: defaultCaseyCaseStudyContent.serviceLinkText,
    }),
    defineField({
      name: "serviceLinkHref",
      title: "Service Link URL",
      type: "string",
      group: "takeaway",
      initialValue: defaultCaseyCaseStudyContent.serviceLinkHref,
    }),
    defineField({
      name: "resultNote",
      title: "Disclaimer / Result Note (Aside)",
      type: "text",
      rows: 3,
      group: "takeaway",
      initialValue: defaultCaseyCaseStudyContent.resultNote,
    }),

    // ── PAGE CTA ──────────────────────────────────────────────────────────────
    defineField({
      name: "ctaEyebrow",
      title: "Page CTA Eyebrow",
      type: "string",
      group: "cta",
      initialValue: defaultCaseyCaseStudyContent.ctaEyebrow,
    }),
    defineField({
      name: "ctaHeading",
      title: "Page CTA Heading",
      type: "string",
      group: "cta",
      initialValue: defaultCaseyCaseStudyContent.ctaHeading,
    }),
    defineField({
      name: "ctaBody",
      title: "Page CTA Body",
      type: "text",
      rows: 3,
      group: "cta",
      initialValue: defaultCaseyCaseStudyContent.ctaBody,
    }),
    defineField({
      name: "ctaButtonText",
      title: "Page CTA Button Text",
      type: "string",
      group: "cta",
      initialValue: defaultCaseyCaseStudyContent.ctaButtonText,
    }),
    defineField({
      name: "ctaButtonHref",
      title: "Page CTA Button Link",
      type: "string",
      group: "cta",
      initialValue: defaultCaseyCaseStudyContent.ctaButtonHref,
    }),
  ],
  preview: {
    select: { title: "headline", subtitle: "intro" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title || "Casey Insurance Group Case Study",
        subtitle: subtitle
          ? subtitle.slice(0, 80)
          : "/case-studies/casey-insurance-group",
      };
    },
  },
});

export type CaseyCaseStudyContent = typeof defaultCaseyCaseStudyContent;
