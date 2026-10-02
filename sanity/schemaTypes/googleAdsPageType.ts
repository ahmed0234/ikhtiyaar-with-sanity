import { defineArrayMember, defineField, defineType } from "sanity";

// --------------------------------------------------------------------------
// Default content — exact copy from content/services.ts + content/service-details.ts
// for the "google-ads" entry. Used as initialValue so Live Preview immediately
// shows the existing copy.
// --------------------------------------------------------------------------
export const defaultGoogleAdsContent = {
  _id: "googleAdsPage",
  _type: "googleAdsPage",

  // Hero
  heroEyebrow: "Google Ads",
  heroHeadline: "Be there when someone needs the work done.",
  heroIntro:
    "Turn searches for your services into calls from people in your area. We build and manage Google Ads around the jobs you actually want.",
  heroCtaText: "Let's see if this fits your business",
  heroCtaHref: "/#contact",
  heroSmallNote: "A straightforward conversation. No technical homework.",

  // Visual aside
  visualLabel: "Someone is already looking.",
  visualFlow1: "Get found",
  visualFlow2: "Build trust",
  visualFlow3: "Start a conversation",
  visualTagline: "Built around your business goals",

  // What It Actually Means section
  explainEyebrow: "WHAT IT ACTUALLY MEANS",
  explainHeading: "Google Ads, in plain English.",
  explainBody:
    "Google Ads puts your business in front of people searching for a service you offer. If someone searches for a patio installer in your area, your ad can give them a direct route to your business. You pay when someone clicks. Our job is to make those clicks more likely to come from the people you can actually help.",
  exampleEyebrow: "PICTURE THIS",
  exampleBody:
    "A homeowner wants a new patio. They search, see an ad for patio installation, and land on a page showing the kind of work they want. They see your service area and request an estimate. That is the journey we work to make clear from start to finish.",

  // What We Handle (deliverables)
  deliverablesEyebrow: "WHAT WE HANDLE FOR YOU",
  deliverablesHeading: "The work behind the result.",
  deliverables: [
    {
      _key: "d-1",
      title: "A practical starting plan",
      body: "We look at search demand, local competition, job value, and the areas you can serve. Then we agree on the services to promote and a budget you can work with.",
    },
    {
      _key: "d-2",
      title: "Campaigns that match the job",
      body: "We group searches by the work people want. A person looking for hardscaping should see a message about hardscaping, not a catch-all list of every service you offer.",
    },
    {
      _key: "d-3",
      title: "A page that earns the inquiry",
      body: "We connect the ad to a clear landing page with relevant project photos, honest proof, and a short route to calling or requesting an estimate.",
    },
    {
      _key: "d-4",
      title: "Tracking and ongoing decisions",
      body: "We set up available call and form tracking, review search terms, exclude irrelevant searches, and use your feedback to improve the campaign.",
    },
  ],

  // A Plan Built Around Your Business (steps)
  stepsEyebrow: "A PLAN BUILT AROUND YOUR BUSINESS",
  stepsHeading:
    "Someone nearby is already looking for a contractor. The question is whether they find you.",
  steps: [
    {
      _key: "s-1",
      title: "Choose the right jobs",
      body: "We agree on your services, area, capacity, and what a worthwhile job looks like before choosing where to spend.",
    },
    {
      _key: "s-2",
      title: "Give people a reason to call",
      body: "Your ads and landing page show what you do, proof of your work, and a clear next step.",
    },
    {
      _key: "s-3",
      title: "Follow the money",
      body: "We review calls and estimate requests with you, cut wasted searches, and focus the budget on inquiries that can become paying work.",
    },
  ],
  measureHeading: "What we'll pay attention to",
  measureBody:
    "Ad clicks are only the start. We want to know which calls were useful, which estimates went out, and which jobs closed.",
  caseStudyResult: "About $4,000 spent. $200,000 in client revenue.",
  caseStudyLinkText: "Read the Ridgewell case study",
  caseStudyHref: "/case-studies/ridgewell-landscape-design",

  // Is This Right For You?
  fitEyebrow: "IS THIS RIGHT FOR YOU?",
  fitHeading: "A good fit starts here.",
  fitItems: [
    { _key: "f-1", text: "People already search for your service in your area." },
    { _key: "f-2", text: "A booked job has enough value to support advertising costs." },
    { _key: "f-3", text: "You can answer calls and follow up with estimates." },
  ],
  timelineHeading: "What to expect along the way",
  timelineBody:
    "We start with planning, account access, tracking, and the page people will visit. Once the campaign is approved and running, early data helps us adjust. Meaningful decisions need enough activity, not just a few days of clicks.",
  yourPartHeading: "What we need from you",
  yourPartBody:
    "Tell us which jobs you want, what they are worth, and which areas you cover. Share real project photos, answer inquiries promptly, and let us know which leads turn into estimates and completed work.",

  // FAQs
  faqEyebrow: "BEFORE YOU DECIDE",
  faqHeading: "A few things you might be wondering.",
  faqs: [
    {
      _key: "faq-1",
      question: "How much should I spend?",
      answer:
        "We work backward from your job value and local competition. Your ad spend and our management fee are separate, and we agree on both before starting.",
    },
    {
      _key: "faq-2",
      question: "How quickly can calls come in?",
      answer:
        "Ads can begin reaching people after approval and launch. Getting consistent, worthwhile inquiries takes testing and feedback; a launch date is not a promise of booked jobs.",
    },
    {
      _key: "faq-3",
      question: "Will I own my account?",
      answer: "Yes. Your advertising account and the information in it stay yours.",
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
export const googleAdsPageType = defineType({
  name: "googleAdsPage",
  title: "Google Ads Page (/services/google-ads)",
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
      initialValue: defaultGoogleAdsContent.heroEyebrow,
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      group: "hero",
      initialValue: defaultGoogleAdsContent.heroHeadline,
    }),
    defineField({
      name: "heroIntro",
      title: "Hero Intro Paragraph",
      type: "text",
      rows: 3,
      group: "hero",
      initialValue: defaultGoogleAdsContent.heroIntro,
    }),
    defineField({
      name: "heroCtaText",
      title: "Hero CTA Button Text",
      type: "string",
      group: "hero",
      initialValue: defaultGoogleAdsContent.heroCtaText,
    }),
    defineField({
      name: "heroCtaHref",
      title: "Hero CTA Button Link",
      type: "string",
      group: "hero",
      initialValue: defaultGoogleAdsContent.heroCtaHref,
    }),
    defineField({
      name: "heroSmallNote",
      title: "Hero Small Note (below CTA)",
      type: "string",
      group: "hero",
      initialValue: defaultGoogleAdsContent.heroSmallNote,
    }),

    // Hero visual aside
    defineField({
      name: "visualLabel",
      title: "Visual Aside — Tagline",
      type: "string",
      group: "hero",
      initialValue: defaultGoogleAdsContent.visualLabel,
    }),
    defineField({
      name: "visualFlow1",
      title: "Visual Flow Step 1",
      type: "string",
      group: "hero",
      initialValue: defaultGoogleAdsContent.visualFlow1,
    }),
    defineField({
      name: "visualFlow2",
      title: "Visual Flow Step 2",
      type: "string",
      group: "hero",
      initialValue: defaultGoogleAdsContent.visualFlow2,
    }),
    defineField({
      name: "visualFlow3",
      title: "Visual Flow Step 3",
      type: "string",
      group: "hero",
      initialValue: defaultGoogleAdsContent.visualFlow3,
    }),
    defineField({
      name: "visualTagline",
      title: "Visual Aside — Bottom Tagline",
      type: "string",
      group: "hero",
      initialValue: defaultGoogleAdsContent.visualTagline,
    }),
    defineField({
      name: "heroImage",
      title: "Hero Visual Image (optional override of platform icon)",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description:
        "Optional. If left empty the default Google Ads platform icon (/platforms/google-ads.svg) is shown.",
    }),

    // ── WHAT IT ACTUALLY MEANS ────────────────────────────────────────────────
    defineField({
      name: "explainEyebrow",
      title: "Explain Section Eyebrow",
      type: "string",
      group: "explain",
      initialValue: defaultGoogleAdsContent.explainEyebrow,
    }),
    defineField({
      name: "explainHeading",
      title: "Explain Section Heading",
      type: "string",
      group: "explain",
      initialValue: defaultGoogleAdsContent.explainHeading,
    }),
    defineField({
      name: "explainBody",
      title: "Explain Section Body",
      type: "text",
      rows: 5,
      group: "explain",
      initialValue: defaultGoogleAdsContent.explainBody,
    }),
    defineField({
      name: "exampleEyebrow",
      title: "Example Aside Eyebrow",
      type: "string",
      group: "explain",
      initialValue: defaultGoogleAdsContent.exampleEyebrow,
    }),
    defineField({
      name: "exampleBody",
      title: "Example Aside Body",
      type: "text",
      rows: 4,
      group: "explain",
      initialValue: defaultGoogleAdsContent.exampleBody,
    }),

    // ── WHAT WE HANDLE (deliverables) ─────────────────────────────────────────
    defineField({
      name: "deliverablesEyebrow",
      title: "Deliverables Section Eyebrow",
      type: "string",
      group: "deliverables",
      initialValue: defaultGoogleAdsContent.deliverablesEyebrow,
    }),
    defineField({
      name: "deliverablesHeading",
      title: "Deliverables Section Heading",
      type: "string",
      group: "deliverables",
      initialValue: defaultGoogleAdsContent.deliverablesHeading,
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables (numbered items)",
      type: "array",
      group: "deliverables",
      initialValue: defaultGoogleAdsContent.deliverables,
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
      initialValue: defaultGoogleAdsContent.stepsEyebrow,
    }),
    defineField({
      name: "stepsHeading",
      title: "Steps Section Heading",
      type: "text",
      rows: 2,
      group: "steps",
      initialValue: defaultGoogleAdsContent.stepsHeading,
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      group: "steps",
      initialValue: defaultGoogleAdsContent.steps,
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
      initialValue: defaultGoogleAdsContent.measureHeading,
    }),
    defineField({
      name: "measureBody",
      title: "\"What We'll Pay Attention To\" Body",
      type: "text",
      rows: 3,
      group: "steps",
      initialValue: defaultGoogleAdsContent.measureBody,
    }),
    defineField({
      name: "caseStudyResult",
      title: "Case Study Result Stat",
      type: "string",
      group: "steps",
      initialValue: defaultGoogleAdsContent.caseStudyResult,
    }),
    defineField({
      name: "caseStudyLinkText",
      title: "Case Study Link Text",
      type: "string",
      group: "steps",
      initialValue: defaultGoogleAdsContent.caseStudyLinkText,
    }),
    defineField({
      name: "caseStudyHref",
      title: "Case Study Link URL",
      type: "string",
      group: "steps",
      initialValue: defaultGoogleAdsContent.caseStudyHref,
    }),

    // ── IS THIS RIGHT FOR YOU? ─────────────────────────────────────────────────
    defineField({
      name: "fitEyebrow",
      title: "Fit Section Eyebrow",
      type: "string",
      group: "fit",
      initialValue: defaultGoogleAdsContent.fitEyebrow,
    }),
    defineField({
      name: "fitHeading",
      title: "Fit Section Heading",
      type: "string",
      group: "fit",
      initialValue: defaultGoogleAdsContent.fitHeading,
    }),
    defineField({
      name: "fitItems",
      title: "Fit List Items",
      type: "array",
      group: "fit",
      initialValue: defaultGoogleAdsContent.fitItems,
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
      initialValue: defaultGoogleAdsContent.timelineHeading,
    }),
    defineField({
      name: "timelineBody",
      title: "Timeline Body",
      type: "text",
      rows: 4,
      group: "fit",
      initialValue: defaultGoogleAdsContent.timelineBody,
    }),
    defineField({
      name: "yourPartHeading",
      title: "\"What We Need From You\" Heading",
      type: "string",
      group: "fit",
      initialValue: defaultGoogleAdsContent.yourPartHeading,
    }),
    defineField({
      name: "yourPartBody",
      title: "\"What We Need From You\" Body",
      type: "text",
      rows: 4,
      group: "fit",
      initialValue: defaultGoogleAdsContent.yourPartBody,
    }),

    // ── FAQs ──────────────────────────────────────────────────────────────────
    defineField({
      name: "faqEyebrow",
      title: "FAQ Section Eyebrow",
      type: "string",
      group: "faq",
      initialValue: defaultGoogleAdsContent.faqEyebrow,
    }),
    defineField({
      name: "faqHeading",
      title: "FAQ Section Heading",
      type: "string",
      group: "faq",
      initialValue: defaultGoogleAdsContent.faqHeading,
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      group: "faq",
      initialValue: defaultGoogleAdsContent.faqs,
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
      initialValue: defaultGoogleAdsContent.relatedEyebrow,
    }),

    // ── PAGE CTA ──────────────────────────────────────────────────────────────
    defineField({
      name: "ctaEyebrow",
      title: "Page CTA Eyebrow",
      type: "string",
      group: "cta",
      initialValue: defaultGoogleAdsContent.ctaEyebrow,
    }),
    defineField({
      name: "ctaHeading",
      title: "Page CTA Heading",
      type: "string",
      group: "cta",
      initialValue: defaultGoogleAdsContent.ctaHeading,
    }),
    defineField({
      name: "ctaBody",
      title: "Page CTA Body",
      type: "text",
      rows: 3,
      group: "cta",
      initialValue: defaultGoogleAdsContent.ctaBody,
    }),
    defineField({
      name: "ctaButtonText",
      title: "Page CTA Button Text",
      type: "string",
      group: "cta",
      initialValue: defaultGoogleAdsContent.ctaButtonText,
    }),
    defineField({
      name: "ctaButtonHref",
      title: "Page CTA Button Link",
      type: "string",
      group: "cta",
      initialValue: defaultGoogleAdsContent.ctaButtonHref,
    }),
  ],
  preview: {
    select: { title: "heroHeadline", subtitle: "heroIntro" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title || "Google Ads Page",
        subtitle: subtitle ? subtitle.slice(0, 80) : "/services/google-ads",
      };
    },
  },
});

export type GoogleAdsPageContent = typeof defaultGoogleAdsContent;
