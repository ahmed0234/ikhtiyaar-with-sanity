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
          metaAdsPage: defineLocations({
            message: "Meta Ads service page content.",
            locations: [{ title: "Meta Ads", href: "/services/meta-ads" }],
          }),
          seoPage: defineLocations({
            message: "SEO service page content.",
            locations: [{ title: "SEO", href: "/services/seo" }],
          }),
          coldEmailPage: defineLocations({
            message: "Cold Email service page content.",
            locations: [{ title: "Cold Email", href: "/services/cold-email" }],
          }),
          chatgptAdsPage: defineLocations({
            message: "ChatGPT Ads service page content.",
            locations: [{ title: "ChatGPT Ads", href: "/services/chatgpt-ads" }],
          }),
          aeoPage: defineLocations({
            message: "AEO service page content.",
            locations: [{ title: "AEO", href: "/services/aeo" }],
          }),
          caseStudiesPage: defineLocations({
            message: "Case Studies index page content.",
            locations: [{ title: "Case Studies", href: "/case-studies" }],
          }),
          ridgewellCaseStudy: defineLocations({
            message: "Ridgewell Case Study content.",
            locations: [
              {
                title: "Ridgewell Case Study",
                href: "/case-studies/ridgewell-landscape-design",
              },
            ],
          }),
          caseyCaseStudy: defineLocations({
            message: "Casey Insurance Group Case Study content.",
            locations: [
              {
                title: "Casey Insurance Group Case Study",
                href: "/case-studies/casey-insurance-group",
              },
            ],
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
          {
            route: "/services/meta-ads",
            filter: `_type == "metaAdsPage"`,
          },
          {
            route: "/services/Meta-Ads",
            filter: `_type == "metaAdsPage"`,
          },
          {
            route: "/services/seo",
            filter: `_type == "seoPage"`,
          },
          {
            route: "/services/SEO",
            filter: `_type == "seoPage"`,
          },
          {
            route: "/services/cold-email",
            filter: `_type == "coldEmailPage"`,
          },
          {
            route: "/services/Cold-Email",
            filter: `_type == "coldEmailPage"`,
          },
          {
            route: "/services/chatgpt-ads",
            filter: `_type == "chatgptAdsPage"`,
          },
          {
            route: "/services/ChatGPT-Ads",
            filter: `_type == "chatgptAdsPage"`,
          },
          {
            route: "/services/aeo",
            filter: `_type == "aeoPage"`,
          },
          {
            route: "/services/AEO",
            filter: `_type == "aeoPage"`,
          },
          {
            route: "/case-studies",
            filter: `_type == "caseStudiesPage"`,
          },
          {
            route: "/Case-Studies",
            filter: `_type == "caseStudiesPage"`,
          },
          {
            route: "/case-studies/ridgewell-landscape-design",
            filter: `_type == "ridgewellCaseStudy"`,
          },
          {
            route: "/case-studies/casey-insurance-group",
            filter: `_type == "caseyCaseStudy"`,
          },
        ],

      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
