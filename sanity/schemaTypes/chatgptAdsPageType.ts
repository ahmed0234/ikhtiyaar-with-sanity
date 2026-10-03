import { defineArrayMember, defineField, defineType } from "sanity";

// --------------------------------------------------------------------------
// Default content — exact copy from content/services.ts + content/service-details.ts
// for the "chatgpt-ads" entry. Used as initialValue so Live Preview immediately
// shows the existing copy.
// --------------------------------------------------------------------------
export const defaultChatgptAdsContent = {
  _id: "chatgptAdsPage",
  _type: "chatgptAdsPage",

  // Hero
  heroEyebrow: "ChatGPT Ads",
  heroHeadline: "Reach people while they’re weighing their options.",
  heroIntro:
    "Explore whether advertising in ChatGPT could help your business reach the right people. Start with a clear offer and a sensible test.",
  heroCtaText: "Let's see if this fits your business",
  heroCtaHref: "/#contact",
  heroSmallNote: "A straightforward conversation. No technical homework.",

  // Visual aside
  visualLabel: "Be part of their next step.",
  visualFlow1: "Get found",
  visualFlow2: "Build trust",
  visualFlow3: "Start a conversation",
  visualTagline: "Built around your business goals",

  // What It Actually Means section
  explainEyebrow: "WHAT IT ACTUALLY MEANS",
  explainHeading: "ChatGPT Ads, in plain English.",
  explainBody:
    "ChatGPT Ads are paid, labeled placements that can appear while people use ChatGPT. They are separate from the answers themselves. For a service business, the opportunity is to reach people while they are researching a problem or considering their options. We first check whether the available advertising features fit your business.",
  exampleEyebrow: "PICTURE THIS",
  exampleBody:
    "A potential customer is exploring a home improvement project. A relevant ad may introduce your service and send them to a page explaining how you can help. The page still needs clear proof, an understandable offer, and an easy way to contact you.",

  // What We Handle (deliverables)
  deliverablesEyebrow: "WHAT WE HANDLE FOR YOU",
  deliverablesHeading: "The work behind the result.",
  deliverables: [
    {
      _key: "d-1",
      title: "Eligibility and fit review",
      body: "We check available account access, supported markets, policies, and campaign options before recommending that you spend.",
    },
    {
      _key: "d-2",
      title: "Offer and destination page",
      body: "We turn your service into a clear message and prepare a page that answers the questions a potential customer will have next.",
    },
    {
      _key: "d-3",
      title: "Campaign setup and measurement",
      body: "Where access is available, we configure the campaign and available conversion measurement. We agree on what success means before launch.",
    },
    {
      _key: "d-4",
      title: "A decision after the test",
      body: "We review spend, available performance data, and the inquiries your team receives. We recommend continuing, changing direction, or stopping based on what the test shows.",
    },
  ],

  // A Plan Built Around Your Business (steps)
  stepsEyebrow: "A PLAN BUILT AROUND YOUR BUSINESS",
  stepsHeading:
    "New places to advertise still need to answer an old question: is this bringing you worthwhile business?",
  steps: [
    {
      _key: "s-1",
      title: "Check the fit first",
      body: "We review current account access, market eligibility, your service, and the customers you want before recommending a campaign.",
    },
    {
      _key: "s-2",
      title: "Make your offer clear",
      body: "We prepare straightforward ad copy and a landing page that answers the questions someone needs answered before contacting you.",
    },
    {
      _key: "s-3",
      title: "Test with boundaries",
      body: "We agree on a budget, track available results, and review whether the inquiries justify continuing.",
    },
  ],
  measureHeading: "What we'll pay attention to",
  measureBody:
    "This is a developing advertising channel. We will be clear about what can be measured, what is still uncertain, and when another channel is a better use of your budget.",
  caseStudyResult: "",
  caseStudyLinkText: "",
  caseStudyHref: "",

  // Is This Right For You?
  fitEyebrow: "IS THIS RIGHT FOR YOU?",
  fitHeading: "A good fit starts here.",
  fitItems: [
    {
      _key: "f-1",
      text: "Your offer is specific enough to explain in a few clear sentences.",
    },
    {
      _key: "f-2",
      text: "You have budget for a controlled test without depending on it for every new lead.",
    },
    {
      _key: "f-3",
      text: "Your market and business category meet the current platform requirements.",
    },
  ],
  timelineHeading: "What to expect along the way",
  timelineBody:
    "The starting point depends on platform access and approval. We confirm what is currently available, prepare the campaign, and agree on a testing window. We do not use made-up industry benchmarks for a new channel.",
  yourPartHeading: "What we need from you",
  yourPartBody:
    "Give us a clear description of your service, the areas you cover, and what makes a good inquiry. Tell us which conversations become genuine opportunities so we can judge the channel fairly.",

  // FAQs
  faqEyebrow: "BEFORE YOU DECIDE",
  faqHeading: "A few things you might be wondering.",
  faqs: [
    {
      _key: "faq-1",
      question: "Can every business advertise in ChatGPT?",
      answer:
        "Account access, markets, and eligible categories can vary. We check the current requirements for your business before making a launch plan.",
    },
    {
      _key: "faq-2",
      question: "Does paying get my business recommended in answers?",
      answer:
        "No. Ads are labeled placements, separate from ChatGPT’s answers. Buying an ad does not buy a recommendation in an answer.",
    },
    {
      _key: "faq-3",
      question: "Should I move all my budget here?",
      answer:
        "We would start with a measured test if there is a good fit. An existing channel that brings profitable jobs should not be abandoned just because something new is available.",
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
export const chatgptAdsPageType = defineType({
  name: "chatgptAdsPage",
  title: "ChatGPT Ads Page (/services/chatgpt-ads)",
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
      initialValue: defaultChatgptAdsContent.heroEyebrow,
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      group: "hero",
      initialValue: defaultChatgptAdsContent.heroHeadline,
    }),
    defineField({
      name: "heroIntro",
      title: "Hero Intro Paragraph",
      type: "text",
      rows: 3,
      group: "hero",
      initialValue: defaultChatgptAdsContent.heroIntro,
    }),
    defineField({
      name: "heroCtaText",
      title: "Hero CTA Button Text",
      type: "string",
      group: "hero",
      initialValue: defaultChatgptAdsContent.heroCtaText,
    }),
    defineField({
      name: "heroCtaHref",
      title: "Hero CTA Button Link",
      type: "string",
      group: "hero",
      initialValue: defaultChatgptAdsContent.heroCtaHref,
    }),
    defineField({
      name: "heroSmallNote",
      title: "Hero Small Note (below CTA)",
      type: "string",
      group: "hero",
      initialValue: defaultChatgptAdsContent.heroSmallNote,
    }),

    // Hero visual aside
    defineField({
      name: "visualLabel",
      title: "Visual Aside — Tagline",
      type: "string",
      group: "hero",
      initialValue: defaultChatgptAdsContent.visualLabel,
    }),
    defineField({
      name: "visualFlow1",
      title: "Visual Flow Step 1",
      type: "string",
      group: "hero",
      initialValue: defaultChatgptAdsContent.visualFlow1,
    }),
    defineField({
      name: "visualFlow2",
      title: "Visual Flow Step 2",
      type: "string",
      group: "hero",
      initialValue: defaultChatgptAdsContent.visualFlow2,
    }),
    defineField({
      name: "visualFlow3",
      title: "Visual Flow Step 3",
      type: "string",
      group: "hero",
      initialValue: defaultChatgptAdsContent.visualFlow3,
    }),
    defineField({
      name: "visualTagline",
      title: "Visual Aside — Bottom Tagline",
      type: "string",
      group: "hero",
      initialValue: defaultChatgptAdsContent.visualTagline,
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
        "Platform icon or visual image for ChatGPT Ads. Defaults to OpenAI icon.",
    }),

    // ── WHAT IT ACTUALLY MEANS ────────────────────────────────────────────────
    defineField({
      name: "explainEyebrow",
      title: "Explain Section Eyebrow",
      type: "string",
      group: "explain",
      initialValue: defaultChatgptAdsContent.explainEyebrow,
    }),
    defineField({
      name: "explainHeading",
      title: "Explain Section Heading",
      type: "string",
      group: "explain",
      initialValue: defaultChatgptAdsContent.explainHeading,
    }),
    defineField({
      name: "explainBody",
      title: "Explain Section Body",
      type: "text",
      rows: 5,
      group: "explain",
      initialValue: defaultChatgptAdsContent.explainBody,
    }),
    defineField({
      name: "exampleEyebrow",
      title: "Example Aside Eyebrow",
      type: "string",
      group: "explain",
      initialValue: defaultChatgptAdsContent.exampleEyebrow,
    }),
    defineField({
      name: "exampleBody",
      title: "Example Aside Body",
      type: "text",
      rows: 4,
      group: "explain",
      initialValue: defaultChatgptAdsContent.exampleBody,
    }),

    // ── WHAT WE HANDLE (deliverables) ─────────────────────────────────────────
    defineField({
      name: "deliverablesEyebrow",
      title: "Deliverables Section Eyebrow",
      type: "string",
      group: "deliverables",
      initialValue: defaultChatgptAdsContent.deliverablesEyebrow,
    }),
    defineField({
      name: "deliverablesHeading",
      title: "Deliverables Section Heading",
      type: "string",
      group: "deliverables",
      initialValue: defaultChatgptAdsContent.deliverablesHeading,
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables (numbered items)",
      type: "array",
      group: "deliverables",
      initialValue: defaultChatgptAdsContent.deliverables,
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
      initialValue: defaultChatgptAdsContent.stepsEyebrow,
    }),
    defineField({
      name: "stepsHeading",
      title: "Steps Section Heading",
      type: "text",
      rows: 2,
      group: "steps",
      initialValue: defaultChatgptAdsContent.stepsHeading,
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      group: "steps",
      initialValue: defaultChatgptAdsContent.steps,
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
      initialValue: defaultChatgptAdsContent.measureHeading,
    }),
    defineField({
      name: "measureBody",
      title: "\"What We'll Pay Attention To\" Body",
      type: "text",
      rows: 3,
      group: "steps",
      initialValue: defaultChatgptAdsContent.measureBody,
    }),
    defineField({
      name: "caseStudyResult",
      title: "Case Study Result Stat",
      type: "string",
      group: "steps",
      initialValue: defaultChatgptAdsContent.caseStudyResult,
    }),
    defineField({
      name: "caseStudyLinkText",
      title: "Case Study Link Text",
      type: "string",
      group: "steps",
      initialValue: defaultChatgptAdsContent.caseStudyLinkText,
    }),
    defineField({
      name: "caseStudyHref",
      title: "Case Study Link URL",
      type: "string",
      group: "steps",
      initialValue: defaultChatgptAdsContent.caseStudyHref,
    }),

    // ── IS THIS RIGHT FOR YOU? ─────────────────────────────────────────────────
    defineField({
      name: "fitEyebrow",
      title: "Fit Section Eyebrow",
      type: "string",
      group: "fit",
      initialValue: defaultChatgptAdsContent.fitEyebrow,
    }),
    defineField({
      name: "fitHeading",
      title: "Fit Section Heading",
      type: "string",
      group: "fit",
      initialValue: defaultChatgptAdsContent.fitHeading,
    }),
    defineField({
      name: "fitItems",
      title: "Fit List Items",
      type: "array",
      group: "fit",
      initialValue: defaultChatgptAdsContent.fitItems,
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
      initialValue: defaultChatgptAdsContent.timelineHeading,
    }),
    defineField({
      name: "timelineBody",
      title: "Timeline Body",
      type: "text",
      rows: 4,
      group: "fit",
      initialValue: defaultChatgptAdsContent.timelineBody,
    }),
    defineField({
      name: "yourPartHeading",
      title: "\"What We Need From You\" Heading",
      type: "string",
      group: "fit",
      initialValue: defaultChatgptAdsContent.yourPartHeading,
    }),
    defineField({
      name: "yourPartBody",
      title: "\"What We Need From You\" Body",
      type: "text",
      rows: 4,
      group: "fit",
      initialValue: defaultChatgptAdsContent.yourPartBody,
    }),

    // ── FAQs ──────────────────────────────────────────────────────────────────
    defineField({
      name: "faqEyebrow",
      title: "FAQ Section Eyebrow",
      type: "string",
      group: "faq",
      initialValue: defaultChatgptAdsContent.faqEyebrow,
    }),
    defineField({
      name: "faqHeading",
      title: "FAQ Section Heading",
      type: "string",
      group: "faq",
      initialValue: defaultChatgptAdsContent.faqHeading,
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      group: "faq",
      initialValue: defaultChatgptAdsContent.faqs,
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
      initialValue: defaultChatgptAdsContent.relatedEyebrow,
    }),

    // ── PAGE CTA ──────────────────────────────────────────────────────────────
    defineField({
      name: "ctaEyebrow",
      title: "Page CTA Eyebrow",
      type: "string",
      group: "cta",
      initialValue: defaultChatgptAdsContent.ctaEyebrow,
    }),
    defineField({
      name: "ctaHeading",
      title: "Page CTA Heading",
      type: "string",
      group: "cta",
      initialValue: defaultChatgptAdsContent.ctaHeading,
    }),
    defineField({
      name: "ctaBody",
      title: "Page CTA Body",
      type: "text",
      rows: 3,
      group: "cta",
      initialValue: defaultChatgptAdsContent.ctaBody,
    }),
    defineField({
      name: "ctaButtonText",
      title: "Page CTA Button Text",
      type: "string",
      group: "cta",
      initialValue: defaultChatgptAdsContent.ctaButtonText,
    }),
    defineField({
      name: "ctaButtonHref",
      title: "Page CTA Button Link",
      type: "string",
      group: "cta",
      initialValue: defaultChatgptAdsContent.ctaButtonHref,
    }),
  ],
  preview: {
    select: { title: "heroHeadline", subtitle: "heroIntro" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title || "ChatGPT Ads Page",
        subtitle: subtitle ? subtitle.slice(0, 80) : "/services/chatgpt-ads",
      };
    },
  },
});

export type ChatgptAdsPageContent = typeof defaultChatgptAdsContent;
