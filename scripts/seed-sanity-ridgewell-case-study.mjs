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
  _id: "ridgewellCaseStudy",
  _type: "ridgewellCaseStudy",

  // Hero
  breadcrumbText: "All case studies",
  breadcrumbHref: "/case-studies",
  clientName: "Ridgewell Landscape & Design",
  service: "Google Ads",
  heroEyebrow: "Ridgewell Landscape & Design · Google Ads",
  headline: "A $4,000 ad spend. $200,000 in revenue.",
  intro:
    "Ridgewell's result shows why we look beyond clicks. The number that matters is what those inquiries turn into for the business.",

  // Metrics row
  metrics: [
    {
      _key: "m-1",
      value: "~$4K",
      label: "Advertising spend",
    },
    {
      _key: "m-2",
      value: "$200K",
      label: "Client revenue",
    },
    {
      _key: "m-3",
      value: "~50×",
      label: "Revenue relative to ad spend",
    },
  ],

  // Section: The Business Behind The Numbers
  contextEyebrow: "THE BUSINESS BEHIND THE NUMBERS",
  contextHeading: "What mattered for Ridgewell Landscape & Design",
  contextBody:
    "Ridgewell Landscape & Design works in a market where a single well-matched project can carry meaningful value. The campaign needed to connect the business with people looking for the kind of work it could deliver. Click volume alone would not tell that story.",

  // Objective Callout Box
  objectiveLabel: "The objective",
  objectiveText:
    "Connect local demand with a clear route to an estimate, then judge the advertising against the revenue the business produced.",

  // Section: What The Work Produced
  producedHeading: "What the work produced",
  producedBody:
    "We ran Google Ads for Ridgewell Landscape & Design. With around $4,000 in advertising spend, the business generated $200,000 in revenue. That works out to approximately $50 in revenue for each $1 spent on ads.",

  // Detail image alt
  imageAlt: "Completed Ridgewell outdoor living and landscape project",

  // Section: Understanding The Numbers
  interpretHeading: "Understanding the numbers",
  interpretBody:
    "Using the approximate figures supplied, $200,000 divided by $4,000 is about 50. That is a revenue-to-ad-spend ratio of roughly 50:1. It is not a profit multiple: labor, materials, management fees, overhead, and other costs still need to be accounted for.",

  // Section: Process / How We Approach
  processTitle: "How we approach a campaign like this",
  processNote:
    "The results below are Ridgewell’s reported results. These steps explain our campaign-management approach; they are not a dated account of every change made in this campaign.",
  processSteps: [
    {
      _key: "ps-1",
      title: "Start with the economics",
      text: "We begin with the services, service area, and value of a worthwhile job. That gives a campaign a commercial target: inquiries that could become work worth taking on.",
    },
    {
      _key: "ps-2",
      title: "Match the search to the service",
      text: "We separate distinct customer needs so an ad can speak to the job being requested. Search terms help reveal where the traffic matches the service and where spend needs tightening.",
    },
    {
      _key: "ps-3",
      title: "Make the route to an estimate clear",
      text: "A relevant page should show the work, establish trust, and make calling or requesting an estimate simple. The message needs to stay consistent from the search to the page.",
    },
    {
      _key: "ps-4",
      title: "Connect marketing with what happened next",
      text: "Inquiry tracking starts the picture. Feedback about estimates and completed jobs makes it more useful. Revenue gives the campaign a business outcome beyond click and lead counts.",
    },
  ],

  // Section: What This Means For Your Business
  takeawayHeading: "What this means for your business",
  takeawayBody:
    "The lesson is not that every contractor should expect this return. It is that advertising should be assessed against the value of the work it helps bring in. A useful plan starts with your market, job values, and ability to turn inquiries into customers.",
  lessonBody:
    "For a business taking on valuable landscape and design projects, the right inquiry can be worth far more than a long list of unrelated calls. A useful campaign needs to be judged alongside the work it brings in.",

  // Explore Service Text Link
  serviceLinkText: "Explore Google Ads",
  serviceLinkHref: "/services/google-ads",

  // Result Note Aside
  resultNote:
    "Spend is approximate. Revenue is not profit; the ratio excludes management fees and the cost of completing the work. Individual results vary.",

  // Page CTA
  ctaEyebrow: "LET'S TALK ABOUT YOUR BUSINESS",
  ctaHeading: "What would better inquiries mean for you?",
  ctaBody:
    "Tell us what you do, where you work, and what you want more of. We'll figure out whether we can help.",
  ctaButtonText: "Let's look at what's possible",
  ctaButtonHref: "/#contact",
};

async function seedRidgewellCaseStudy() {
  try {
    console.log(
      `🚀 Seeding Ridgewell Case Study content to Sanity project: ${projectId}...`
    );

    // Upload or find ridgewell-project.webp
    const ridgewellAsset = await uploadAssetIfFound(
      "public/ridgewell-project.webp",
      "image/webp"
    );

    const docToCreate = {
      ...defaultContent,
      ...(ridgewellAsset
        ? {
            image: {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: ridgewellAsset._id,
              },
              alt: defaultContent.imageAlt,
            },
          }
        : {}),
    };

    const existing = await client.getDocument("ridgewellCaseStudy");
    if (existing) {
      console.log(
        "ℹ️ Document ridgewellCaseStudy already exists in Sanity. Ensuring defaults with setIfMissing..."
      );
      await client
        .patch("ridgewellCaseStudy")
        .setIfMissing(docToCreate)
        .commit();
      console.log(
        "✅ Verified and ensured fields on ridgewellCaseStudy document."
      );
      return;
    }

    const res = await client.createIfNotExists(docToCreate);
    console.log(
      "✅ Successfully created Ridgewell Case Study document:",
      res._id
    );
  } catch (err) {
    console.error(
      "❌ Failed to seed Ridgewell Case Study document:",
      err.message
    );
  }
}

seedRidgewellCaseStudy();
