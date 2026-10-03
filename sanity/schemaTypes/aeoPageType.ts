import { defineArrayMember, defineField, defineType } from "sanity";

// --------------------------------------------------------------------------
// Default content — exact copy from content/services.ts + content/service-details.ts
// for the "aeo" entry. Used as initialValue so Live Preview immediately
// shows the existing copy.
// --------------------------------------------------------------------------
export const defaultAeoContent = {
  _id: "aeoPage",
  _type: "aeoPage",

  // Hero
  heroEyebrow: "AEO",
  heroHeadline: "Give people a clear answer. Make your business part of it.",
  heroIntro:
    "Make your expertise easier to understand when people use search engines and AI tools to ask questions about your services.",
  heroCtaText: "Let's see if this fits your business",
  heroCtaHref: "/#contact",
  heroSmallNote: "A straightforward conversation. No technical homework.",

  // Visual aside
  visualLabel: "Your expertise, easier to find.",
  visualFlow1: "Get found",
  visualFlow2: "Build trust",
  visualFlow3: "Start a conversation",
  visualTagline: "Built around your business goals",

  // What It Actually Means section
  explainEyebrow: "WHAT IT ACTUALLY MEANS",
  explainHeading: "AEO, in plain English.",
  explainBody:
    "Answer engine optimization is about making the information on your website useful when people ask full questions in search engines and AI tools. We organize clear answers, accurate business details, and evidence of your experience. Much of the work overlaps with good SEO. There is no secret tag that guarantees an AI recommendation.",
  exampleEyebrow: "PICTURE THIS",
  exampleBody:
    "Someone asks what to check before hiring a hardscaping contractor. A well-written page can explain materials, drainage, access, and questions to ask. Useful information helps a reader make a decision, whether they reach you from a traditional search result or an AI-assisted search experience.",

  // What We Handle (deliverables)
  deliverablesEyebrow: "WHAT WE HANDLE FOR YOU",
  deliverablesHeading: "The work behind the result.",
  deliverables: [
    {
      _key: "d-1",
      title: "A map of customer questions",
      body: "We identify the questions people ask when comparing options, estimating costs, and choosing a provider.",
    },
    {
      _key: "d-2",
      title: "Clear, useful answer pages",
      body: "We write and structure content so readers can find a direct answer, understand the context, and see a sensible next step.",
    },
    {
      _key: "d-3",
      title: "Accurate business and service information",
      body: "We improve consistency around who you are, what you do, where you work, and what evidence supports your claims.",
    },
    {
      _key: "d-4",
      title: "Search-friendly page structure",
      body: "We review headings, internal links, appropriate structured data, and crawl access. We measure available referrals and visibility without pretending every AI mention can be tracked perfectly.",
    },
  ],

  // A Plan Built Around Your Business (steps)
  stepsEyebrow: "A PLAN BUILT AROUND YOUR BUSINESS",
  stepsHeading:
    "People do not always search with a few words anymore. They ask full questions. Your website should have useful, honest answers.",
  steps: [
    {
      _key: "s-1",
      title: "Find the real questions",
      body: "We identify what people ask before choosing a business like yours, from costs and timelines to what can go wrong.",
    },
    {
      _key: "s-2",
      title: "Build useful answers",
      body: "We create clear, well-organized content using your knowledge, examples, and accurate business details.",
    },
    {
      _key: "s-3",
      title: "Strengthen the foundation",
      body: "We improve page structure, internal links, and appropriate structured data so your content is easier to discover and understand.",
    },
  ],
  measureHeading: "What we'll pay attention to",
  measureBody:
    "AEO means answer engine optimization. It builds on solid SEO and helpful content. There is no special code that guarantees an AI tool will mention your business.",
  caseStudyResult: "",
  caseStudyLinkText: "",
  caseStudyHref: "",

  // Is This Right For You?
  fitEyebrow: "IS THIS RIGHT FOR YOU?",
  fitHeading: "A good fit starts here.",
  fitItems: [
    {
      _key: "f-1",
      text: "Customers need answers before they are ready to speak with you.",
    },
    {
      _key: "f-2",
      text: "You have expertise and real examples worth sharing.",
    },
    {
      _key: "f-3",
      text: "You want to improve your website content alongside your SEO foundation.",
    },
  ],
  timelineHeading: "What to expect along the way",
  timelineBody:
    "This is a content and search improvement process, not a switch that produces instant mentions. We prioritize the most valuable questions, publish useful answers, and review what can be observed over time.",
  yourPartHeading: "What we need from you",
  yourPartBody:
    "Bring the expertise. Tell us the questions customers really ask and where generic online advice gets things wrong. Review the answers so they reflect the way your business actually works.",

  // FAQs
  faqEyebrow: "BEFORE YOU DECIDE",
  faqHeading: "A few things you might be wondering.",
  faqs: [
    {
      _key: "faq-1",
      question: "Is AEO different from SEO?",
      answer:
        "There is a lot of overlap. Good technical SEO, clear information, and trustworthy content support both. We focus on answering questions well rather than chasing a separate trick.",
    },
    {
      _key: "faq-2",
      question: "Can you guarantee AI mentions?",
      answer:
        "No. AI tools and search engines choose their sources. We improve the quality and accessibility of your information without promising placement.",
    },
    {
      _key: "faq-3",
      question: "Is this paid advertising?",
      answer:
        "No. This service improves the content on your website. ChatGPT Ads is a separate paid advertising service.",
    },
  ],

  // Related services
  relatedEyebrow: "OTHER WAYS WE CAN HELP",

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
export const aeoPageType = defineType({
  name: "aeoPage",
  title: "AEO Page (/services/aeo)",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section", default: true },
    { name: "explain", title: "What It Actually Means" },
    { name: "deliverables", title: "What We Handle" },
    { name: "steps", title: "A Plan Built Around Your Business" },
    { name: "fit", title: "Is This Right For You?" },
    { name: "faq", title: "FAQs" },
    { name: "cta", title: "Page CTA" },
  ],
  fields: [
    // ── HERO ──────────────────────────────────────────────────────────────────
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow (service name badge)",
      type: "string",
      group: "hero",
      initialValue: defaultAeoContent.heroEyebrow,
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      group: "hero",
      initialValue: defaultAeoContent.heroHeadline,
    }),
    defineField({
      name: "heroIntro",
      title: "Hero Intro Paragraph",
      type: "text",
      rows: 3,
      group: "hero",
      initialValue: defaultAeoContent.heroIntro,
    }),
    defineField({
      name: "heroCtaText",
      title: "Hero CTA Button Text",
      type: "string",
      group: "hero",
      initialValue: defaultAeoContent.heroCtaText,
    }),
    defineField({
      name: "heroCtaHref",
      title: "Hero CTA Button Link",
      type: "string",
      group: "hero",
      initialValue: defaultAeoContent.heroCtaHref,
    }),
    defineField({
      name: "heroSmallNote",
      title: "Hero Small Note (below CTA)",
      type: "string",
      group: "hero",
      initialValue: defaultAeoContent.heroSmallNote,
    }),

    // Hero visual aside
    defineField({
      name: "visualLabel",
      title: "Visual Aside — Tagline",
      type: "string",
      group: "hero",
      initialValue: defaultAeoContent.visualLabel,
    }),
    defineField({
      name: "visualFlow1",
      title: "Visual Flow Step 1",
      type: "string",
      group: "hero",
      initialValue: defaultAeoContent.visualFlow1,
    }),
    defineField({
      name: "visualFlow2",
      title: "Visual Flow Step 2",
      type: "string",
      group: "hero",
      initialValue: defaultAeoContent.visualFlow2,
    }),
    defineField({
      name: "visualFlow3",
      title: "Visual Flow Step 3",
      type: "string",
      group: "hero",
      initialValue: defaultAeoContent.visualFlow3,
    }),
    defineField({
      name: "visualTagline",
      title: "Visual Aside — Bottom Tagline",
      type: "string",
      group: "hero",
      initialValue: defaultAeoContent.visualTagline,
    }),
    defineField({
      name: "heroImage",
      title: "Hero Visual Image / Icon",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
        }),
      ],
      description:
        "Optional visual icon or image for AEO. Defaults to MessagesSquare icon if not set.",
    }),

    // ── WHAT IT ACTUALLY MEANS ────────────────────────────────────────────────
    defineField({
      name: "explainEyebrow",
      title: "Explain Section Eyebrow",
      type: "string",
      group: "explain",
      initialValue: defaultAeoContent.explainEyebrow,
    }),
    defineField({
      name: "explainHeading",
      title: "Explain Section Heading",
      type: "string",
      group: "explain",
      initialValue: defaultAeoContent.explainHeading,
    }),
    defineField({
      name: "explainBody",
      title: "Explain Section Body",
      type: "text",
      rows: 5,
      group: "explain",
      initialValue: defaultAeoContent.explainBody,
    }),
    defineField({
      name: "exampleEyebrow",
      title: "Example Aside Eyebrow",
      type: "string",
      group: "explain",
      initialValue: defaultAeoContent.exampleEyebrow,
    }),
    defineField({
      name: "exampleBody",
      title: "Example Aside Body",
      type: "text",
      rows: 4,
      group: "explain",
      initialValue: defaultAeoContent.exampleBody,
    }),

    // ── WHAT WE HANDLE (deliverables) ─────────────────────────────────────────
    defineField({
      name: "deliverablesEyebrow",
      title: "Deliverables Section Eyebrow",
      type: "string",
      group: "deliverables",
      initialValue: defaultAeoContent.deliverablesEyebrow,
    }),
    defineField({
      name: "deliverablesHeading",
      title: "Deliverables Section Heading",
      type: "string",
      group: "deliverables",
      initialValue: defaultAeoContent.deliverablesHeading,
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables (numbered items)",
      type: "array",
      group: "deliverables",
      initialValue: defaultAeoContent.deliverables,
      of: [
        defineArrayMember({
          type: "object",
          name: "deliverable",
          title: "Deliverable",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        }),
      ],
    }),

    // ── A PLAN BUILT AROUND YOUR BUSINESS (steps) ─────────────────────────────
    defineField({
      name: "stepsEyebrow",
      title: "Steps Section Eyebrow",
      type: "string",
      group: "steps",
      initialValue: defaultAeoContent.stepsEyebrow,
    }),
    defineField({
      name: "stepsHeading",
      title: "Steps Section Heading",
      type: "text",
      rows: 2,
      group: "steps",
      initialValue: defaultAeoContent.stepsHeading,
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      group: "steps",
      initialValue: defaultAeoContent.steps,
      of: [
        defineArrayMember({
          type: "object",
          name: "step",
          title: "Step",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        }),
      ],
    }),
    defineField({
      name: "measureHeading",
      title: "\"What We'll Pay Attention To\" Heading",
      type: "string",
      group: "steps",
      initialValue: defaultAeoContent.measureHeading,
    }),
    defineField({
      name: "measureBody",
      title: "\"What We'll Pay Attention To\" Body",
      type: "text",
      rows: 3,
      group: "steps",
      initialValue: defaultAeoContent.measureBody,
    }),
    defineField({
      name: "caseStudyResult",
      title: "Case Study Result Stat",
      type: "string",
      group: "steps",
      initialValue: defaultAeoContent.caseStudyResult,
    }),
    defineField({
      name: "caseStudyLinkText",
      title: "Case Study Link Text",
      type: "string",
      group: "steps",
      initialValue: defaultAeoContent.caseStudyLinkText,
    }),
    defineField({
      name: "caseStudyHref",
      title: "Case Study Link URL",
      type: "string",
      group: "steps",
      initialValue: defaultAeoContent.caseStudyHref,
    }),

    // ── IS THIS RIGHT FOR YOU? ─────────────────────────────────────────────────
    defineField({
      name: "fitEyebrow",
      title: "Fit Section Eyebrow",
      type: "string",
      group: "fit",
      initialValue: defaultAeoContent.fitEyebrow,
    }),
    defineField({
      name: "fitHeading",
      title: "Fit Section Heading",
      type: "string",
      group: "fit",
      initialValue: defaultAeoContent.fitHeading,
    }),
    defineField({
      name: "fitItems",
      title: "Fit List Items",
      type: "array",
      group: "fit",
      initialValue: defaultAeoContent.fitItems,
      of: [
        defineArrayMember({
          type: "object",
          name: "fitItem",
          title: "Item",
          fields: [
            defineField({
              name: "text",
              title: "Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "text" } },
        }),
      ],
    }),
    defineField({
      name: "timelineHeading",
      title: "Timeline Heading",
      type: "string",
      group: "fit",
      initialValue: defaultAeoContent.timelineHeading,
    }),
    defineField({
      name: "timelineBody",
      title: "Timeline Body",
      type: "text",
      rows: 4,
      group: "fit",
      initialValue: defaultAeoContent.timelineBody,
    }),
    defineField({
      name: "yourPartHeading",
      title: "\"What We Need From You\" Heading",
      type: "string",
      group: "fit",
      initialValue: defaultAeoContent.yourPartHeading,
    }),
    defineField({
      name: "yourPartBody",
      title: "\"What We Need From You\" Body",
      type: "text",
      rows: 4,
      group: "fit",
      initialValue: defaultAeoContent.yourPartBody,
    }),

    // ── FAQs ──────────────────────────────────────────────────────────────────
    defineField({
      name: "faqEyebrow",
      title: "FAQ Section Eyebrow",
      type: "string",
      group: "faq",
      initialValue: defaultAeoContent.faqEyebrow,
    }),
    defineField({
      name: "faqHeading",
      title: "FAQ Section Heading",
      type: "string",
      group: "faq",
      initialValue: defaultAeoContent.faqHeading,
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      group: "faq",
      initialValue: defaultAeoContent.faqs,
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          title: "FAQ",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),

    // ── RELATED SERVICES ──────────────────────────────────────────────────────
    defineField({
      name: "relatedEyebrow",
      title: "Related Services Eyebrow",
      type: "string",
      group: "cta",
      initialValue: defaultAeoContent.relatedEyebrow,
    }),

    // ── PAGE CTA ──────────────────────────────────────────────────────────────
    defineField({
      name: "ctaEyebrow",
      title: "Page CTA Eyebrow",
      type: "string",
      group: "cta",
      initialValue: defaultAeoContent.ctaEyebrow,
    }),
    defineField({
      name: "ctaHeading",
      title: "Page CTA Heading",
      type: "string",
      group: "cta",
      initialValue: defaultAeoContent.ctaHeading,
    }),
    defineField({
      name: "ctaBody",
      title: "Page CTA Body",
      type: "text",
      rows: 3,
      group: "cta",
      initialValue: defaultAeoContent.ctaBody,
    }),
    defineField({
      name: "ctaButtonText",
      title: "Page CTA Button Text",
      type: "string",
      group: "cta",
      initialValue: defaultAeoContent.ctaButtonText,
    }),
    defineField({
      name: "ctaButtonHref",
      title: "Page CTA Button Link",
      type: "string",
      group: "cta",
      initialValue: defaultAeoContent.ctaButtonHref,
    }),
  ],
  preview: {
    select: { title: "heroHeadline", subtitle: "heroIntro" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title || "AEO Page",
        subtitle: subtitle ? subtitle.slice(0, 80) : "/services/aeo",
      };
    },
  },
});

export type AeoPageContent = typeof defaultAeoContent;
