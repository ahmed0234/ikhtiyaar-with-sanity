import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "topbar", title: "Top Bar", default: true },
    { name: "nav", title: "Navigation" },
    { name: "cta", title: "Call To Action" },
  ],
  fields: [
    // ── TOP BAR ─────────────────────────────────────────────────────────────
    defineField({
      name: "topbarLeft",
      title: "Top Bar Left Text",
      type: "string",
      group: "topbar",
      initialValue: "Good work deserves to get found.",
      description: "Short message shown on the left side of the thin top strip.",
    }),
    defineField({
      name: "topbarRight",
      title: "Top Bar Right Text",
      type: "string",
      group: "topbar",
      initialValue: "Helping service businesses across the U.S.",
      description: "Short message shown on the right side of the thin top strip.",
    }),

    // ── LOGO ─────────────────────────────────────────────────────────────────
    defineField({
      name: "logoImage",
      title: "Logo Image",
      type: "image",
      group: "nav",
      options: {
        hotspot: true,
      },
      description: "Upload a custom navbar logo. If omitted, the default /ikhtiyaar-logo.png is used.",
    }),
    defineField({
      name: "logoAlt",
      title: "Logo Alt Text",
      type: "string",
      group: "nav",
      initialValue: "Ikhtiyaar",
      description: "Accessible description of the logo image.",
    }),

    // ── SERVICE DROPDOWN ITEMS ───────────────────────────────────────────────
    defineField({
      name: "serviceLinks",
      title: "Services Dropdown Links",
      type: "array",
      group: "nav",
      description: "Each entry appears as a link inside the Services dropdown menu.",
      of: [
        {
          type: "object",
          name: "serviceLink",
          title: "Service Link",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "string",
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
      initialValue: [
        { _type: "serviceLink", label: "Google Ads",               href: "/services/google-ads" },
        { _type: "serviceLink", label: "Meta Ads",                 href: "/services/meta-ads" },
        { _type: "serviceLink", label: "ChatGPT Ads",              href: "/services/chatgpt-ads" },
        { _type: "serviceLink", label: "Search Engine Optimization", href: "/services/seo" },
        { _type: "serviceLink", label: "AEO",                      href: "/services/aeo" },
        { _type: "serviceLink", label: "Cold Email",               href: "/services/cold-email" },
      ],
    }),

    // ── MAIN NAV LINKS ───────────────────────────────────────────────────────
    defineField({
      name: "navLinks",
      title: "Main Navigation Links",
      type: "array",
      group: "nav",
      description: "Top-level links shown in the navbar (excluding the Services dropdown).",
      of: [
        {
          type: "object",
          name: "navLink",
          title: "Nav Link",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "href",  title: "URL",   type: "string", validation: (r) => r.required() }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
      initialValue: [
        { _type: "navLink", label: "Case Studies", href: "/case-studies" },
        { _type: "navLink", label: "Blog",         href: "/blog" },
        { _type: "navLink", label: "FAQs",         href: "/#questions" },
      ],
    }),

    // ── PHONE ────────────────────────────────────────────────────────────────
    defineField({
      name: "phoneDisplay",
      title: "Phone Number (Display)",
      type: "string",
      group: "cta",
      initialValue: "(954) 787-3401",
      description: "The formatted number shown to visitors, e.g. (954) 787-3401",
    }),
    defineField({
      name: "phoneTel",
      title: "Phone Number (tel: href)",
      type: "string",
      group: "cta",
      initialValue: "+19547873401",
      description: "The raw digits used in the tel: link, e.g. +19547873401",
    }),

    // ── CTA BUTTON ───────────────────────────────────────────────────────────
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      group: "cta",
      initialValue: "Let's talk",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Button URL",
      type: "string",
      group: "cta",
      initialValue: "/#contact",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings (Navbar & Global)" };
    },
  },
});
