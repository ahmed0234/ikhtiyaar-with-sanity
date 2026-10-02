'use client';

/**
 * Sanity Studio configuration mounted to `/app/studio/[[...tool]]/page.tsx`
 * Features custom Structure with Root Landing Page singleton and Presentation Tool for Live Preview.
 */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool, defineLocations } from "sanity/presentation";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  name: "ikhtiyaar",
  title: "Ikhtiyaar Studio",
  projectId: projectId || "bt5m0mkt",
  dataset: dataset || "production",
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        locations: {
          siteSettings: defineLocations({
            message: "Navbar and global settings are displayed across the entire website.",
            tone: "positive",
            locations: [
              { title: "Home", href: "/" },
              { title: "About", href: "/about" },
              { title: "Services", href: "/services" },
              { title: "Case Studies", href: "/case-studies" },
              { title: "Blog", href: "/blog" },
              { title: "Contact", href: "/contact" },
            ],
          }),
          landingPage: defineLocations({
            message: "Root homepage content.",
            locations: [{ title: "Home", href: "/" }],
          }),
          blogPost: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({
              locations: [
                { title: doc?.title || "Untitled", href: `/blog/${doc?.slug}` },
                { title: "Blog Index", href: "/blog" },
              ],
            }),
          }),
          googleAdsPage: defineLocations({
            message: "Google Ads service page content.",
            locations: [{ title: "Google Ads", href: "/services/google-ads" }],
          }),
        },
        mainDocuments: [
          {
            route: "/",
            filter: `_type in ["landingPage", "siteSettings"]`,
          },
          {
            route: "/blog/:slug",
            filter: `_type == "blogPost" && slug.current == $slug`,
          },
          {
            route: "/blog",
            filter: `_type == "blogPost"`,
          },
          {
            route: "/services/google-ads",
            filter: `_type == "googleAdsPage"`,
          },
          {
            route: "/services/Google-Ads",
            filter: `_type == "googleAdsPage"`,
          },
        ],
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
