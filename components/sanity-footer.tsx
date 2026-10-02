/**
 * SanityFooter — server component
 *
 * Fetches footer fields from the root landing-page document (where all footer
 * content lives) and renders the shared <SiteFooter> with live-preview support.
 *
 * Drop this in any page instead of a bare <SiteFooter /> to get Sanity-backed,
 * live-editable footer content with stega overlays.
 */
import { sanityFetch } from "@/sanity/lib/live";
import { FOOTER_QUERY } from "@/sanity/lib/queries";
import { defaultLandingPageContent } from "@/sanity/initial-data";
import { SiteFooter } from "@/components/site-footer";

export async function SanityFooter() {
  let footerData = defaultLandingPageContent;

  try {
    const { data } = await sanityFetch({ query: FOOTER_QUERY });
    if (data) {
      // Merge Sanity data over defaults so empty Sanity fields never erase existing copy
      const clean = Object.fromEntries(
        Object.entries(data).filter(
          ([, v]) =>
            v !== null &&
            v !== undefined &&
            v !== "" &&
            (!Array.isArray(v) || v.length > 0)
        )
      );
      footerData = { ...defaultLandingPageContent, ...clean } as typeof defaultLandingPageContent;
    }
  } catch {
    // Fall back to static defaults if Sanity is unreachable
  }

  return <SiteFooter content={footerData} />;
}
