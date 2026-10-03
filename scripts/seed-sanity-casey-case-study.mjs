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
  _id: "caseyCaseStudy",
  _type: "caseyCaseStudy",

  // Hero
  breadcrumbText: "All case studies",
  breadcrumbHref: "/case-studies",
  clientName: "Casey Insurance Group",
  service: "Search Engine Optimization",
  heroEyebrow: "Casey Insurance Group · Search Engine Optimization",
  headline: "A growing source of visits. More than 100 leads.",
  intro:
    "Casey Insurance Group's search presence now brings an average of 2,000 organic visitors a month, with more than 100 leads generated through our SEO work.",

  // Metrics row
  metrics: [
    {
      _key: "m-1",
      value: "2K",
      label: "Average monthly organic visitors",
    },
    {
      _key: "m-2",
      value: "100+",
      label: "Leads generated",
    },
    {
      _key: "m-3",
      value: "SEO",
      label: "The service behind the result",
    },
  ],

  // Section: The Business Behind The Numbers
  contextEyebrow: "THE BUSINESS BEHIND THE NUMBERS",
  contextHeading: "What mattered for Casey Insurance Group",
  contextBody:
    "Insurance buyers often need to understand their options before they are ready to speak with someone. Search can introduce an agency during that research. A useful website needs to help the visitor understand the next step, not simply attract a visit and leave them guessing.",

  // Objective Callout Box
  objectiveLabel: "The objective",
  objectiveText:
    "Build a source of relevant visits through unpaid search and turn that attention into inquiries for Casey Insurance Group.",

  // Section: What The Work Produced
  producedHeading: "What the work produced",
  producedBody:
    "We handled SEO for Casey Insurance Group to help people find its website through unpaid search results. The site averages around 2,000 organic visitors per month, and the work has generated more than 100 leads.",

  // Detail image alt
  imageAlt: "Casey Insurance Group search presence and results",

  // Section: Understanding The Numbers
  interpretHeading: "Understanding the numbers",
  interpretBody:
    "The website averages around 2,000 organic visitors per month. The 100+ leads are a cumulative result, not 100 leads every month. These are different measures and timeframes, so we do not calculate a conversion rate from them.",

  // Section: Process / How We Approach
  processTitle: "How we approach SEO for a service business",
  processNote:
    "The traffic and lead figures below are Casey’s reported results. This process explains the SEO framework we use, rather than claiming a complete historical list of changes to Casey’s website.",
  processSteps: [
    {
      _key: "ps-1",
      title: "Make important pages discoverable",
      text: "We review whether search engines can reach and understand the pages that explain the business. Clear structure and internal links help people and search engines find useful information.",
    },
    {
      _key: "ps-2",
      title: "Organize content around customer needs",
      text: "Service content should answer what someone needs to know before contacting the business. The goal is relevant coverage of real services, not a large collection of repetitive keyword pages.",
    },
    {
      _key: "ps-3",
      title: "Connect information with an inquiry",
      text: "A helpful article or service page should make it obvious who can help and how to contact them. Clear calls to action give an interested reader a next step.",
    },
    {
      _key: "ps-4",
      title: "Review traffic and leads together",
      text: "Organic visits show that people are finding the website. Leads show that some visitors are taking action. Looking at both helps keep SEO connected to business value.",
    },
  ],

  // Section: What This Means For Your Business
  takeawayHeading: "What this means for your business",
  takeawayBody:
    "SEO can become a useful source of ongoing discovery when a website addresses real customer needs. The aim is a better connection between the questions people ask and the help the business can provide.",
  lessonBody:
    "More people finding a website is useful only when the right people take a next step. Looking at visitors and inquiries together gives a clearer picture of how search supports a service business.",

  // Explore Service Text Link
  serviceLinkText: "Explore Search Engine Optimization",
  serviceLinkHref: "/services/seo",

  // Result Note Aside
  resultNote:
    "The 100+ leads are a cumulative figure. Organic traffic averages around 2,000 visitors per month. Individual results vary.",

  // Page CTA
  ctaEyebrow: "LET'S TALK ABOUT YOUR BUSINESS",
  ctaHeading: "What would better inquiries mean for you?",
  ctaBody:
    "Tell us what you do, where you work, and what you want more of. We'll figure out whether we can help.",
  ctaButtonText: "Let's look at what's possible",
  ctaButtonHref: "/#contact",
};

async function seedCaseyCaseStudy() {
  try {
    console.log(
      `🚀 Seeding Casey Insurance Group Case Study content to Sanity project: ${projectId}...`
    );

    const existing = await client.getDocument("caseyCaseStudy");
    if (existing) {
      console.log(
        "ℹ️ Document caseyCaseStudy already exists in Sanity. Ensuring defaults with setIfMissing..."
      );
      await client
        .patch("caseyCaseStudy")
        .setIfMissing(defaultContent)
        .commit();
      console.log(
        "✅ Verified and ensured fields on caseyCaseStudy document."
      );
      return;
    }

    const res = await client.createIfNotExists(defaultContent);
    console.log(
      "✅ Successfully created Casey Insurance Group Case Study document:",
      res._id
    );
  } catch (err) {
    console.error(
      "❌ Failed to seed Casey Insurance Group Case Study document:",
      err.message
    );
  }
}

seedCaseyCaseStudy();
