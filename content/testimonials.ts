import { stegaClean } from "@sanity/client/stega";

// Add or replace a client's YouTube link here. Standard, short, and Shorts URLs are supported.
export const testimonials = [
  { name: "Michael Swisher", company: "Swisher Capital", youtubeUrl: "https://www.youtube.com/watch?v=zLIhI9GthRs", thumbnail: "/testimonial-michael.webp" },
  { name: "John Hall", company: "J & J Cash Home Buyers", youtubeUrl: "https://www.youtube.com/watch?v=QLyqYDhV__I", thumbnail: "/testimonial-john.webp" },
];

export function youtubeId(value: string): string | null {
  if (!value) return null;
  const clean = stegaClean(value).trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(clean)) return clean;
  try {
    const url = new URL(clean);
    const host = url.hostname.replace(/^www\./, "");
    let id: string | null = null;
    if (host === "youtu.be") id = url.pathname.slice(1).split("/")[0];
    if (["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) {
      id = url.searchParams.get("v") || (/^\/(embed|shorts)\//.test(url.pathname) ? url.pathname.split("/")[2] : null);
    }
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
  } catch { return null; }
}

