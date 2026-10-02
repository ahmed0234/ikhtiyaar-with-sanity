import { Fragment } from "react";
import {
  type LandingPageContent,
  defaultLandingPageContent,
} from "@/sanity/initial-data";
import { stegaClean } from "@sanity/client/stega";

function renderMultiline(text?: string | null) {
  if (!text) return null;
  if (!text.includes("\n")) return text;
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

interface SiteFooterProps {
  content?: LandingPageContent;
}

export function SiteFooter({ content }: SiteFooterProps = {}) {
  const footerData = content || defaultLandingPageContent;

  const rawLogoUrl =
    (footerData.footerLogoUrl ? stegaClean(footerData.footerLogoUrl) : "") ||
    "/ikhtiyaar-logo.png";
  const logoAlt = footerData.footerLogoAlt || "Ikhtiyaar";
  const logoHref = footerData.footerLogoHref
    ? stegaClean(footerData.footerLogoHref)
    : "/";

  const navLinks =
    Array.isArray(footerData.footerNavLinks) && footerData.footerNavLinks.length > 0
      ? footerData.footerNavLinks
      : defaultLandingPageContent.footerNavLinks;

  const legalLinks =
    Array.isArray(footerData.footerLegalLinks) &&
    footerData.footerLegalLinks.length > 0
      ? footerData.footerLegalLinks
      : defaultLandingPageContent.footerLegalLinks;

  const phoneTel = stegaClean(footerData.footerPhoneTel || "+19547873401");
  const emailHref = stegaClean(
    footerData.footerEmail || "support@ikhtiyaar.com"
  );

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & Tagline */}
          <div>
            <a href={logoHref} className="brand brand-footer" aria-label={`${logoAlt} home`}>
              <img
                src={rawLogoUrl}
                alt={logoAlt}
                width="1600"
                height="1600"
              />
            </a>
            <p>
              {renderMultiline(
                footerData.footerTagline ||
                  "Good work deserves to get found.\nLet's make sure yours does."
              )}
            </p>
          </div>

          {/* Column 2: Explore Navigation */}
          <div>
            <h3>{footerData.footerNavHeading || "Explore"}</h3>
            {navLinks.map((link, idx) => (
              <a
                key={link._key || link.href || idx}
                href={stegaClean(link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Column 3: Contact & Address */}
          <div>
            <h3>{footerData.footerContactHeading || "Let's talk"}</h3>
            <a href={`tel:${phoneTel}`}>
              {footerData.footerPhoneDisplay || "(954) 787-3401"}
            </a>
            <a href={`mailto:${emailHref}`}>
              {footerData.footerEmail || "support@ikhtiyaar.com"}
            </a>
            <p>
              {renderMultiline(
                footerData.footerAddress ||
                  "30 N Gould St, Ste R\nSheridan, WY 82801"
              )}
            </p>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <span>
            {footerData.footerCopyright ||
              `© ${new Date().getFullYear()} Ikhtiyaar LLC.`}
          </span>
          {legalLinks.map((link, idx) => (
            <a
              key={link._key || link.href || idx}
              href={stegaClean(link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function PageCTA() {
  return (
    <section className="page-cta">
      <div className="container">
        <span className="eyebrow">LET'S TALK ABOUT YOUR BUSINESS</span>
        <h2>
          What would better inquiries
          <br />
          mean for you?
        </h2>
        <p>
          Tell us what you do, where you work, and what you want more of. We'll
          figure out whether we can help.
        </p>
        <a className="button button-blue" href="/#contact">
          Let's look at what's possible
        </a>
      </div>
    </section>
  );
}
