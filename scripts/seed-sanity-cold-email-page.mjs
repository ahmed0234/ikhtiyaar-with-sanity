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

async function seedColdEmailPage() {
  try {
    console.log(`🚀 Seeding Cold Email page content to Sanity project: ${projectId}...`);

    const res = await client.createIfNotExists(defaultContent);
    console.log("✅ Successfully created Cold Email Page document:", res._id);
  } catch (err) {
    console.error("❌ Failed to seed Cold Email Page document:", err.message);
  }
}

seedColdEmailPage();
