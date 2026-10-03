import { createClient } from "@sanity/client";
import { readFileSync, existsSync, createReadStream } from "node:fs";
import { resolve, basename } from "node:path";

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

async function uploadAssetIfFound(relPath, contentType) {
  const absPath = resolve(process.cwd(), relPath);
  if (!existsSync(absPath)) {
    console.warn(`⚠️ File not found: ${relPath}`);
    return null;
  }
  const filename = basename(absPath);
  try {
    const existing = await client.fetch(
      `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]`,
      { filename }
    );
    if (existing) {
      console.log(`⚡ Existing asset found for ${filename}: ${existing._id}`);
      return existing;
    }
  } catch (e) {
    // Continue to upload
  }

  const stream = createReadStream(absPath);
  console.log(`📤 Uploading ${filename} to Sanity...`);
  const asset = await client.assets.upload("image", stream, {
    filename,
    contentType,
  });
  console.log(`✅ Uploaded ${filename}: ${asset._id}`);
  return asset;
}

const defaultContent = {
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

async function seedMetaAdsPage() {
  try {
    console.log(`🚀 Seeding Meta Ads page content to Sanity project: ${projectId}...`);

    // Upload hero image icon
    const metaIcon = await uploadAssetIfFound(
      "public/platforms/meta.svg",
      "image/svg+xml"
    );

    const docToCreate = {
      ...defaultContent,
      ...(metaIcon
        ? {
            heroImage: {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: metaIcon._id,
              },
            },
          }
        : {}),
    };

    const res = await client.createIfNotExists(docToCreate);
    console.log("✅ Successfully created Meta Ads Page document:", res._id);
  } catch (err) {
    console.error("❌ Failed to seed Meta Ads Page document:", err.message);
  }
}

seedMetaAdsPage();
