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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || envVars.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || envVars.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN || envVars.SANITY_API_WRITE_TOKEN || envVars.SANITY_API_READ_TOKEN;

if (!projectId) {
  console.error("❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}

if (!token) {
  console.warn("⚠️ No SANITY_API_WRITE_TOKEN or SANITY_API_READ_TOKEN found with write permissions.");
  console.log("ℹ️ Note: Opening the 'Root Landing Page' in Sanity Studio (/studio) will automatically pre-populate all fields via schema initialValues!");
  process.exit(0);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const defaultDoc = {
  _id: "landingPage",
  _type: "landingPage",
  heroHeadingLine1: "More good jobs.",
  heroHeadingLine2: "Fewer quiet weeks.",
  heroDescription:
    "You know how to do the work. We help the right people find you, call you, and ask for an estimate.",
  heroCtaButtonText: "Show me what's possible",
  heroCtaSecondaryText: "See the results",
  heroProofTitle: "$1M+ revenue produced for clients.",
  heroProofSubtitle: "See what that looks like for the people we work with.",
  heroTrust1: "Calls come straight to you",
  heroTrust2: "Your business. Your leads.",
  resultsEyebrow: "LESS TALK. HERE'S WHAT HAPPENED.",
  resultsHeading: "More people asking. More work coming in.",
  resultsDescription:
    "Ridgewell wanted more landscaping and hardscaping projects. We helped homeowners in their area find them and get in touch.",
  resultsProjectName: "RIDGEWELL LANDSCAPE & DESIGN",
  resultsProjectLocation: "Colorado",
  resultsBadgeEyebrow: "REAL CLIENT RESULTS",
  resultsBadgeTitle: "Good work. More people seeing it.",
  stat1Value: "80+",
  stat1Label: "homeowner inquiries in two months",
  stat2Value: "$200k",
  stat2Label: "in client-reported revenue",
  resultsDisclaimer:
    "One client's results, not a promise of what every business will make. Revenue is not profit.",
  resultsCtaText: "Let's look at the numbers for your business",
  ownershipEyebrow: "BUILD SOMETHING THAT'S YOURS",
  ownershipHeading: "Stop racing five other contractors to the same lead.",
  ownershipParagraph1:
    "When someone finds your business through the work we do, they call you. They ask you for an estimate.",
  ownershipParagraph2:
    "We're helping you build your own source of customers. Your name is on it. Your accounts and information stay yours.",
  ownershipButtonText: "That's what I want",
  outcomesEyebrow: "HERE'S WHERE WE COME IN",
  outcomesHeading: "You run the jobs. We help bring in the next ones.",
  outcomesSubtitle:
    "You shouldn't have to finish a project and wonder where the next one is coming from. Here's what we take off your plate.",
  finalEyebrow: "LET'S SEE IF WE'RE A GOOD FIT",
  finalHeading: "Got room for a few more good jobs?",
  finalDescription:
    "Let's look at your area and see what it would take to bring them in.",
  finalButtonText: "Show me what's possible",
  finalMicroCopy: "A quick conversation. A clear next step.",
};

async function seed() {
  try {
    console.log(`🚀 Seeding landing page content to Sanity project: ${projectId}, dataset: ${dataset}...`);
    const res = await client.createOrReplace(defaultDoc);
    console.log("✅ Successfully seeded Root Landing Page document:", res._id);
  } catch (err) {
    console.error("❌ Failed to seed document:", err.message);
  }
}

seed();
