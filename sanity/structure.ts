import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content Management")
    .items([
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

      // Dedicated Blog Posts section
      S.listItem()
        .title("Blog Posts (/Ahmed/blogs)")
        .id("blogPost")
        .child(
          S.documentTypeList("blogPost")
            .title("All Blog Posts")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),

      S.divider(),

      // Other document types if any (excluding singletons/explicitly placed items)
      ...S.documentTypeListItems().filter(
        (listItem) => !["landingPage", "blogPost"].includes(listItem.getId() || "")
      ),
    ]);
