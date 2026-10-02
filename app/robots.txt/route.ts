import { SITE_URL } from "@/lib/seo";

export function GET() {
  return new Response(
    "User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: " +
      SITE_URL +
      "/sitemap.xml\n",
    { headers: { "Content-Type": "text/plain" } },
  );
}
