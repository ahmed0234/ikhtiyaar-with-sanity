"use client";

import { CheckCircle2, Search } from "lucide-react";
import { stegaClean } from "@sanity/client/stega";
import { services } from "@/content/services";
import { type SeoPageContent } from "@/sanity/schemaTypes/seoPageType";
import { createDataAttribute } from "next-sanity";
import { projectId, dataset } from "@/sanity/env";

interface SeoPageClientProps {
  content: SeoPageContent;
}

export function SeoPageClient({ content }: SeoPageClientProps) {
  const dataSanity = createDataAttribute({
    id: (content as any)._id || "seoPage",
    type: (content as any)._type || "seoPage",
    baseUrl: "/studio",
    projectId,
    dataset,
  });

  // Resolve hero image — Sanity CDN url takes priority, falls back to lucide Search icon
  const heroImgSrc = (content as any).heroImageUrl
    ? stegaClean((content as any).heroImageUrl)
    : null;

  // Other services for the related services row
  const otherServices = services.filter((s) => s.slug !== "seo");

  // Resolve stega-cleaned hrefs for links that must not carry invisible chars
  const heroCtaHref = stegaClean(content.heroCtaHref || "/#contact");
  const caseStudyHref = stegaClean(
    content.caseStudyHref || "/case-studies/casey-insurance-group"
  );
  const ctaButtonHref = stegaClean(content.ctaButtonHref || "/#contact");

  const deliverables =
    Array.isArray(content.deliverables) && content.deliverables.length > 0
      ? content.deliverables
      : [];

  const steps =
    Array.isArray(content.steps) && content.steps.length > 0
      ? content.steps
      : [];

  const fitItems =
    Array.isArray(content.fitItems) && content.fitItems.length > 0
      ? content.fitItems
      : [];

  const faqs =
    Array.isArray(content.faqs) && content.faqs.length > 0
      ? content.faqs
      : [];

  return (
    <main id="main">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="inner-hero">
        <div className="container service-hero-grid">
          <div>
            <a className="breadcrumb" href="/">Home</a>
            <span className="eyebrow">{content.heroEyebrow}</span>
            <h1>{content.heroHeadline}</h1>
            <p>{content.heroIntro}</p>
            <a href={heroCtaHref} className="button button-blue">
              {content.heroCtaText}
            </a>
            <span className="small-note">{content.heroSmallNote}</span>
          </div>

          {/* Visual aside */}
          <aside className="service-visual">
            <div className="visual-logo">
              {heroImgSrc ? (
                <img
                  src={heroImgSrc}
                  alt="Search Engine Optimization"
                  data-sanity={dataSanity("heroImage")}
                />
              ) : (
                <div data-sanity={dataSanity("heroImage")}>
                  <Search size={86} strokeWidth={1.4} />
                </div>
              )}
            </div>
            <span className="visual-service-name">
              {content.heroEyebrow}
            </span>
            <h2>{content.visualLabel}</h2>
            <div className="visual-flow">
              {content.visualFlow1 && <span>{content.visualFlow1}</span>}
              {content.visualFlow2 && <span>{content.visualFlow2}</span>}
              {content.visualFlow3 && <span>{content.visualFlow3}</span>}
            </div>
            <p>
              <CheckCircle2 size={16} /> {content.visualTagline}
            </p>
          </aside>
        </div>
      </section>

      {/* ── WHAT IT ACTUALLY MEANS ──────────────────────────────────────── */}
      <section className="section">
        <div className="container service-explainer">
          <div>
            <span className="eyebrow">{content.explainEyebrow}</span>
            <h2>{content.explainHeading}</h2>
            <p>{content.explainBody}</p>
          </div>
          <aside>
            <span className="eyebrow">{content.exampleEyebrow}</span>
            <p>{content.exampleBody}</p>
          </aside>
        </div>
      </section>

      {/* ── WHAT WE HANDLE ──────────────────────────────────────────────── */}
      <section className="section soft-section">
        <div className="container">
          <span className="eyebrow">{content.deliverablesEyebrow}</span>
          <h2 className="section-title">{content.deliverablesHeading}</h2>
          <div className="deliverables-grid">
            {deliverables.map((item: any, i: number) => (
              <article key={item._key || i}>
                <span className="step-number">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── A PLAN BUILT AROUND YOUR BUSINESS ──────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-intro">
            <span className="eyebrow">{content.stepsEyebrow}</span>
            <h2>{content.stepsHeading}</h2>
          </div>
          <div className="service-steps">
            {steps.map((step: any, i: number) => (
              <article key={step._key || i}>
                <span className="step-number">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
          <div className="measure-box">
            <h3>{content.measureHeading}</h3>
            <p>{content.measureBody}</p>
          </div>
          {content.caseStudyResult && (
            <a className="case-proof-link" href={caseStudyHref}>
              <strong>{content.caseStudyResult}</strong>
              <span>{content.caseStudyLinkText}</span>
            </a>
          )}
        </div>
      </section>

      {/* ── IS THIS RIGHT FOR YOU? ──────────────────────────────────────── */}
      <section className="section service-fit-section">
        <div className="container service-fit">
          <div>
            <span className="eyebrow">{content.fitEyebrow}</span>
            <h2>{content.fitHeading}</h2>
            <ul>
              {fitItems.map((item: any) => (
                <li key={item._key || item.text}>{item.text}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{content.timelineHeading}</h3>
            <p>{content.timelineBody}</p>
            <h3>{content.yourPartHeading}</h3>
            <p>{content.yourPartBody}</p>
          </div>
        </div>
      </section>

      {/* ── FAQs ────────────────────────────────────────────────────────── */}
      <section className="section soft-section">
        <div className="container narrow">
          <span className="eyebrow">{content.faqEyebrow}</span>
          <h2>{content.faqHeading}</h2>
          <div className="plain-faq">
            {faqs.map((faq: any) => (
              <details key={faq._key || faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">{content.relatedEyebrow}</span>
          <div className="related-services">
            {otherServices.map((s) => (
              <a href={`/services/${s.slug}`} key={s.slug}>
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAGE CTA ────────────────────────────────────────────────────── */}
      <section className="page-cta">
        <div className="container">
          <span className="eyebrow">{content.ctaEyebrow}</span>
          <h2>{content.ctaHeading}</h2>
          <p>{content.ctaBody}</p>
          <a className="button button-blue" href={ctaButtonHref}>
            {content.ctaButtonText}
          </a>
        </div>
      </section>
    </main>
  );
}
