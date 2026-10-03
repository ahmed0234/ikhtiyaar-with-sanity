import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// Load .env.local variables
const envPath = resolve(process.cwd(), ".env.local");
const envVars = {};
if (existsSync(envPath)) {
  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || "";
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      envVars[key] = value.trim();
    }
  }
}

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  envVars.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "bt5m0mkt";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  envVars.NEXT_PUBLIC_SANITY_DATASET ||
  "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_API_READ_TOKEN ||
  envVars.SANITY_API_WRITE_TOKEN ||
  envVars.SANITY_API_READ_TOKEN;

if (!token) {
  console.error("❌ No Sanity write token found");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const defaultContent = {
  _id: "seoPage",
  _type: "seoPage",

  // Hero
  heroEyebrow: "Search Engine Optimization",
  heroHeadline: "Get found without paying for every visit.",
  heroIntro:
    "Help people find your business in Google’s regular search results, with useful pages that turn the right visits into inquiries.",
  heroCtaText: "Let's see if this fits your business",
  heroCtaHref: "/#contact",
  heroSmallNote: "A straightforward conversation. No technical homework.",

  // Visual aside
  visualLabel: "A useful answer. A new inquiry.",
  visualFlow1: "Get found",
  visualFlow2: "Build trust",
  visualFlow3: "Start a conversation",
  visualTagline: "Built around your business goals",

  // What It Actually Means section
  explainEyebrow: "WHAT IT ACTUALLY MEANS",
  explainHeading: "Search Engine Optimization, in plain English.",
  explainBody:
    "Search engine optimization means improving your website so people can find it through unpaid search results. It includes making pages easy for Google to read, explaining your services clearly, and publishing useful information that answers customer questions. Unlike an ad, you do not pay Google for each organic click.",
  exampleEyebrow: "PICTURE THIS",
  exampleBody:
    "A business owner searches for help with a specific insurance need. A useful page explains the options in plain language, shows who can help, and makes the next step clear. The visit can become an inquiry because the page answered the question that brought them there.",

  // What We Handle (deliverables)
  deliverablesEyebrow: "WHAT WE HANDLE FOR YOU",
  deliverablesHeading: "The work behind the result.",
  deliverables: [
    {
      _key: "d-1",
      title: "A website and search review",
      body: "We check important pages, indexing, internal links, usability, and the searches that matter to your business. We prioritize issues that can affect discovery or inquiries.",
    },
    {
      _key: "d-2",
      title: "Better service and location pages",
      body: "We build clear pages for services you genuinely offer and locations you actually serve. We avoid publishing dozens of near-identical pages just to repeat a place name.",
    },
    {
      _key: "d-3",
      title: "Useful articles and answers",
      body: "We plan content around customer questions and buying decisions. Your experience helps make the advice accurate, specific, and useful.",
    },
    {
      _key: "d-4",
      title: "Measurement that connects to the business",
      body: "We review organic visibility, relevant visits, and recorded inquiries. We use those findings to improve the pages with the greatest business value.",
    },
  ],

  // A Plan Built Around Your Business (steps)
  stepsEyebrow: "A PLAN BUILT AROUND YOUR BUSINESS",
  stepsHeading:
    "Your next customer might be searching for a service, comparing options, or trying to solve a problem. Your website should help with all three.",
  steps: [
    {
      _key: "s-1",
      title: "Make the site easy to find",
      body: "We check whether search engines can read your pages and fix problems that get in the way.",
    },
    {
      _key: "s-2",
      title: "Answer the right questions",
      body: "We build useful service and location content around what you actually offer, backed by your experience and real work.",
    },
    {
      _key: "s-3",
      title: "Turn visits into next steps",
      body: "Clear proof, helpful answers, and easy contact options give visitors a reason to get in touch.",
    },
  ],
  measureHeading: "What we'll pay attention to",
  measureBody:
    "Traffic only matters when it supports your business. We look at relevant visits, inquiries, and which pages help people take the next step.",
  caseStudyResult: "2,000 average monthly organic visitors. 100+ leads.",
  caseStudyLinkText: "Read the Casey Insurance Group case study",
  caseStudyHref: "/case-studies/casey-insurance-group",

  // Is This Right For You?
  fitEyebrow: "IS THIS RIGHT FOR YOU?",
  fitHeading: "A good fit starts here.",
  fitItems: [
    { _key: "f-1", text: "You want a longer-term source of relevant visitors." },
    { _key: "f-2", text: "You can invest consistently rather than expecting an overnight change." },
    { _key: "f-3", text: "Your team can share expertise and real service information for the content." },
  ],
  timelineHeading: "What to expect along the way",
  timelineBody:
    "SEO is ongoing work. Fixes may be found relatively quickly, while meaningful visibility and lead growth often take months. Competition, the starting website, and the quality of the work affect the pace.",
  yourPartHeading: "What we need from you",
  yourPartBody:
    "Help us understand your services and customers. Review specialist advice for accuracy, share examples we can use, and tell us which inquiries become useful conversations.",

  // FAQs
  faqEyebrow: "BEFORE YOU DECIDE",
  faqHeading: "A few things you might be wondering.",
  faqs: [
    {
      _key: "faq-1",
      question: "How long does SEO take?",
      answer:
        "It usually takes months to build meaningful progress. Your starting point, competition, and the work needed all affect the timeline.",
    },
    {
      _key: "faq-2",
      question: "Can you promise first place on Google?",
      answer:
        "No. We can improve your website and measure progress, but Google decides what appears and where.",
    },
    {
      _key: "faq-3",
      question: "Will you write the content?",
      answer:
        "We can plan and write it with your input. Your experience, service details, and real examples make it more useful and accurate.",
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

async function seedSeoPage() {
  try {
    console.log(`🚀 Seeding SEO page content to Sanity project: ${projectId}...`);

    const res = await client.createIfNotExists(defaultContent);
    console.log("✅ Successfully created SEO Page document:", res._id);
  } catch (err) {
    console.error("❌ Failed to seed SEO Page document:", err.message);
  }
}

seedSeoPage();
