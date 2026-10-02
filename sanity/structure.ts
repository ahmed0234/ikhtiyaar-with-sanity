import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content Management")
    .items([
      // Global site settings (navbar, topbar, CTA) — singleton
      S.listItem()
        .title("Site Settings (Navbar & Global)")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings")
        ),

      S.divider(),

      // Singleton document for the root landing page
      S.listItem()
        .title("Root Landing Page (/)")
        .id("landingPage")
        .child(
          S.document()
            .schemaType("landingPage")
            .documentId("landingPage")
            .title("Root Landing Page Content")
        ),

      S.divider(),

      // Google Ads service page — singleton
      S.listItem()
        .title("Google Ads Page (/services/google-ads)")
        .id("googleAdsPage")
        .child(
          S.document()
            .schemaType("googleAdsPage")
            .documentId("googleAdsPage")
            .title("Google Ads Page Content")
        ),

      S.divider(),

      // Dedicated Blog Posts section
      S.listItem()
        .title("Blog Posts (/blog)")
        .id("blogPost")
        .child(
          S.documentTypeList("blogPost")
            .title("All Blog Posts")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),

      S.divider(),

      // Other document types (excluding singletons already placed above)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["siteSettings", "landingPage", "blogPost", "googleAdsPage"].includes(
            listItem.getId() || ""
          )
      ),
    ]);

