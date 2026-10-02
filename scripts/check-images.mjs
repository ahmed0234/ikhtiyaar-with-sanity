import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "bt5m0mkt",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function main() {
  const doc = await client.fetch(
    `*[_type == "landingPage" || _id == "landingPage"][0] {
      _id,
      _type,
      googlePartnerImage {
        asset-> {
          _id,
          url
        }
      },
      hostingerPartnerImage {
        asset-> {
          _id,
          url
        }
      }
    }`
  );
  console.log("LIVE DOCUMENT IMAGES:", JSON.stringify(doc, null, 2));

  const draft = await client.fetch(
    `*[_id == "drafts.landingPage"][0] {
      _id,
      _type,
      googlePartnerImage {
        asset-> {
          _id,
          url
        }
      },
      hostingerPartnerImage {
        asset-> {
          _id,
          url
        }
      }
    }`
  );
  console.log("DRAFT DOCUMENT IMAGES:", JSON.stringify(draft, null, 2));
}

main();
