import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";

/**
 * Route handler to enable Next.js Draft Mode for Sanity Presentation Tool & Visual Editing
 */
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_API_READ_TOKEN,
  }),
});
