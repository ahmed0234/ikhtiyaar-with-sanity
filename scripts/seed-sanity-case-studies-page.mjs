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
  _id: "caseStudiesPage",
  _type: "caseStudiesPage",

  // Hero
  heroEyebrow: "CASE STUDIES",
  heroHeadingLine1: "Real businesses.",
  heroHeadingLine2: "Results worth talking about.",
  heroIntro:
    "Different businesses. Different ways to get found. Here's what the work produced.",

  // Case studies list
  cases: [
    {
      _key: "case-ridgewell",
      clientName: "Ridgewell Landscape & Design",
      service: "Google Ads",
      headline: "A $4,000 ad spend. $200,000 in revenue.",
      intro:
        "Ridgewell's result shows why we look beyond clicks. The number that matters is what those inquiries turn into for the business.",
      buttonText: "Read the case study",
      buttonHref: "/case-studies/ridgewell-landscape-design",
      visualType: "image",
      backgroundColor: "#092c40",
      statBadge: "Ridgewell Landscape & Design",
      statNumber: "$200,000",
      statLabel: "in client revenue",
    },
    {
      _key: "case-casey",
      clientName: "Casey Insurance Group",
      service: "Search Engine Optimization",
      headline: "A growing source of visits. More than 100 leads.",
      intro:
        "Casey Insurance Group's search presence now brings an average of 2,000 organic visitors a month, with more than 100 leads generated through our SEO work.",
      buttonText: "Read the case study",
      buttonHref: "/case-studies/casey-insurance-group",
      visualType: "statCard",
      backgroundColor: "#092c40",
      statBadge: "Casey Insurance Group",
      statNumber: "2,000",
      statLabel: "average monthly organic visitors",
    },
  ],

  // Page CTA
  ctaEyebrow: "LET'S TALK ABOUT YOUR BUSINESS",
  ctaHeading: "What would better inquiries mean for you?",
  ctaBody:
    "Tell us what you do, where you work, and what you want more of. We'll figure out whether we can help.",
  ctaButtonText: "Let's look at what's possible",
  ctaButtonHref: "/#contact",
};

async function seedCaseStudiesPage() {
  try {
    console.log(`🚀 Seeding Case Studies page content to Sanity project: ${projectId}...`);

    // Upload or find ridgewell-project.webp
    const ridgewellAsset = await uploadAssetIfFound(
      "public/ridgewell-project.webp",
      "image/webp"
    );

    const docToCreate = {
      ...defaultContent,
      cases: [
        {
          ...defaultContent.cases[0],
          ...(ridgewellAsset
            ? {
                image: {
                  _type: "image",
                  asset: {
                    _type: "reference",
                    _ref: ridgewellAsset._id,
                  },
                  alt: "Ridgewell landscape and outdoor living project",
                },
              }
            : {}),
        },
        defaultContent.cases[1],
      ],
    };

    const existing = await client.getDocument("caseStudiesPage");
    if (existing) {
      console.log("ℹ️ Document caseStudiesPage already exists in Sanity. Updating cases with configurable visual settings...");
      await client
        .patch("caseStudiesPage")
        .set({
          cases: docToCreate.cases,
        })
        .setIfMissing(docToCreate)
        .commit();
      console.log("✅ Successfully updated caseStudiesPage document with configurable visualType and stat fields.");
      return;
    }

    const res = await client.createIfNotExists(docToCreate);
    console.log("✅ Successfully created Case Studies Page document:", res._id);
  } catch (err) {
    console.error("❌ Failed to seed Case Studies Page document:", err.message);
  }
}

seedCaseStudiesPage();
