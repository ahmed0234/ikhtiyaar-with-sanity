import { defineLive } from "next-sanity/live";
import { client } from "./client";

/**
 * Sanity Live Content API helper
 * Powers real-time live preview without rebuilding or manual reloads.
 */
export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: "vX",
  }),
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.SANITY_API_READ_TOKEN,
});
