import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SanitySettings } from "@/sanity/lib/types";
import { SiteHeaderClient } from "@/components/site-header-client";

// Hardcoded fallbacks — identical to what was previously in the component.
// These are used when the Sanity document doesn't exist yet (e.g. first deploy).
const defaultSettings: SanitySettings = {
  topbarLeft: "Good work deserves to get found.",
  topbarRight: "Helping service businesses across the U.S.",
  logoAlt: "Ikhtiyaar",
  logoUrl: "/ikhtiyaar-logo.png",
  serviceLinks: [
    { label: "Google Ads",                href: "/services/google-ads" },
    { label: "Meta Ads",                  href: "/services/meta-ads" },
    { label: "ChatGPT Ads",               href: "/services/chatgpt-ads" },
    { label: "Search Engine Optimization",href: "/services/seo" },
    { label: "AEO",                       href: "/services/aeo" },
    { label: "Cold Email",                href: "/services/cold-email" },
  ],
  navLinks: [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog",         href: "/blog" },
    { label: "FAQs",         href: "/#questions" },
  ],
  phoneDisplay: "(954) 787-3401",
  phoneTel: "+19547873401",
  ctaLabel: "Let's talk",
  ctaHref: "/#contact",
};

/**
 * Server Component — fetches site settings from Sanity, then renders
 * the interactive client header. Falls back to hardcoded defaults so
 * the navbar never breaks if the Sanity document hasn't been published yet.
 */
export async function SiteHeader() {
  let settings: SanitySettings = defaultSettings;

  try {
    const { data } = (await sanityFetch({
      query: SITE_SETTINGS_QUERY,
    })) as { data: SanitySettings | null };
    if (data) {
      // Merge: Sanity values override defaults, but defaults fill any gap
      const resolvedLogoUrl =
        data.logoImage?.asset?.url || defaultSettings.logoUrl;

      settings = {
        ...defaultSettings,
        ...Object.fromEntries(
          Object.entries(data).filter(
            ([, v]) => v !== null && v !== undefined && v !== ""
          )
        ),
        logoUrl: resolvedLogoUrl,
        serviceLinks:
          data.serviceLinks && data.serviceLinks.length > 0
            ? data.serviceLinks
            : defaultSettings.serviceLinks,
        navLinks:
          data.navLinks && data.navLinks.length > 0
            ? data.navLinks
            : defaultSettings.navLinks,
      };
    }
  } catch {
    // Silently fall back to defaults — the navbar will still render correctly
  }

  return <SiteHeaderClient settings={settings} />;
}
