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
  console.log("ℹ️ No SANITY_API_WRITE_TOKEN or SANITY_API_READ_TOKEN found with write permission.");
  console.log("ℹ️ You can create your first blog post directly in Sanity Studio at http://localhost:3000/studio under 'Blog Posts'!");
  process.exit(0);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const samplePost = {
  _id: "sample-blog-post-1",
  _type: "blogPost",
  title: "Why Most Contractor Websites Don't Generate Qualified Leads",
  slug: {
    _type: "slug",
    current: "why-most-contractor-websites-dont-generate-qualified-leads",
  },
  excerpt:
    "Most trade and service websites look fine on the surface, but fail to answer the three questions homeowners and project managers actually care about before picking up the phone.",
  author: "Ikhtiyaar Editorial",
  publishedAt: new Date().toISOString(),
  categories: ["Lead Generation", "Strategy"],
  tags: ["contractors", "positioning", "inquiries"],
  seoTitle: "Why Contractor Websites Fail at Lead Generation | Ikhtiyaar",
  seoDescription:
    "Discover the key reasons service websites fail to turn visitors into high-intent estimates and phone calls.",
  content: [
    {
      _key: "block-1",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "span-1",
          _type: "span",
          text: "If your website gets visits but the phone rarely rings with the kinds of jobs you actually want, you are not alone. Most contractors are told they need 'more traffic' or 'more SEO,' when in reality, their website has a positioning breakdown.",
        },
      ],
    },
    {
      _key: "block-2",
      _type: "block",
      style: "h2",
      children: [
        {
          _key: "span-2",
          _type: "span",
          text: "1. Traffic Without Positioning Is Just Noise",
        },
      ],
    },
    {
      _key: "block-3",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "span-3",
          _type: "span",
          text: "When an inquiry comes through from a homeowner looking for the absolute cheapest price, it is almost always because the website treated every service as a commodity. When you don't differentiate on scope, precision, and reliability, prospective clients default to comparing you strictly on hourly rates.",
        },
      ],
    },
    {
      _key: "block-4",
      _type: "block",
      style: "blockquote",
      children: [
        {
          _key: "span-4",
          _type: "span",
          text: "A contractor who tries to be everything to everyone ends up racing five other competitors to the same low-margin lead. Specificity wins higher-paying jobs.",
        },
      ],
    },
    {
      _key: "block-5",
      _type: "block",
      style: "h2",
      children: [
        {
          _key: "span-5",
          _type: "span",
          text: "2. The Three Things High-Intent Buyers Look For",
        },
      ],
    },
    {
      _key: "block-6",
      _type: "block",
      style: "bullet",
      children: [
        {
          _key: "span-6",
          _type: "span",
          text: "Proof of relevant work in their exact local area or neighborhood.",
        },
      ],
    },
    {
      _key: "block-7",
      _type: "block",
      style: "bullet",
      children: [
        {
          _key: "span-7",
          _type: "span",
          text: "Clear expectations of what happens after they submit a request.",
        },
      ],
    },
    {
      _key: "block-8",
      _type: "block",
      style: "bullet",
      children: [
        {
          _key: "span-8",
          _type: "span",
          text: "Direct ownership: knowing they are speaking to the company doing the work, not a lead middleman.",
        },
      ],
    },
    {
      _key: "block-9",
      _type: "block",
      style: "h2",
      children: [
        {
          _key: "span-9",
          _type: "span",
          text: "3. Creating a Frictionless Next Step",
        },
      ],
    },
    {
      _key: "block-10",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "span-10",
          _type: "span",
          text: "Don't force people through a 20-field questionnaire. Give them a direct phone number, an estimate request that takes less than 60 seconds, and reassurance that their private information won't be sold to third parties.",
        },
      ],
    },
  ],
};

async function seed() {
  try {
    console.log(`🚀 Seeding sample blog post to Sanity (${projectId} / ${dataset})...`);
    const res = await client.createOrReplace(samplePost);
    console.log("✅ Successfully created sample blog post:", res._id);
    console.log("🔗 View it at: http://localhost:3000/Ahmed/blog/why-most-contractor-websites-dont-generate-qualified-leads");
  } catch (err) {
    console.error("❌ Failed to seed blog post:", err.message);
  }
}

seed();
