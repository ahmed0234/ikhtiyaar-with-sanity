"use client";

import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { stegaClean } from "@sanity/client/stega";
import type { SanitySettings } from "@/sanity/lib/types";

interface Props {
  settings: SanitySettings;
}

/**
 * Client Component — handles mobile menu open/close state.
 * Receives all content from the parent SiteHeader server component.
 * The design, layout, class names, and markup are unchanged from the original.
 */
export function SiteHeaderClient({ settings }: Props) {
  const [open, setOpen] = useState(false);

  const {
    topbarLeft,
    topbarRight,
    logoAlt,
    logoUrl,
    serviceLinks = [],
    navLinks = [],
    phoneDisplay,
    phoneTel,
    ctaLabel,
    ctaHref,
  } = settings;

  const cleanPhone = phoneTel ? stegaClean(phoneTel) : "";
  const cleanCtaHref = ctaHref ? stegaClean(ctaHref) : "";
  const cleanLogoUrl = logoUrl ? stegaClean(logoUrl) : "/ikhtiyaar-logo.png";

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <div id="top" className="topline">
        <div className="container">
          <span>{topbarLeft}</span>
          <span>{topbarRight}</span>
        </div>
      </div>

      <header className="header">
        <div className="container nav-wrap">
          {/* Logo */}
          <a href="/" aria-label="Ikhtiyaar home" className="brand">
            <img
              src={cleanLogoUrl || "/ikhtiyaar-logo.png"}
              alt={logoAlt || "Ikhtiyaar"}
              width="1600"
              height="1600"
            />
          </a>

          {/* Navigation */}
          <nav
            aria-label="Main navigation"
            className={open ? "nav-links is-open" : "nav-links"}
          >
            {/* Services dropdown */}
            {serviceLinks.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger className="services-trigger">
                  Services <ChevronDown size={14} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="service-menu">
                  {serviceLinks.map((s) => (
                    <DropdownMenuItem key={s._key || s.href} asChild>
                      <a href={stegaClean(s.href)}>{s.label}</a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Main nav links */}
            {navLinks.map((link) => (
              <a
                key={link._key || link.href}
                href={stegaClean(link.href)}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Phone + CTA + Mobile toggle */}
          <div className="nav-actions">
            {cleanPhone && phoneDisplay && (
              <a className="phone-link" href={`tel:${cleanPhone}`}>
                <Phone size={17} />
                <span>{phoneDisplay}</span>
              </a>
            )}

            {ctaLabel && cleanCtaHref && (
              <a className="button button-dark nav-cta" href={cleanCtaHref}>
                {ctaLabel}
              </a>
            )}

            <button
              className="menu-button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
