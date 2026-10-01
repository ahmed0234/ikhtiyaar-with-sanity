import { defineArrayMember, defineField, defineType } from "sanity";

export const blogPostType = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Article Content", default: true },
    { name: "editorial", title: "Editorial & Metadata" },
    { name: "seo", title: "SEO & Social Sharing" },
  ],
  fields: [
    // ----------------------------------------------------
    // CONTENT GROUP
    // ----------------------------------------------------
    defineField({
      name: "title",
      title: "Blog Title",
      type: "string",
      group: "content",
      description: "The primary headline for this article.",
      validation: (rule) =>
        rule
          .required()
          .min(5)
          .max(120)
          .warning("Titles should ideally be between 20 and 70 characters for search engines."),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description: "URL-friendly identifier (e.g. 'my-first-blog-post'). Click 'Generate' to create from title.",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required().error("A slug is required for page routing."),
    }),
    defineField({
      name: "excerpt",
      title: "Short Description / Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description: "A concise summary shown on the blog index card and used as the default SEO description.",
      validation: (rule) =>
        rule
          .required()
          .min(20)
          .max(320)
          .error("An excerpt of at least 20 characters is required for index cards."),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured / Main Image",
      type: "image",
      group: "content",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text (Accessibility)",
          description: "Crucial for screen readers and SEO.",
          validation: (rule) => rule.required().error("Alternative text is required for accessibility."),
        }),
        defineField({
          name: "caption",
          type: "string",
          title: "Image Caption (Optional)",
        }),
      ],
      validation: (rule) => rule.required().error("A featured image is required for editorial presentation."),
    }),
    defineField({
      name: "content",
      title: "Article Content",
      type: "array",
      group: "content",
      description: "The main body of your article. Supports headings, styled text, quotes, code, lists, and inline images.",
      of: [
        // Standard rich text block
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Quote Callout", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet List", value: "bullet" },
            { title: "Numbered List", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
              { title: "Inline Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Hyperlink",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (rule) =>
                      rule
                        .uri({
                          scheme: ["http", "https", "mailto", "tel"],
                          allowRelative: true,
                        })
                        .required(),
                  }),
                  defineField({
                    name: "blank",
                    type: "boolean",
                    title: "Open in new window",
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        }),
        // Inline Image within article
        defineArrayMember({
          type: "image",
          title: "Inline Image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative Text",
              description: "Describe the image for screen readers and SEO.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              type: "string",
              title: "Caption",
            }),
          ],
        }),
        // Code Block
        defineArrayMember({
          name: "codeBlock",
          type: "object",
          title: "Code Snippet",
          fields: [
            defineField({
              name: "language",
              type: "string",
              title: "Language",
              initialValue: "typescript",
              options: {
                list: [
                  { title: "TypeScript", value: "typescript" },
                  { title: "JavaScript", value: "javascript" },
                  { title: "HTML", value: "html" },
                  { title: "CSS", value: "css" },
                  { title: "JSON", value: "json" },
                  { title: "Bash / Shell", value: "bash" },
                ],
              },
            }),
            defineField({
              name: "filename",
              type: "string",
              title: "Filename (optional)",
              placeholder: "e.g. config.ts",
            }),
            defineField({
              name: "code",
              type: "text",
              title: "Code",
              rows: 8,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "filename",
              subtitle: "language",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Code Snippet",
                subtitle: subtitle ? `Language: ${subtitle}` : "Code",
              };
            },
          },
        }),
      ],
    }),

    // ----------------------------------------------------
    // EDITORIAL & METADATA GROUP
    // ----------------------------------------------------
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
      group: "editorial",
      initialValue: "Ikhtiyaar Team",
      description: "Person or team responsible for the article.",
    }),
    defineField({
      name: "publishedAt",
      title: "Publication Date",
      type: "datetime",
      group: "editorial",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required().error("Publication date is required."),
    }),
    defineField({
      name: "updatedAt",
      title: "Last Updated Date (Optional)",
      type: "datetime",
      group: "editorial",
      description: "Displays 'Updated on [date]' when provided.",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "editorial",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "e.g. Lead Generation, Strategy, Marketing, SEO",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "editorial",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Topic keywords for search and related content.",
    }),

    // ----------------------------------------------------
    // SEO & SOCIAL GROUP
    // ----------------------------------------------------
    defineField({
      name: "seoTitle",
      title: "Custom SEO Title",
      type: "string",
      group: "seo",
      description: "Overrides the blog title in search engine results (50–60 characters ideal).",
    }),
    defineField({
      name: "seoDescription",
      title: "Custom SEO Description",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Overrides the excerpt in search engine results (120–160 characters ideal).",
    }),
    defineField({
      name: "seoImage",
      title: "Social Share / Open Graph Image",
      type: "image",
      group: "seo",
      description: "Overrides the featured image when shared on LinkedIn, Twitter, Facebook, or iMessage.",
      options: {
        hotspot: true,
      },
    }),
  ],

  // ----------------------------------------------------
  // STUDIO PREVIEW
  // ----------------------------------------------------
  preview: {
    select: {
      title: "title",
      author: "author",
      publishedAt: "publishedAt",
      media: "featuredImage",
    },
    prepare({ title, author, publishedAt, media }) {
      const dateStr = publishedAt
        ? new Date(publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "Draft";

      return {
        title: title || "Untitled Article",
        subtitle: `${author ? `${author} • ` : ""}${dateStr}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Publication Date, Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Publication Date, Oldest First",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
    {
      title: "Title (A–Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
