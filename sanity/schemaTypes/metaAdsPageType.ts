import { defineArrayMember, defineField, defineType } from "sanity";

// --------------------------------------------------------------------------
// Default content — exact copy from content/services.ts + content/service-details.ts
// for the "meta-ads" entry. Used as initialValue so Live Preview immediately
// shows the existing copy.
// --------------------------------------------------------------------------
export const defaultMetaAdsContent = {
  _id: "metaAdsPage",
  _type: "metaAdsPage",

  // Hero
  heroEyebrow: "Meta Ads",
  heroHeadline: "Show people the project they’ve been putting off.",
  heroIntro:
    "Put your work in front of potential customers on Facebook and Instagram, and give them an easy way to ask about their own project.",
  heroCtaText: "Let's see if this fits your business",
  heroCtaHref: "/#contact",
  heroSmallNote: "A straightforward conversation. No technical homework.",

  // Visual aside
  visualLabel: "Let your work do the talking.",
  visualFlow1: "Get found",
  visualFlow2: "Build trust",
  visualFlow3: "Start a conversation",
  visualTagline: "Built around your business goals",

  // What It Actually Means section
  explainEyebrow: "WHAT IT ACTUALLY MEANS",
  explainHeading: "Meta Ads, in plain English.",
  explainBody:
    "Meta Ads are paid ads on Facebook and Instagram. They can introduce your work to someone who has not started searching for a contractor yet. Photos, videos, and a clear offer help the right person picture a project of their own. We build the campaign and the route from interest to inquiry.",
  exampleEyebrow: "PICTURE THIS",
  exampleBody:
    "Someone sees a before-and-after of a backyard like theirs. The ad explains the type of project and the area you serve. They send their details or visit your page to ask what a similar job could involve.",

  // What We Handle (deliverables)
  deliverablesEyebrow: "WHAT WE HANDLE FOR YOU",
  deliverablesHeading: "The work behind the result.",
  deliverables: [
    {
      _key: "d-1",
      title: "An offer people understand",
      body: "We identify a specific service and a clear reason to enquire. The message says who it is for, where you work, and what happens after someone responds.",
    },
    {
      _key: "d-2",
      title: "Photos, videos, and ad copy",
      body: "We plan creative around your real projects, process, and customer questions. We test different angles rather than relying on one image forever.",
    },
    {
      _key: "d-3",
      title: "A sensible inquiry flow",
      body: "We choose an inquiry form or landing page that fits the offer. Questions help separate real project interest from casual clicks.",
    },
    {
      _key: "d-4",
      title: "Lead-quality feedback",
      body: "We look at which ads bring conversations worth having, not just cheap form submissions. Your sales feedback helps us improve targeting, copy, and follow-up.",
    },
  ],

  // A Plan Built Around Your Business (steps)
  stepsEyebrow: "A PLAN BUILT AROUND YOUR BUSINESS",
  stepsHeading:
    "A finished patio, a better kitchen, or a home that finally feels right. Good work gives people something to picture.",
  steps: [
    {
      _key: "s-1",
      title: "Start with your work",
      body: "We shape real project photos, videos, and customer stories into ads people can understand at a glance.",
    },
    {
      _key: "s-2",
      title: "Make the next step simple",
      body: "A clear offer and a short inquiry form help interested people tell you what they need.",
    },
    {
      _key: "s-3",
      title: "Improve the quality",
      body: "We review the inquiries with you, adjust the message, and make it clear who your service is for and where you work.",
    },
  ],
  measureHeading: "What we'll pay attention to",
  measureBody:
    "We care about useful conversations, not a busy comment section. Your follow-up helps us see which messages bring serious interest.",
  caseStudyResult: "",
  caseStudyLinkText: "",
  caseStudyHref: "",

  // Is This Right For You?
  fitEyebrow: "IS THIS RIGHT FOR YOU?",
  fitHeading: "A good fit starts here.",
  fitItems: [
    { _key: "f-1", text: "You have work that is easy to show in photos or video." },
    { _key: "f-2", text: "Customers may need time and reminders before deciding." },
    { _key: "f-3", text: "Your team can follow up with people who are interested but not ready today." },
  ],
  timelineHeading: "What to expect along the way",
  timelineBody:
    "We agree on the offer and creative first. After launch, we allow room to compare messages and review lead quality. Some prospects will be ready quickly; others need a longer conversation before booking.",
  yourPartHeading: "What we need from you",
  yourPartBody:
    "Share permission-cleared project photos or videos, explain your best-fit customers, and tell us what prospects are saying. Fast follow-up matters because someone browsing a feed may forget an ad by tomorrow.",

  // FAQs
  faqEyebrow: "BEFORE YOU DECIDE",
  faqHeading: "A few things you might be wondering.",
  faqs: [
    {
      _key: "faq-1",
      question: "Do I need professional videos?",
      answer:
        "Not always. Clear photos and honest videos of your work can give us a strong starting point. We will tell you what is missing.",
    },
    {
      _key: "faq-2",
      question: "Are these people ready to buy?",
      answer:
        "Some are ready; others are exploring. We set expectations in the ad and build a follow-up plan that fits a longer buying decision.",
    },
    {
      _key: "faq-3",
      question: "Is this the same as Google Ads?",
      answer:
        "Google Ads can reach people searching for a service. Meta Ads can introduce your work while people browse Facebook and Instagram. We choose based on how your customers buy.",
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
export const metaAdsPageType = defineType({
  name: "metaAdsPage",
  title: "Meta Ads Page (/services/meta-ads)",
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
      initialValue: defaultMetaAdsContent.heroEyebrow,
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      group: "hero",
      initialValue: defaultMetaAdsContent.heroHeadline,
    }),
    defineField({
      name: "heroIntro",
      title: "Hero Intro Paragraph",
      type: "text",
      rows: 3,
      group: "hero",
      initialValue: defaultMetaAdsContent.heroIntro,
    }),
    defineField({
      name: "heroCtaText",
      title: "Hero CTA Button Text",
      type: "string",
      group: "hero",
      initialValue: defaultMetaAdsContent.heroCtaText,
    }),
    defineField({
      name: "heroCtaHref",
      title: "Hero CTA Button Link",
      type: "string",
      group: "hero",
      initialValue: defaultMetaAdsContent.heroCtaHref,
    }),
    defineField({
      name: "heroSmallNote",
      title: "Hero Small Note (below CTA)",
      type: "string",
      group: "hero",
      initialValue: defaultMetaAdsContent.heroSmallNote,
    }),

    // Hero visual aside
    defineField({
      name: "visualLabel",
      title: "Visual Aside — Tagline",
      type: "string",
      group: "hero",
      initialValue: defaultMetaAdsContent.visualLabel,
    }),
    defineField({
      name: "visualFlow1",
      title: "Visual Flow Step 1",
      type: "string",
      group: "hero",
      initialValue: defaultMetaAdsContent.visualFlow1,
    }),
    defineField({
      name: "visualFlow2",
      title: "Visual Flow Step 2",
      type: "string",
      group: "hero",
      initialValue: defaultMetaAdsContent.visualFlow2,
    }),
    defineField({
      name: "visualFlow3",
      title: "Visual Flow Step 3",
      type: "string",
      group: "hero",
      initialValue: defaultMetaAdsContent.visualFlow3,
    }),
    defineField({
      name: "visualTagline",
      title: "Visual Aside — Bottom Tagline",
      type: "string",
      group: "hero",
      initialValue: defaultMetaAdsContent.visualTagline,
    }),
    defineField({
      name: "heroImage",
      title: "Hero Visual Image (optional override of platform icon)",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description:
        "Optional. If left empty the default Meta Ads platform icon (/platforms/meta.svg) is shown.",
    }),

    // ── WHAT IT ACTUALLY MEANS ────────────────────────────────────────────────
    defineField({
      name: "explainEyebrow",
      title: "Explain Section Eyebrow",
      type: "string",
      group: "explain",
      initialValue: defaultMetaAdsContent.explainEyebrow,
    }),
    defineField({
      name: "explainHeading",
      title: "Explain Section Heading",
      type: "string",
      group: "explain",
      initialValue: defaultMetaAdsContent.explainHeading,
    }),
    defineField({
      name: "explainBody",
      title: "Explain Section Body",
      type: "text",
      rows: 5,
      group: "explain",
      initialValue: defaultMetaAdsContent.explainBody,
    }),
    defineField({
      name: "exampleEyebrow",
      title: "Example Aside Eyebrow",
      type: "string",
      group: "explain",
      initialValue: defaultMetaAdsContent.exampleEyebrow,
    }),
    defineField({
      name: "exampleBody",
      title: "Example Aside Body",
      type: "text",
      rows: 4,
      group: "explain",
      initialValue: defaultMetaAdsContent.exampleBody,
    }),

    // ── WHAT WE HANDLE (deliverables) ─────────────────────────────────────────
    defineField({
      name: "deliverablesEyebrow",
      title: "Deliverables Section Eyebrow",
      type: "string",
      group: "deliverables",
      initialValue: defaultMetaAdsContent.deliverablesEyebrow,
    }),
    defineField({
      name: "deliverablesHeading",
      title: "Deliverables Section Heading",
      type: "string",
      group: "deliverables",
      initialValue: defaultMetaAdsContent.deliverablesHeading,
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables (numbered items)",
      type: "array",
      group: "deliverables",
      initialValue: defaultMetaAdsContent.deliverables,
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
      initialValue: defaultMetaAdsContent.stepsEyebrow,
    }),
    defineField({
      name: "stepsHeading",
      title: "Steps Section Heading",
      type: "text",
      rows: 2,
      group: "steps",
      initialValue: defaultMetaAdsContent.stepsHeading,
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      group: "steps",
      initialValue: defaultMetaAdsContent.steps,
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
      initialValue: defaultMetaAdsContent.measureHeading,
    }),
    defineField({
      name: "measureBody",
      title: "\"What We'll Pay Attention To\" Body",
      type: "text",
      rows: 3,
      group: "steps",
      initialValue: defaultMetaAdsContent.measureBody,
    }),
    defineField({
      name: "caseStudyResult",
      title: "Case Study Result Stat",
      type: "string",
      group: "steps",
      initialValue: defaultMetaAdsContent.caseStudyResult,
    }),
    defineField({
      name: "caseStudyLinkText",
      title: "Case Study Link Text",
      type: "string",
      group: "steps",
      initialValue: defaultMetaAdsContent.caseStudyLinkText,
    }),
    defineField({
      name: "caseStudyHref",
      title: "Case Study Link URL",
      type: "string",
      group: "steps",
      initialValue: defaultMetaAdsContent.caseStudyHref,
    }),

    // ── IS THIS RIGHT FOR YOU? ─────────────────────────────────────────────────
    defineField({
      name: "fitEyebrow",
      title: "Fit Section Eyebrow",
      type: "string",
      group: "fit",
      initialValue: defaultMetaAdsContent.fitEyebrow,
    }),
    defineField({
      name: "fitHeading",
      title: "Fit Section Heading",
      type: "string",
      group: "fit",
      initialValue: defaultMetaAdsContent.fitHeading,
    }),
    defineField({
      name: "fitItems",
      title: "Fit List Items",
      type: "array",
      group: "fit",
      initialValue: defaultMetaAdsContent.fitItems,
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
      initialValue: defaultMetaAdsContent.timelineHeading,
    }),
    defineField({
      name: "timelineBody",
      title: "Timeline Body",
      type: "text",
      rows: 4,
      group: "fit",
      initialValue: defaultMetaAdsContent.timelineBody,
    }),
    defineField({
      name: "yourPartHeading",
      title: "\"What We Need From You\" Heading",
      type: "string",
      group: "fit",
      initialValue: defaultMetaAdsContent.yourPartHeading,
    }),
    defineField({
      name: "yourPartBody",
      title: "\"What We Need From You\" Body",
      type: "text",
      rows: 4,
      group: "fit",
      initialValue: defaultMetaAdsContent.yourPartBody,
    }),

    // ── FAQs ──────────────────────────────────────────────────────────────────
    defineField({
      name: "faqEyebrow",
      title: "FAQ Section Eyebrow",
      type: "string",
      group: "faq",
      initialValue: defaultMetaAdsContent.faqEyebrow,
    }),
    defineField({
      name: "faqHeading",
      title: "FAQ Section Heading",
      type: "string",
      group: "faq",
      initialValue: defaultMetaAdsContent.faqHeading,
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      group: "faq",
      initialValue: defaultMetaAdsContent.faqs,
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
      initialValue: defaultMetaAdsContent.relatedEyebrow,
    }),

    // ── PAGE CTA ──────────────────────────────────────────────────────────────
    defineField({
      name: "ctaEyebrow",
      title: "Page CTA Eyebrow",
      type: "string",
      group: "cta",
      initialValue: defaultMetaAdsContent.ctaEyebrow,
    }),
    defineField({
      name: "ctaHeading",
      title: "Page CTA Heading",
      type: "string",
      group: "cta",
      initialValue: defaultMetaAdsContent.ctaHeading,
    }),
    defineField({
      name: "ctaBody",
      title: "Page CTA Body",
      type: "text",
      rows: 3,
      group: "cta",
      initialValue: defaultMetaAdsContent.ctaBody,
    }),
    defineField({
      name: "ctaButtonText",
      title: "Page CTA Button Text",
      type: "string",
      group: "cta",
      initialValue: defaultMetaAdsContent.ctaButtonText,
    }),
    defineField({
      name: "ctaButtonHref",
      title: "Page CTA Button Link",
      type: "string",
      group: "cta",
      initialValue: defaultMetaAdsContent.ctaButtonHref,
    }),
  ],
  preview: {
    select: { title: "heroHeadline", subtitle: "heroIntro" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title || "Meta Ads Page",
        subtitle: subtitle ? subtitle.slice(0, 80) : "/services/meta-ads",
      };
    },
  },
});

export type MetaAdsPageContent = typeof defaultMetaAdsContent;
