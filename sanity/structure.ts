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

      // Meta Ads service page — singleton
      S.listItem()
        .title("Meta Ads Page (/services/meta-ads)")
        .id("metaAdsPage")
        .child(
          S.document()
            .schemaType("metaAdsPage")
            .documentId("metaAdsPage")
            .title("Meta Ads Page Content")
        ),

      S.divider(),

      // SEO service page — singleton
      S.listItem()
        .title("SEO Page (/services/seo)")
        .id("seoPage")
        .child(
          S.document()
            .schemaType("seoPage")
            .documentId("seoPage")
            .title("SEO Page Content")
        ),

      S.divider(),

      // Cold Email service page — singleton
      S.listItem()
        .title("Cold Email Page (/services/cold-email)")
        .id("coldEmailPage")
        .child(
          S.document()
            .schemaType("coldEmailPage")
            .documentId("coldEmailPage")
            .title("Cold Email Page Content")
        ),

      S.divider(),

      // ChatGPT Ads service page — singleton
      S.listItem()
        .title("ChatGPT Ads Page (/services/chatgpt-ads)")
        .id("chatgptAdsPage")
        .child(
          S.document()
            .schemaType("chatgptAdsPage")
            .documentId("chatgptAdsPage")
            .title("ChatGPT Ads Page Content")
        ),

      S.divider(),

      // AEO service page — singleton
      S.listItem()
        .title("AEO Page (/services/aeo)")
        .id("aeoPage")
        .child(
          S.document()
            .schemaType("aeoPage")
            .documentId("aeoPage")
            .title("AEO Page Content")
        ),

      S.divider(),

      // Case Studies page — singleton
      S.listItem()
        .title("Case Studies Page (/case-studies)")
        .id("caseStudiesPage")
        .child(
          S.document()
            .schemaType("caseStudiesPage")
            .documentId("caseStudiesPage")
            .title("Case Studies Page Content")
        ),

      S.divider(),

      // Ridgewell Case Study page — singleton
      S.listItem()
        .title("Ridgewell Case Study (/case-studies/ridgewell-landscape-design)")
        .id("ridgewellCaseStudy")
        .child(
          S.document()
            .schemaType("ridgewellCaseStudy")
            .documentId("ridgewellCaseStudy")
            .title("Ridgewell Case Study Content")
        ),

      S.divider(),

      // Casey Insurance Group Case Study page — singleton
      S.listItem()
        .title("Casey Insurance Group Case Study (/case-studies/casey-insurance-group)")
        .id("caseyCaseStudy")
        .child(
          S.document()
            .schemaType("caseyCaseStudy")
            .documentId("caseyCaseStudy")
            .title("Casey Insurance Group Case Study Content")
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
          ![
            "siteSettings",
            "landingPage",
            "blogPost",
            "googleAdsPage",
            "metaAdsPage",
            "seoPage",
            "coldEmailPage",
            "chatgptAdsPage",
            "aeoPage",
            "caseStudiesPage",
            "ridgewellCaseStudy",
            "caseyCaseStudy",
          ].includes(listItem.getId() || "")
      ),
    ]);


