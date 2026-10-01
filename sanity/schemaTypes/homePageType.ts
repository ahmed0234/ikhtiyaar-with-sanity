import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page (Root /)",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      initialValue: "PRACTICAL MARKETING FOR SERVICE BUSINESSES",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      initialValue: "Get found. Bring in better inquiries. Win more work.",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
      initialValue:
        "We help established service businesses fix weak marketing foundations, generate high-intent inquiries, and turn opportunities into dependable revenue.",
    }),
    defineField({
      name: "heroCtaText",
      title: "Hero CTA Button Text",
      type: "string",
      initialValue: "Let's talk",
    }),
    defineField({
      name: "heroCtaLink",
      title: "Hero CTA Button Link",
      type: "string",
      initialValue: "#contact",
    }),
  ],
  preview: {
    select: {
      title: "heroTitle",
      subtitle: "heroEyebrow",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Home Page Content",
        subtitle,
      };
    },
  },
});
