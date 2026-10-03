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

async function seedChatgptAdsPage() {
  try {
    console.log(`🚀 Seeding ChatGPT Ads page content to Sanity project: ${projectId}...`);

    // Upload hero image icon (OpenAI logo)
    const openaiIcon = await uploadAssetIfFound(
      "public/platforms/openai.svg",
      "image/svg+xml"
    );

    const docToCreate = {
      ...defaultContent,
      ...(openaiIcon
        ? {
            heroImage: {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: openaiIcon._id,
              },
            },
          }
        : {}),
    };

    const existing = await client.getDocument("chatgptAdsPage");
    if (existing) {
      console.log("ℹ️ Document chatgptAdsPage already exists in Sanity. Ensuring defaults with setIfMissing...");
      await client.patch("chatgptAdsPage").setIfMissing(docToCreate).commit();
      console.log("✅ Verified and ensured fields on chatgptAdsPage document.");
      return;
    }

    const res = await client.createIfNotExists(docToCreate);
    console.log("✅ Successfully created ChatGPT Ads Page document:", res._id);
  } catch (err) {
    console.error("❌ Failed to seed ChatGPT Ads Page document:", err.message);
  }
}

seedChatgptAdsPage();
