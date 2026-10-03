import { defineArrayMember, defineField, defineType } from "sanity";

// --------------------------------------------------------------------------
// Default content — exact copy from content/services.ts + content/service-details.ts
// for the "cold-email" entry. Used as initialValue so Live Preview immediately
// shows the existing copy.
// --------------------------------------------------------------------------
export const defaultColdEmailContent = {
  _id: "coldEmailPage",
  _type: "coldEmailPage",

  // Hero
  heroEyebrow: "Cold Email",
  heroHeadline: "Start conversations with businesses that could hire you.",
  heroIntro:
    "Reach relevant business owners, property managers, and decision-makers with a clear reason to talk. Built for business-to-business opportunities.",
  heroCtaText: "Let's see if this fits your business",
  heroCtaHref: "/#contact",
  heroSmallNote: "A straightforward conversation. No technical homework.",

  // Visual aside
  visualLabel: "One good conversation can matter.",
  visualFlow1: "Get found",
  visualFlow2: "Build trust",
  visualFlow3: "Start a conversation",
  visualTagline: "Built around your business goals",

  // What It Actually Means section
  explainEyebrow: "WHAT IT ACTUALLY MEANS",
  explainHeading: "Cold Email, in plain English.",
  explainBody:
    "Cold email introduces your business to relevant professional contacts who have not asked you to get in touch. For contractors, that can mean property managers, commercial operators, or other businesses that buy your services. We focus on a useful reason to talk, responsible outreach, and a clear way for recipients to opt out.",
  exampleEyebrow: "PICTURE THIS",
  exampleBody:
    "A commercial property manager may need a dependable contractor for recurring work. A short, relevant introduction can start a conversation about their properties, current needs, and how they choose providers. The aim is a business opportunity, not a large email-sent counter.",

  // What We Handle (deliverables)
  deliverablesEyebrow: "WHAT WE HANDLE FOR YOU",
  deliverablesHeading: "The work behind the result.",
  deliverables: [
    {
      _key: "d-1",
      title: "A focused prospect profile",
      body: "We agree on business types, relevant roles, locations, and reasons they may need your service.",
    },
    {
      _key: "d-2",
      title: "List research and preparation",
      body: "We research professional contacts, check relevance, and remove duplicates and unsuitable records before outreach.",
    },
    {
      _key: "d-3",
      title: "Sending setup and message testing",
      body: "We plan a responsible sending setup and test clear messages with an honest identity, relevant offer, and opt-out route. We avoid misleading subjects and fabricated familiarity.",
    },
    {
      _key: "d-4",
      title: "Reply handling and handover",
      body: "We agree how interested replies reach your team, what qualifies as an opportunity, and how follow-up will happen. Suppression requests are respected.",
    },
  ],

  // A Plan Built Around Your Business (steps)
  stepsEyebrow: "A PLAN BUILT AROUND YOUR BUSINESS",
  stepsHeading:
    "If one good commercial relationship could change your workload, a thoughtful introduction can be worth making.",
  steps: [
    {
      _key: "s-1",
      title: "Choose the right people",
      body: "We define the business types, areas, and roles that fit your service. A useful list starts with relevance.",
    },
    {
      _key: "s-2",
      title: "Give them a reason to reply",
      body: "We write short, personal-feeling messages built around a real problem you can solve and a simple next step.",
    },
    {
      _key: "s-3",
      title: "Handle the next conversation",
      body: "We help organize replies and follow-up so interested prospects reach the right person on your team.",
    },
  ],
  measureHeading: "What we'll pay attention to",
  measureBody:
    "The goal is a relevant conversation with a potential customer. We track replies and qualified opportunities rather than treating sent emails as a result.",
  caseStudyResult: "",
  caseStudyLinkText: "",
  caseStudyHref: "",

  // Is This Right For You?
  fitEyebrow: "IS THIS RIGHT FOR YOU?",
  fitHeading: "A good fit starts here.",
  fitItems: [
    { _key: "f-1", text: "You sell to businesses or commercial decision-makers." },
    { _key: "f-2", text: "A small number of good relationships can justify the effort." },
    { _key: "f-3", text: "Someone on your team can respond thoughtfully to interested replies." },
  ],
  timelineHeading: "What to expect along the way",
  timelineBody:
    "Research, sending setup, and message preparation come before volume. We start carefully and review deliverability and replies. A positive reply starts a sales conversation; it does not guarantee a meeting or contract.",
  yourPartHeading: "What we need from you",
  yourPartBody:
    "Tell us the commercial work you want and why a business would choose you. Provide accurate company details, respond to interested prospects, and keep the outreach focused on markets you are prepared to serve.",

  // FAQs
  faqEyebrow: "BEFORE YOU DECIDE",
  faqHeading: "A few things you might be wondering.",
  faqs: [
    {
      _key: "faq-1",
      question: "Is this for residential customers?",
      answer:
        "This service is focused on business-to-business outreach, such as property managers or commercial operators. We choose a different channel when homeowner demand is the goal.",
    },
    {
      _key: "faq-2",
      question: "Will you send from my everyday inbox?",
      answer:
        "We agree on a responsible sending setup before launch and keep your normal customer communication in mind.",
    },
    {
      _key: "faq-3",
      question: "What happens when someone replies?",
      answer:
        "We establish who handles replies, what counts as a useful opportunity, and how quickly your team should respond. Messages include a clear way to opt out.",
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
export const coldEmailPageType = defineType({
  name: "coldEmailPage",
  title: "Cold Email Page (/services/cold-email)",
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
      initialValue: defaultColdEmailContent.heroEyebrow,
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      group: "hero",
      initialValue: defaultColdEmailContent.heroHeadline,
    }),
    defineField({
      name: "heroIntro",
      title: "Hero Intro Paragraph",
      type: "text",
      rows: 3,
      group: "hero",
      initialValue: defaultColdEmailContent.heroIntro,
    }),
    defineField({
      name: "heroCtaText",
      title: "Hero CTA Button Text",
      type: "string",
      group: "hero",
      initialValue: defaultColdEmailContent.heroCtaText,
    }),
    defineField({
      name: "heroCtaHref",
      title: "Hero CTA Button Link",
      type: "string",
      group: "hero",
      initialValue: defaultColdEmailContent.heroCtaHref,
    }),
    defineField({
      name: "heroSmallNote",
      title: "Hero Small Note (below CTA)",
      type: "string",
      group: "hero",
      initialValue: defaultColdEmailContent.heroSmallNote,
    }),

    // Hero visual aside
    defineField({
      name: "visualLabel",
      title: "Visual Aside — Tagline",
      type: "string",
      group: "hero",
      initialValue: defaultColdEmailContent.visualLabel,
    }),
    defineField({
      name: "visualFlow1",
      title: "Visual Flow Step 1",
      type: "string",
      group: "hero",
      initialValue: defaultColdEmailContent.visualFlow1,
    }),
    defineField({
      name: "visualFlow2",
      title: "Visual Flow Step 2",
      type: "string",
      group: "hero",
      initialValue: defaultColdEmailContent.visualFlow2,
    }),
    defineField({
      name: "visualFlow3",
      title: "Visual Flow Step 3",
      type: "string",
      group: "hero",
      initialValue: defaultColdEmailContent.visualFlow3,
    }),
    defineField({
      name: "visualTagline",
      title: "Visual Aside — Bottom Tagline",
      type: "string",
      group: "hero",
      initialValue: defaultColdEmailContent.visualTagline,
    }),
    defineField({
      name: "heroImage",
      title: "Hero Visual Image (optional override of mail icon/illustration)",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description:
        "Optional. If left empty the default mail icon is shown.",
    }),

    // ── WHAT IT ACTUALLY MEANS ────────────────────────────────────────────────
    defineField({
      name: "explainEyebrow",
      title: "Explain Section Eyebrow",
      type: "string",
      group: "explain",
      initialValue: defaultColdEmailContent.explainEyebrow,
    }),
    defineField({
      name: "explainHeading",
      title: "Explain Section Heading",
      type: "string",
      group: "explain",
      initialValue: defaultColdEmailContent.explainHeading,
    }),
    defineField({
      name: "explainBody",
      title: "Explain Section Body",
      type: "text",
      rows: 5,
      group: "explain",
      initialValue: defaultColdEmailContent.explainBody,
    }),
    defineField({
      name: "exampleEyebrow",
      title: "Example Aside Eyebrow",
      type: "string",
      group: "explain",
      initialValue: defaultColdEmailContent.exampleEyebrow,
    }),
    defineField({
      name: "exampleBody",
      title: "Example Aside Body",
      type: "text",
      rows: 4,
      group: "explain",
      initialValue: defaultColdEmailContent.exampleBody,
    }),

    // ── WHAT WE HANDLE (deliverables) ─────────────────────────────────────────
    defineField({
      name: "deliverablesEyebrow",
      title: "Deliverables Section Eyebrow",
      type: "string",
      group: "deliverables",
      initialValue: defaultColdEmailContent.deliverablesEyebrow,
    }),
    defineField({
      name: "deliverablesHeading",
      title: "Deliverables Section Heading",
      type: "string",
      group: "deliverables",
      initialValue: defaultColdEmailContent.deliverablesHeading,
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables (numbered items)",
      type: "array",
      group: "deliverables",
      initialValue: defaultColdEmailContent.deliverables,
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
      initialValue: defaultColdEmailContent.stepsEyebrow,
    }),
    defineField({
      name: "stepsHeading",
      title: "Steps Section Heading",
      type: "text",
      rows: 2,
      group: "steps",
      initialValue: defaultColdEmailContent.stepsHeading,
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      group: "steps",
      initialValue: defaultColdEmailContent.steps,
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
      initialValue: defaultColdEmailContent.measureHeading,
    }),
    defineField({
      name: "measureBody",
      title: "\"What We'll Pay Attention To\" Body",
      type: "text",
      rows: 3,
      group: "steps",
      initialValue: defaultColdEmailContent.measureBody,
    }),
    defineField({
      name: "caseStudyResult",
      title: "Case Study Result Stat",
      type: "string",
      group: "steps",
      initialValue: defaultColdEmailContent.caseStudyResult,
    }),
    defineField({
      name: "caseStudyLinkText",
      title: "Case Study Link Text",
      type: "string",
      group: "steps",
      initialValue: defaultColdEmailContent.caseStudyLinkText,
    }),
    defineField({
      name: "caseStudyHref",
      title: "Case Study Link URL",
      type: "string",
      group: "steps",
      initialValue: defaultColdEmailContent.caseStudyHref,
    }),

    // ── IS THIS RIGHT FOR YOU? ─────────────────────────────────────────────────
    defineField({
      name: "fitEyebrow",
      title: "Fit Section Eyebrow",
      type: "string",
      group: "fit",
      initialValue: defaultColdEmailContent.fitEyebrow,
    }),
    defineField({
      name: "fitHeading",
      title: "Fit Section Heading",
      type: "string",
      group: "fit",
      initialValue: defaultColdEmailContent.fitHeading,
    }),
    defineField({
      name: "fitItems",
      title: "Fit List Items",
      type: "array",
      group: "fit",
      initialValue: defaultColdEmailContent.fitItems,
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
      initialValue: defaultColdEmailContent.timelineHeading,
    }),
    defineField({
      name: "timelineBody",
      title: "Timeline Body",
      type: "text",
      rows: 4,
      group: "fit",
      initialValue: defaultColdEmailContent.timelineBody,
    }),
    defineField({
      name: "yourPartHeading",
      title: "\"What We Need From You\" Heading",
      type: "string",
      group: "fit",
      initialValue: defaultColdEmailContent.yourPartHeading,
    }),
    defineField({
      name: "yourPartBody",
      title: "\"What We Need From You\" Body",
      type: "text",
      rows: 4,
      group: "fit",
      initialValue: defaultColdEmailContent.yourPartBody,
    }),

    // ── FAQs ──────────────────────────────────────────────────────────────────
    defineField({
      name: "faqEyebrow",
      title: "FAQ Section Eyebrow",
      type: "string",
      group: "faq",
      initialValue: defaultColdEmailContent.faqEyebrow,
    }),
    defineField({
      name: "faqHeading",
      title: "FAQ Section Heading",
      type: "string",
      group: "faq",
      initialValue: defaultColdEmailContent.faqHeading,
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      group: "faq",
      initialValue: defaultColdEmailContent.faqs,
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
      initialValue: defaultColdEmailContent.relatedEyebrow,
    }),

    // ── PAGE CTA ──────────────────────────────────────────────────────────────
    defineField({
      name: "ctaEyebrow",
      title: "Page CTA Eyebrow",
      type: "string",
      group: "cta",
      initialValue: defaultColdEmailContent.ctaEyebrow,
    }),
    defineField({
      name: "ctaHeading",
      title: "Page CTA Heading",
      type: "string",
      group: "cta",
      initialValue: defaultColdEmailContent.ctaHeading,
    }),
    defineField({
      name: "ctaBody",
      title: "Page CTA Body",
      type: "text",
      rows: 3,
      group: "cta",
      initialValue: defaultColdEmailContent.ctaBody,
    }),
    defineField({
      name: "ctaButtonText",
      title: "Page CTA Button Text",
      type: "string",
      group: "cta",
      initialValue: defaultColdEmailContent.ctaButtonText,
    }),
    defineField({
      name: "ctaButtonHref",
      title: "Page CTA Button Link",
      type: "string",
      group: "cta",
      initialValue: defaultColdEmailContent.ctaButtonHref,
    }),
  ],
  preview: {
    select: { title: "heroHeadline", subtitle: "heroIntro" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title || "Cold Email Page",
        subtitle: subtitle ? subtitle.slice(0, 80) : "/services/cold-email",
      };
    },
  },
});

export type ColdEmailPageContent = typeof defaultColdEmailContent;
