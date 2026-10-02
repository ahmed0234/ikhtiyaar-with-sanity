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

async function seedGoogleAdsPage() {
  try {
    console.log(`🚀 Seeding Google Ads page content to Sanity project: ${projectId}...`);

    // Check if document already exists
    const existing = await client.getDocument("googleAdsPage");
    if (existing) {
      console.log("ℹ️ Document googleAdsPage already exists in Sanity. Preserving existing document.");
      return;
    }

    // Upload hero image icon
    const googleAdsIcon = await uploadAssetIfFound(
      "public/platforms/google-ads.svg",
      "image/svg+xml"
    );

    const docToCreate = {
      ...defaultContent,
      ...(googleAdsIcon
        ? {
            heroImage: {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: googleAdsIcon._id,
              },
            },
          }
        : {}),
    };

    const res = await client.createIfNotExists(docToCreate);
    console.log("✅ Successfully created Google Ads Page document:", res._id);
  } catch (err) {
    console.error("❌ Failed to seed Google Ads Page document:", err.message);
  }
}

seedGoogleAdsPage();
