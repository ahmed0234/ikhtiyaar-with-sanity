import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    // Use the full absolute URL so Visual Editing overlays link to the correct
    // Studio instance in both local dev and Vercel production.
    studioUrl: process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/studio`
      : "/studio",
  },
});
