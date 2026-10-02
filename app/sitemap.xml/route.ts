import { SITE_URL } from "@/lib/seo";
import { services } from "@/content/services";
import { cases } from "@/content/case-studies";
import { sanityFetch } from "@/sanity/lib/live";
import { BLOG_POSTS_QUERY } from "@/sanity/lib/queries";
import type { SanityBlogPostCard } from "@/sanity/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data: posts } = await sanityFetch<SanityBlogPostCard[]>({
      query: BLOG_POSTS_QUERY,
      stega: false,
    });
    const urls = [
      "",
      "/about",
      "/contact",
      "/services",
      "/privacy",
      "/terms",
      "/cookies",
      "/accessibility",
      "/case-studies",
      "/blog",
      ...services.map((s) => "/services/" + s.slug),
      ...cases.map((c) => "/case-studies/" + c.slug),
    ];
    const xml =
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
      urls.map((p) => "<url><loc>" + SITE_URL + p + "</loc></url>").join("") +
      (posts ?? [])
        .map(
          (p) =>
            "<url><loc>" +
            SITE_URL +
            "/blog/" +
            p.slug +
            "</loc>" +
            (p.updatedAt || p.publishedAt
              ? "<lastmod>" + (p.updatedAt || p.publishedAt) + "</lastmod>"
              : "") +
            "</url>",
        )
        .join("") +
      "</urlset>";
    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "no-cache",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response("Sitemap temporarily unavailable", { status: 503 });
  }
}
