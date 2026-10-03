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

async function seedAeoPage() {
  try {
    console.log(`🚀 Seeding AEO page content to Sanity project: ${projectId}...`);

    const existing = await client.getDocument("aeoPage");
    if (existing) {
      console.log("ℹ️ Document aeoPage already exists in Sanity. Ensuring defaults with setIfMissing...");
      await client.patch("aeoPage").setIfMissing(defaultContent).commit();
      console.log("✅ Verified and ensured fields on aeoPage document.");
      return;
    }

    const res = await client.createIfNotExists(defaultContent);
    console.log("✅ Successfully created AEO Page document:", res._id);
  } catch (err) {
    console.error("❌ Failed to seed AEO Page document:", err.message);
  }
}

seedAeoPage();
