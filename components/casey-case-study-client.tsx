"use client";

import { stegaClean } from "@sanity/client/stega";
import { type CaseyCaseStudyContent } from "@/sanity/schemaTypes/caseyCaseStudyType";
import { createDataAttribute } from "next-sanity";
import { projectId, dataset } from "@/sanity/env";

interface CaseyCaseStudyClientProps {
  content: CaseyCaseStudyContent;
}

export function CaseyCaseStudyClient({
  content,
}: CaseyCaseStudyClientProps) {
  const dataSanity = createDataAttribute({
    id: (content as any)._id || "caseyCaseStudy",
    type: (content as any)._type || "caseyCaseStudy",
    baseUrl: "/studio",
    projectId,
    dataset,
  });

  const metrics =
    Array.isArray(content.metrics) && content.metrics.length > 0
      ? content.metrics
      : [];

  const processSteps =
    Array.isArray(content.processSteps) && content.processSteps.length > 0
      ? content.processSteps
      : [];

  // Stega-cleaned links
  const breadcrumbHref = stegaClean(content.breadcrumbHref || "/case-studies");
  const serviceLinkHref = stegaClean(
    content.serviceLinkHref || "/services/seo"
  );
  const ctaButtonHref = stegaClean(content.ctaButtonHref || "/#contact");

  // Optional image uploaded to Sanity
  const imageSrc = (content as any).imageUrl
    ? stegaClean((content as any).imageUrl)
    : null;

  return (
    <main id="main">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="inner-hero">
        <div className="container">
          <a className="breadcrumb" href={breadcrumbHref}>
            {content.breadcrumbText}
          </a>
          <span className="eyebrow">
            {content.heroEyebrow || `${content.clientName} · ${content.service}`}
          </span>
          <h1>{content.headline}</h1>
          <p>{content.intro}</p>
        </div>
      </section>

      {/* ── ARTICLE / STORY ─────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          {/* Metric Highlights Row */}
          <div className="metric-row">
            {metrics.map((m: any, i: number) => (
              <div key={m._key || m.label || i}>
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </div>
            ))}
          </div>

          {/* Article Story Copy */}
          <div className="article-copy">
            <span className="eyebrow">{content.contextEyebrow}</span>
            <h2>{content.contextHeading}</h2>
            <p>{content.contextBody}</p>

            <div className="case-objective">
              <strong>{content.objectiveLabel}</strong>
              <p>{content.objectiveText}</p>
            </div>

            <h2>{content.producedHeading}</h2>
            <p>{content.producedBody}</p>

            {imageSrc && (
              <img
                className="case-detail-image"
                src={imageSrc}
                alt={content.imageAlt || content.clientName || "Casey Insurance Group search presence and results"}
                data-sanity={dataSanity("image")}
              />
            )}

            <h2>{content.interpretHeading}</h2>
            <p>{content.interpretBody}</p>

            <h2>{content.processTitle}</h2>
            <p className="process-scope">{content.processNote}</p>

            <div className="case-process">
              {processSteps.map((step: any, i: number) => (
                <section key={step._key || step.title || i}>
                  <span className="step-number">0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </section>
              ))}
            </div>

            <h2>{content.takeawayHeading}</h2>
            <p>{content.takeawayBody}</p>
            <p>{content.lessonBody}</p>

            <a className="text-link" href={serviceLinkHref}>
              {content.serviceLinkText}
            </a>

            <aside className="result-note">{content.resultNote}</aside>
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
