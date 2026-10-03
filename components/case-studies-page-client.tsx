"use client";

import { stegaClean } from "@sanity/client/stega";
import { type CaseStudiesPageContent } from "@/sanity/schemaTypes/caseStudiesPageType";
import { createDataAttribute } from "next-sanity";
import { projectId, dataset } from "@/sanity/env";

interface CaseStudiesPageClientProps {
  content: CaseStudiesPageContent;
}

export function CaseStudiesPageClient({ content }: CaseStudiesPageClientProps) {
  const dataSanity = createDataAttribute({
    id: (content as any)._id || "caseStudiesPage",
    type: (content as any)._type || "caseStudiesPage",
    baseUrl: "/studio",
    projectId,
    dataset,
  });

  const cases =
    Array.isArray(content.cases) && content.cases.length > 0
      ? content.cases
      : [];

  const ctaButtonHref = stegaClean(content.ctaButtonHref || "/#contact");

  return (
    <main id="main">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="inner-hero">
        <div className="container">
          <span className="eyebrow">{content.heroEyebrow}</span>
          <h1>
            {content.heroHeadingLine1}
            <br />
            <em>{content.heroHeadingLine2}</em>
          </h1>
          <p>{content.heroIntro}</p>
        </div>
      </section>

      {/* ── CASE STUDIES LIST ───────────────────────────────────────────── */}
      <section className="section">
        <div className="container case-list">
          {cases.map((c: any, i: number) => {
            const isExplicitStatCard = c.visualType === "statCard";
            const isExplicitImage = c.visualType === "image";

            // Determine whether to display a featured image or background stat card
            const showImage = isExplicitImage
              ? Boolean(c.imageUrl || (i === 0 && !c.imageUrl))
              : isExplicitStatCard
                ? false
                : Boolean(c.imageUrl || (i === 0 && !c.imageUrl));

            const imgSrc = c.imageUrl
              ? stegaClean(c.imageUrl)
              : i === 0
                ? "/ridgewell-project.webp"
                : null;

            const buttonHref = stegaClean(c.buttonHref || "/case-studies");

            return (
              <article className="case-feature" key={c._key || c.clientName || i}>
                {showImage && imgSrc ? (
                  <div
                    className="case-visual"
                    data-sanity={dataSanity(`cases[_key=="${c._key}"].image`)}
                  >
                    <img
                      src={imgSrc}
                      alt={c.imageAlt || c.clientName || "Case study project"}
                      data-sanity={dataSanity(`cases[_key=="${c._key}"].image`)}
                    />
                  </div>
                ) : (
                  <div
                    className="case-visual case-visual-1"
                    style={{
                      backgroundColor: c.backgroundColor
                        ? stegaClean(c.backgroundColor)
                        : undefined,
                    }}
                    data-sanity={dataSanity(`cases[_key=="${c._key}"].image`)}
                  >
                    <span data-sanity={dataSanity(`cases[_key=="${c._key}"].statBadge`)}>
                      {c.statBadge || c.clientName}
                    </span>
                    <strong data-sanity={dataSanity(`cases[_key=="${c._key}"].statNumber`)}>
                      {c.statNumber}
                    </strong>
                    <p data-sanity={dataSanity(`cases[_key=="${c._key}"].statLabel`)}>
                      {c.statLabel}
                    </p>
                  </div>
                )}
                <div>
                  <span className="eyebrow">{c.service}</span>
                  <h2>{c.headline}</h2>
                  <h3>{c.clientName}</h3>
                  <p>{c.intro}</p>
                  <a href={buttonHref} className="button button-dark">
                    {c.buttonText || "Read the case study"}
                  </a>
                </div>
              </article>
            );
          })}
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
