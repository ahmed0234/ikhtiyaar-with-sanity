"use client";

import { useState, Fragment, type FormEvent } from "react";
import {
  Phone,
  Check,
  ShieldCheck,
  KeyRound,
  MapPin,
  PhoneCall,
  MousePointer2,
  BarChart3,
  CheckCircle2,
  Plus,
  Play,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { SiteFooter } from "@/components/site-footer";
import { ConsentVideo } from "@/components/consent-video";
import { ClientLogos } from "@/components/client-logos";
import { testimonials, youtubeId } from "@/content/testimonials";
import {
  type LandingPageContent,
  type SanityTestimonialItem,
  defaultLandingPageContent,
} from "@/sanity/initial-data";
import { stegaClean } from "@sanity/client/stega";
import { createDataAttribute } from "next-sanity";
import { projectId, dataset } from "@/sanity/env";

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

interface HomePageClientProps {
  content: LandingPageContent;
}

export function HomePageClient({ content }: HomePageClientProps) {
  const dataSanity = createDataAttribute({
    id: (content as any)._id || "landingPage",
    type: (content as any)._type || "landingPage",
    baseUrl: "/studio",
    projectId,
    dataset,
  });

  const [trade, setTrade] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [activeVideo, setActiveVideo] = useState<SanityTestimonialItem | null>(null);

  const activeTrades =
    Array.isArray(content.tradesList) && content.tradesList.length > 0
      ? content.tradesList
      : defaultLandingPageContent.tradesList;

  const activeFaqs =
    Array.isArray(content.faqItems) && content.faqItems.length > 0
      ? content.faqItems
      : defaultLandingPageContent.faqItems;

  function chooseTrade(value: string) {
    setTrade(stegaClean(value));
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!trade) {
      setError("Please choose the type of work you do.");
      setStatus("error");
      return;
    }
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setError("");
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, trade }),
      });
      if (!response.ok)
        throw new Error(
          "We couldn't send your details just now. Please try again, or call us on (954) 787-3401.",
        );
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <>
      <main id="main">
        {/* ---------------------------------------------------------------- */}
        {/* HERO SECTION (Screenshot 1) */}
        {/* ---------------------------------------------------------------- */}
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-grain" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="partner-badges" aria-label="Our partners">
                <img
                  className="google-partner-badge"
                  src={stegaClean(content.googlePartnerImageUrl) || "/google-partner.svg"}
                  alt={content.googlePartnerImageAlt || "Google Partner"}
                  data-sanity={dataSanity("googlePartnerImage")}
                />
                <img
                  className="hostinger-partner-badge"
                  src={stegaClean(content.hostingerPartnerImageUrl) || "/hostinger-partner.webp"}
                  alt={content.hostingerPartnerImageAlt || "Hostinger Partner"}
                  width="240"
                  height="240"
                  data-sanity={dataSanity("hostingerPartnerImage")}
                />
              </div>

              {/* Main Heading (Sanity managed) */}
              <h1 id="hero-heading">
                {content.heroHeadingLine1} <br />
                <span>
                  {content.heroHeadingLine2}
                </span>
              </h1>

              {/* Red-box text in Screenshot 1 (Sanity managed) */}
              <p className="hero-description">
                {content.heroDescription}
              </p>

              <div className="hero-actions">
                <a href="#contact" className="button button-blue">
                  {content.heroCtaButtonText}
                </a>
                <a href="#results" className="text-link light">
                  {content.heroCtaSecondaryText}
                </a>
              </div>

              <div className="hero-proof">
                <div className="proof-mark">
                  <Check size={24} strokeWidth={2.5} />
                </div>
                <p>
                  <strong>{content.heroProofTitle}</strong>
                  <span>{content.heroProofSubtitle}</span>
                </p>
              </div>

              <div className="hero-small">
                <span>
                  <Check size={15} /> {content.heroTrust1}
                </span>
                <span>
                  <Check size={15} /> {content.heroTrust2}
                </span>
              </div>
            </div>

            <div id="contact" className="contact-card">
              {status === "success" ? (
                <div className="form-success" role="status">
                  <CheckCircle2 size={52} />
                  <span className="eyebrow">DETAILS RECEIVED</span>
                  <h2>Let's talk about your next jobs.</h2>
                  <p>
                    Thanks for reaching out. We'll contact you using the details
                    you shared to learn more about your business.
                  </p>
                  <a className="button button-dark" href="tel:+19547873401">
                    Prefer to talk now? Call us
                  </a>
                  <button
                    className="text-link"
                    onClick={() => setStatus("idle")}
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <>
                  <div className="form-kicker">
                    <span>{content.heroFormKicker || "LET'S START WITH YOUR AREA"}</span>
                    <span className="free-tag">FREE</span>
                  </div>
                  <h2>
                    {content.heroFormHeading ? (
                      content.heroFormHeading === "Could this work for your business?" ? (
                        <>
                          Could this work <br />
                          for your business?
                        </>
                      ) : content.heroFormHeading.includes("\n") ? (
                        content.heroFormHeading.split("\n").map((line, i) => (
                          <Fragment key={i}>
                            {i > 0 && <br />}
                            {line}
                          </Fragment>
                        ))
                      ) : (
                        content.heroFormHeading
                      )
                    ) : (
                      <>
                        Could this work <br />
                        for your business?
                      </>
                    )}
                  </h2>
                  <p className="form-intro">
                    {content.heroFormDescription ||
                      "Tell us a little about what you do. We'll look at the demand, the costs, and whether the numbers make sense."}
                  </p>
                  <form onSubmit={submit}>
                    <div className="field-grid">
                      <label>
                        {content.heroFormFirstNameLabel || "First name"}
                        <input
                          name="firstName"
                          autoComplete="given-name"
                          placeholder={stegaClean(content.heroFormFirstNameLabel) || "First name"}
                          required
                          maxLength={80}
                        />
                      </label>
                      <label>
                        {content.heroFormLastNameLabel || "Last name"}
                        <input
                          name="lastName"
                          autoComplete="family-name"
                          placeholder={stegaClean(content.heroFormLastNameLabel) || "Last name"}
                          required
                          maxLength={80}
                        />
                      </label>
                    </div>
                    <div className="field-grid">
                      <label>
                        {content.heroFormEmailLabel || "Email"}
                        <input
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@company.com"
                          required
                          maxLength={200}
                        />
                      </label>
                      <label>
                        {content.heroFormPhoneLabel || "Phone"}
                        <input
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="(555) 000-0000"
                          required
                          minLength={7}
                          maxLength={30}
                        />
                      </label>
                    </div>
                    <div className="field-grid">
                      <div className="field">
                        <label id="trade-label" htmlFor="trade">
                          {content.heroFormTradeLabel || "What work do you do?"}
                        </label>
                        <Select value={trade} onValueChange={(val) => setTrade(stegaClean(val))}>
                          <SelectTrigger
                            id="trade"
                            aria-labelledby="trade-label"
                            className="trade-select"
                          >
                            <SelectValue placeholder="Choose your trade" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {activeTrades.map((t) => (
                              <SelectItem key={stegaClean(t)} value={stegaClean(t)}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <label>
                        {content.heroFormCityLabel || "City / service area"}
                        <input
                          name="city"
                          placeholder="e.g. Denver, CO"
                          autoComplete="address-level2"
                          required
                          maxLength={120}
                        />
                      </label>
                    </div>
                    <label className="company-field">
                      {content.heroFormCompanyLabel || "Business name"}
                      <input
                        name="company"
                        autoComplete="organization"
                        placeholder="Your company"
                        required
                        maxLength={150}
                      />
                    </label>
                    <div className="honeypot" aria-hidden="true">
                      <label>
                        Leave this blank
                        <input
                          name="website_url"
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </label>
                    </div>
                    {error && (
                      <p role="alert" className="form-error">
                        {error}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="button button-dark form-submit"
                    >
                      {status === "sending"
                        ? "Sending your details..."
                        : content.heroFormSubmitButtonText || "Let's look at my area"}
                    </button>
                    <p className="form-note">
                      <ShieldCheck size={14} /> {content.heroFormNote || "No pressure. No obligation."}
                    </p>
                    <p className="form-consent">
                      {content.heroFormConsent || "We'll only contact you about your request."}{" "}
                      <a href="/privacy">{content.heroFormPrivacyText || "Privacy Policy"}</a>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* TESTIMONIALS */}
        {/* ---------------------------------------------------------------- */}
        <section
          id="testimonials"
          className="section testimonials-section"
          aria-labelledby="testimonials-heading"
        >
          <div className="container">
            <div className="section-heading testimonial-heading">
              <div>
                <span className="eyebrow">
                  {content.testimonialsEyebrow || "IN THEIR OWN WORDS"}
                </span>
                <h2 id="testimonials-heading">
                  {content.testimonialsHeading ? (
                    content.testimonialsHeading ===
                      "Hear it from the people we work with." ||
                    content.testimonialsHeading ===
                      "Hear it from the people\nwe work with." ? (
                      <>
                        Hear it from the people
                        <br />
                        we work with.
                      </>
                    ) : content.testimonialsHeading.includes("\n") ? (
                      content.testimonialsHeading.split("\n").map((line, i) => (
                        <Fragment key={i}>
                          {i > 0 && <br />}
                          {line}
                        </Fragment>
                      ))
                    ) : (
                      content.testimonialsHeading
                    )
                  ) : (
                    <>
                      Hear it from the people
                      <br />
                      we work with.
                    </>
                  )}
                </h2>
              </div>
              <p>
                {content.testimonialsDescription ||
                  "What's it actually like working with us? Let our clients tell you."}
              </p>
            </div>
            <div className="testimonial-grid">
              {(Array.isArray(content.testimonialsList) &&
              content.testimonialsList.length > 0
                ? content.testimonialsList
                : defaultLandingPageContent.testimonialsList
              )
                .filter((t) => youtubeId(t.youtubeUrl))
                .map((t: SanityTestimonialItem, idx: number) => {
                  const rawThumb =
                    (t.thumbnailUrl ? stegaClean(t.thumbnailUrl) : "") ||
                    (t.thumbnail ? stegaClean(t.thumbnail) : "") ||
                    (youtubeId(t.youtubeUrl)
                      ? `https://img.youtube.com/vi/${youtubeId(t.youtubeUrl)}/hqdefault.jpg`
                      : "/testimonial-michael.webp");

                  const displayRole =
                    t.roleCompany ||
                    (t.company
                      ? t.company.startsWith("Owner")
                        ? t.company
                        : `Owner, ${t.company}`
                      : "");

                  return (
                    <article
                      className="testimonial-card"
                      key={t._key || t.youtubeUrl || idx}
                    >
                      <button
                        className="testimonial-video"
                        onClick={() => setActiveVideo(t)}
                        aria-label={`Watch ${t.name}'s testimonial`}
                      >
                        <img
                          src={rawThumb}
                          alt={t.name}
                          width="640"
                          height="360"
                          loading="lazy"
                        />
                        <span className="video-shade" />
                        <span className="video-play">
                          <Play size={27} fill="currentColor" />
                        </span>
                        <span className="video-watch">
                          {t.watchStoryText || "Watch their story"}
                        </span>
                      </button>
                      <div className="testimonial-caption">
                        <div>
                          <h3>{t.name}</h3>
                          {displayRole && <p>{displayRole}</p>}
                        </div>
                        <span className="testimonial-label">
                          {t.tag || "CLIENT STORY"}
                        </span>
                      </div>
                    </article>
                  );
                })}
            </div>
          </div>
        </section>

        <ClientLogos
          heading={content.clientLogosHeading}
          logos={content.clientLogosList}
        />

        <section className="reassurance" aria-label="What you can expect">
          <div className="container reassurance-grid">
            <div>
              <span className="outline-icon">
                <PhoneCall />
              </span>
              <p>
                <strong>{content.reassurance1Title || "No shared leads"}</strong>
                <span>{content.reassurance1Description || "People contact your business."}</span>
              </p>
            </div>
            <div>
              <span className="outline-icon">
                <KeyRound />
              </span>
              <p>
                <strong>{content.reassurance2Title || "You own what we build"}</strong>
                <span>{content.reassurance2Description || "Your accounts. Your information."}</span>
              </p>
            </div>
            <div>
              <span className="outline-icon">
                <MapPin />
              </span>
              <p>
                <strong>{content.reassurance3Title || "Your jobs. Your area."}</strong>
                <span>{content.reassurance3Description || "Built around the work you want."}</span>
              </p>
            </div>
            <div>
              <span className="outline-icon">
                <BarChart3 />
              </span>
              <p>
                <strong>{content.reassurance4Title || "Numbers you understand"}</strong>
                <span>{content.reassurance4Description || "What you spent. What came back."}</span>
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* RIDGEWELL RESULTS SECTION (Screenshot 2) */}
        {/* ---------------------------------------------------------------- */}
        <section id="results" className="section results-section">
          <div className="container results-grid">
            <div className="project-image-wrap">
              <img
                className="project-image"
                src={stegaClean(content.resultsProjectImageUrl) || "/ridgewell-project.webp"}
                alt="Outdoor living and hardscaping image featured in the Ridgewell Landscape & Design case study"
                width="703"
                height="396"
                loading="lazy"
              />
              <div className="project-caption">
                <span>{content.resultsProjectName || "RIDGEWELL LANDSCAPE & DESIGN"}</span>
                <span>
                  <MapPin size={14} /> {content.resultsProjectLocation || "Colorado"}
                </span>
              </div>
              <div className="project-badge">
                <span>{content.resultsBadgeEyebrow || "REAL CLIENT RESULTS"}</span>
                <strong>
                  {content.resultsBadgeTitle || "Good work. More people seeing it."}
                </strong>
              </div>
            </div>
            <div className="results-copy">
              <span className="eyebrow">{content.resultsEyebrow || "LESS TALK. HERE'S WHAT HAPPENED."}</span>

              {/* Red-box heading in Screenshot 2 (Sanity managed) */}
              <h2>
                {content.resultsHeading || "More people asking. More work coming in."}
              </h2>

              <p>
                {content.resultsDescription ||
                  "Ridgewell wanted more landscaping and hardscaping projects. We helped homeowners in their area find them and get in touch."}
              </p>

              {/* Red-box stats in Screenshot 2 (Sanity managed) */}
              <div className="result-stats">
                <div>
                  <strong>{content.stat1Value || "2200+"}</strong>
                  <span>
                    {content.stat1Label || "homeowner inquiries in two months"}
                  </span>
                </div>
                <div>
                  <strong>{content.stat2Value || "$500k"}</strong>
                  <span>
                    {content.stat2Label || "in client-reported revenue"}
                  </span>
                </div>
              </div>

              <p className="results-note">
                {content.resultsDisclaimer ||
                  "One client's results, not a promise of what every business will make. Revenue is not profit."}
              </p>
              <a href="#contact" className="text-link">
                {content.resultsCtaText || "Let's look at the numbers for your business"}
              </a>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* OUTCOMES SECTION (Image 1) */}
        {/* ---------------------------------------------------------------- */}
        <section id="what-we-do" className="section outcomes-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">{content.outcomesEyebrow}</span>
                <h2>
                  {renderMultiline(content.outcomesHeading)}
                </h2>
              </div>
              <p>
                {content.outcomesSubtitle}
              </p>
            </div>
            <div className="outcomes-grid">
              <article className="outcome-card">
                <span className="card-number">{content.outcomesCard1Number || "01"}</span>
                <PhoneCall className="outcome-icon" size={32} />
                <h3>
                  {renderMultiline(content.outcomesCard1Title || "Get calls for work\nyou actually want.")}
                </h3>
                <p>
                  {content.outcomesCard1Description || "More patios? Full roof replacements? Bigger remodels? We focus on your best jobs and the places you want to work."}
                </p>
                <div className="card-bottom">
                  <Check size={17} /> {content.outcomesCard1Bottom || "Your services. Your service area."}
                </div>
              </article>
              <article className="outcome-card">
                <span className="card-number">{content.outcomesCard2Number || "02"}</span>
                <MousePointer2 className="outcome-icon" size={32} />
                <h3>
                  {renderMultiline(content.outcomesCard2Title || "Give people a reason\nto choose you.")}
                </h3>
                <p>
                  {content.outcomesCard2Description || "We show your work, explain what makes you a good choice, and make it easy for someone to pick up the phone."}
                </p>
                <div className="card-bottom">
                  <Check size={17} /> {content.outcomesCard2Bottom || "A clear path from looking to calling."}
                </div>
              </article>
              <article className="outcome-card">
                <span className="card-number">{content.outcomesCard3Number || "03"}</span>
                <BarChart3 className="outcome-icon" size={32} />
                <h3>
                  {renderMultiline(content.outcomesCard3Title || "See if the money\nis making you money.")}
                </h3>
                <p>
                  {content.outcomesCard3Description || "We keep track of the calls and estimate requests. Together, we look at which ones become jobs and what needs to change."}
                </p>
                <div className="card-bottom">
                  <Check size={17} /> {content.outcomesCard3Bottom || "Simple answers about your results."}
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* OWNERSHIP SECTION (Screenshot 3) */}
        {/* ---------------------------------------------------------------- */}
        <section className="ownership-section">
          <div className="container ownership-grid">
            <div>
              <span className="eyebrow">{content.ownershipEyebrow}</span>
              {/* Red-box heading in Screenshot 3 (Sanity managed) */}
              <h2>
                {content.ownershipHeading}
              </h2>
            </div>
            <div>
              <p>
                {content.ownershipParagraph1}
              </p>
              <p>
                {content.ownershipParagraph2}
              </p>
              <a href="#contact" className="button button-dark">
                {content.ownershipButtonText}
              </a>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* PROCESS SECTION (Image 2) */}
        {/* ---------------------------------------------------------------- */}
        <section id="how-it-works" className="section process-section">
          <div className="container">
            <div className="section-heading centered">
              <span className="eyebrow">{content.processEyebrow || "PRETTY STRAIGHTFORWARD"}</span>
              <h2>{renderMultiline(content.processHeading || "Here's how we'd get started.")}</h2>
              <p>{content.processSubtitle || "No homework. No long marketing presentation."}</p>
            </div>
            <div className="process-grid">
              <article>
                <div className="step-marker">{content.processStep1Number || "1"}</div>
                <h3>{content.processStep1Title || "Tell us what you want more of."}</h3>
                <p>
                  {content.processStep1Description || "The jobs you like, the areas you cover, and how much work your crew can take on."}
                </p>
              </article>
              <article>
                <div className="step-marker">{content.processStep2Number || "2"}</div>
                <h3>{content.processStep2Title || "We'll work through the numbers."}</h3>
                <p>
                  {content.processStep2Description || "We check local demand and likely costs. If the budget doesn't make sense, we'll tell you."}
                </p>
              </article>
              <article>
                <div className="step-marker">{content.processStep3Number || "3"}</div>
                <h3>{content.processStep3Title || "We set it up. You take the calls."}</h3>
                <p>
                  {content.processStep3Description || "Once we agree on a plan, we handle the setup and keep improving it as we learn what brings good work."}
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* TRADES PILLS (Image 3) */}
        {/* ---------------------------------------------------------------- */}
        <section className="trades-section">
          <div className="container trades-grid">
            <div>
              <span className="eyebrow">{content.tradesEyebrow || "BUILT AROUND YOUR BUSINESS"}</span>
              <h2>
                {renderMultiline(content.tradesHeading || "What kind of work\ndo you want more of?")}
              </h2>
              <p>
                {content.tradesDescription || "A roof replacement and a moving job have different numbers. Your plan should too."}
              </p>
            </div>
            <div className="trade-pills">
              {activeTrades.map((t) => (
                <button key={stegaClean(t)} onClick={() => chooseTrade(t)}>
                  {t}
                  <Plus size={18} />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* FAQ SECTION (Image 4) */}
        {/* ---------------------------------------------------------------- */}
        <section id="questions" className="section faq-section">
          <div className="container faq-grid">
            <div>
              <span className="eyebrow">{content.faqEyebrow || "FAIR QUESTIONS"}</span>
              <h2>
                {renderMultiline(content.faqHeading || "Let's clear\na few things up.")}
              </h2>
              <p>
                {renderMultiline(
                  content.faqDescription ||
                    "Wondering about your own situation?\nJust ask. We'll give you a straight answer."
                )}
              </p>
              <a
                href={`tel:${stegaClean(content.faqPhoneTel || "+19547873401")}`}
                className="phone-link"
              >
                <Phone size={18} />
                {content.faqPhoneDisplay || "(954) 787-3401"}
              </a>
            </div>
            <Accordion
              type="single"
              collapsible
              className="faq-list"
              defaultValue="faq-0"
            >
              {activeFaqs.map((item, i) => (
                <AccordionItem key={item._key || `faq-${i}`} value={`faq-${i}`}>
                  <AccordionTrigger className="faq-trigger">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="faq-answer">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* FINAL CTA SECTION (Screenshot 4) */}
        {/* ---------------------------------------------------------------- */}
        <section className="final-section">
          <div className="container final-grid">
            <div>
              <span className="eyebrow">{content.finalEyebrow}</span>
              {/* Red-box heading in Screenshot 4 (Sanity managed) */}
              <h2>
                {content.finalHeading}
              </h2>
              <p>
                {content.finalDescription}
              </p>
            </div>
            <div className="final-actions">
              <a href="#contact" className="button button-dark">
                {content.finalButtonText}
              </a>
              <span>{content.finalMicroCopy}</span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter content={content} />
      <Dialog
        open={!!activeVideo}
        onOpenChange={(open) => {
          if (!open) setActiveVideo(null);
        }}
      >
        <DialogContent className="testimonial-dialog">
          <DialogHeader>
            <DialogTitle>{activeVideo?.name}</DialogTitle>
            <DialogDescription>
              {(activeVideo?.roleCompany || activeVideo?.company)} · Client testimonial
            </DialogDescription>
          </DialogHeader>
          {activeVideo && (
            <ConsentVideo
              key={activeVideo.youtubeUrl}
              url={activeVideo.youtubeUrl}
              name={activeVideo.name}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
