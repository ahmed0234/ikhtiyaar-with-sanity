'use client';

/**
 * Sanity Studio configuration mounted to `/app/studio/[[...tool]]/page.tsx`
 * Features custom Structure with Root Landing Page singleton and Presentation Tool for Live Preview.
 */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
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
        mainDocuments: [
          {
            route: "/",
            filter: `_type == "landingPage"`,
          },
          {
            route: "/Ahmed/blog/:slug",
            filter: `_type == "blogPost" && slug.current == $slug`,
          },
          {
            route: "/Ahmed/blogs",
            filter: `_type == "blogPost"`,
          },
        ],
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
